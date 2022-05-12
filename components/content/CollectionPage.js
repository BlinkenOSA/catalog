import style from "./CollectionPage.module.scss";
import useSWR from 'swr'
import {fetcher} from "../../utils/fetcher";
import Loader from "./parts/loader/Loader";
import {useState} from "react";
import TreeNode from "./parts/treeNode/TreeNode";

const CollectionPage = () => {
    const [openNodes, setOpenNodes] = useState([]);
    const { data, error } = useSWR('/archival_units', fetcher);

    const onOpenClose = (key) => {
        if (openNodes.includes(key)) {
            const nodes = [...openNodes];
            nodes.splice(openNodes.indexOf(key), 1);
            setOpenNodes(nodes);
        } else {
            setOpenNodes(oldArray => [...oldArray, key]);
        }
    }

    const getLeaves = (archivalUnit, fondsLast=false, subfondsLast=false, seriesLast=false) => {
        const detectVisible = () => {
            let fondsKey, subfondsKey;
            const key = archivalUnit['key'];
            switch (archivalUnit['level']) {
                case 'F':
                    return true;
                case 'SF':
                    fondsKey = key.slice(0, key.indexOf('-'))
                    return openNodes.includes(fondsKey);
                case 'S':
                    if (archivalUnit['subfonds']) {
                        fondsKey = key.slice(0, key.indexOf('-'))
                        subfondsKey = key.slice(0, key.lastIndexOf('-'))
                        return openNodes.includes(fondsKey) && openNodes.includes(subfondsKey);
                    } else {
                        fondsKey = key.slice(0, key.indexOf('-'))
                        return openNodes.includes(fondsKey);
                    }
            }
        }

        const getClassType = () => {
            switch (archivalUnit['level']) {
                case 'F':
                    return fondsLast ? 'FondsLast' : 'Fonds'
                case 'SF':
                    if (fondsLast) {
                        return subfondsLast ? 'FondsLastSubfondsLast' : 'FondsLastSubfonds'
                    } else {
                        return subfondsLast ? 'FondsSubfondsLast' : 'FondsSubfonds'
                    }
                case 'S':
                    if (fondsLast) {
                        // Subfonds exists
                        if (archivalUnit['subfonds']) {
                            if (subfondsLast) {
                                return seriesLast ? 'FondsLastSubfondsLastSeriesLast' : 'FondsLastSubfondsLastSeries'
                            } else {
                                return seriesLast ? 'FondsLastSubfondsSeriesLast' : 'FondsLastSubfondsSeries'
                            }
                        // Subfonds doesn't exist
                        } else {
                            return subfondsLast ? 'FondsLastSeriesLast' : 'FondsLastSeries'
                        }
                    } else {
                        // Subfonds exists
                        if (archivalUnit['subfonds']) {
                            if (subfondsLast) {
                                return seriesLast ? 'FondsSubfondsLastSeriesLast' : 'FondsSubfondsLastSeries'
                            } else {
                                return seriesLast ? 'FondsSubfondsSeriesLast' : 'FondsSubfondsSeries'
                            }
                        // Subfonds doesn't exist
                        } else {
                            return subfondsLast ? 'FondsSeriesLast' : 'FondsSeries'
                        }
                    }
            }
        }

        if (detectVisible()) {
            return (
                <TreeNode
                    archivalUnit={archivalUnit}
                    classType={getClassType()}
                    open={openNodes.includes(archivalUnit['key'])}
                    onOpenClose={onOpenClose}
                    hasChildren={archivalUnit.hasOwnProperty('children')}
                />
            )
        } else {
            return ''
        }
    }

    const renderTree = () => {
        const treeData = [];

        data.forEach((fonds, index) => {
            treeData.push(
                getLeaves(fonds, index === data.length - 1)
            )
            if (fonds.hasOwnProperty('children')) {
                fonds['children'].forEach((subfonds, index2) => {
                    treeData.push(
                        getLeaves(subfonds, index === data.length - 1, index2 === fonds['children'].length - 1)
                    )
                    if (subfonds.hasOwnProperty('children')) {
                        subfonds['children'].forEach((series, index3) => {
                            treeData.push(
                                getLeaves(
                                    series,
                                    index === data.length - 1,
                                    index2 === fonds['children'].length - 1,
                                    index3 === subfonds['children'].length - 1,
                                )
                            )
                        })
                    }
                })
            }
        });

        return treeData;
    }

    if (data) {
        return (
            <div className={style.Tree}>
                {renderTree()}
            </div>
        )
    } else {
        return <Loader/>
    }
}

export default CollectionPage
