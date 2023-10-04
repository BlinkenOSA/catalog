import React, {useEffect} from 'react';
import style from "./CollectionPage.module.scss";
import Loader from "../../layout/Loader";
import {useState} from "react";
import TreeNode from "./parts/TreeNode";
import ArchivalUnitDrawer from "./parts/ArchivalUnitDrawer";
import {useRouter} from "next/router";

/**
 * Page responsible for displaying the hierarchical list of archival collections.
 */
const CollectionPage = ({data, activeUnit, activeUnitID, showArchiveUnitDrawer = false, isMobile}) => {
    const router = useRouter();

    const [openNodes, setOpenNodes] = useState([]);
    const [selectedArchivalUnit, setSelectedArchivalUnit] = useState(0)
    const [theme, setTheme] = useState(undefined)

    useEffect(() => {
        if (activeUnit && activeUnitID) {
            let nodes = []
            const units = activeUnit.split('-')
            switch (units.length) {
                case 1:
                    nodes.push(units[0]);
                    break;
                case 2:
                    nodes.push(units[0])
                    nodes.push(units.join('-'))
                    break;
                case 3:
                    nodes.push(units[0])
                    nodes.push(`${units[0]}-${units[1]}`)
                    nodes.push(`${units[0]}-${units[1]}-${units[2]}`)
                    break;
            }
            setOpenNodes(nodes);
            setSelectedArchivalUnit(Number(activeUnitID))
        }
    }, [activeUnit, activeUnitID])

    /**
     * Handling when an archival unit is selected / clicked. If it's displayed on the Collections menu, it only
     * adds it to the component state, if on the ISAD page, it will redirect to the clicked series page.
     *
     * @param {Number} key The key of the element which was selected
     * @param {String} catalogID The id of the catalog record
     */
    const onSelectArchivalUnit = (key, catalogID = '') => {
        showArchiveUnitDrawer && setSelectedArchivalUnit(selectedArchivalUnit === key ? 0 : key)
        if (activeUnit && activeUnitID) {
            router.replace({
                pathname: `/catalog/${catalogID}`
            });
        }
    }

    /**
     * Handling the open/close event.
     *
     * @param {String} key The key of the element should be opened/closed
     */
    const onOpenClose = (key) => {
        if (openNodes.includes(key)) {
            const nodes = [...openNodes];
            nodes.splice(openNodes.indexOf(key), 1);
            setOpenNodes(nodes);
        } else {
            setOpenNodes(oldArray => [...oldArray, key]);
        }
    }

    /**
     *
     * @param {Object} archivalUnit Object of the Archival Unit data
     * @param {boolean} fondsLast Is Fonds the last one in the hierarchy?
     * @param {boolean} subfondsLast Is Subfonds the last one in the hierarchy?
     * @param {boolean} seriesLast Is Series the last one in the hierarchy?
     */
    const getLeaves = (archivalUnit, fondsLast=false, subfondsLast=false, seriesLast=false) => {
        /**
         * Detects if the actual node should be visible in the tree.
         *
         * @returns {boolean} Node is visible or not?
         */
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

        /**
         * Selects the className according to the nodes place in the hierarchy.
         * A node can be last in the list, a subfonds can exists or not, etc.
         *
         * @returns {string} Name of the class
         */
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
                    key={archivalUnit['key']}
                    archivalUnit={archivalUnit}
                    classType={getClassType()}
                    selected={archivalUnit['id'] === selectedArchivalUnit}
                    open={openNodes.includes(archivalUnit['key'])}
                    onOpenClose={onOpenClose}
                    onTreeNodeClick={onSelectArchivalUnit}
                    theme={theme}
                    hasChildren={archivalUnit['children'].length > 0}
                />
            )
        } else {
            return ''
        }
    }

    const handleTreeOpenAction = (action) => {
        if (action === 'openAll') {
            const nodes = [];
            data.forEach((fonds) => {
                if (fonds['children'].length > 0) {
                    nodes.push(fonds['key'])
                    fonds['children'].forEach((subfonds) => {
                        if (subfonds['children'].length > 0) {
                            nodes.push(subfonds['key'])
                        }
                    })
                }
            })
            setOpenNodes(nodes)
        } else {
            setOpenNodes([])
        }
    }

    /**
     * Renders the tree from the data from the API.
     *
     * @returns {[]} The array containing the Tree Nodes.
     */
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
        if (isMobile) {
            return (
                <div>
                    <div className={`${style.Tree} ${style.Mobile}`}>
                        {renderTree()}
                    </div>
                    {
                        showArchiveUnitDrawer &&
                        <ArchivalUnitDrawer
                            isMobile={true}
                            archivalUnitID={selectedArchivalUnit}
                            open={selectedArchivalUnit !== 0}
                            onClose={() => setSelectedArchivalUnit(0)}
                        />
                    }
                </div>
            )
        } else {
            return (
                <div style={{display: 'flex'}}>
                    <div className={showArchiveUnitDrawer ? style.TreeOpen : style.Tree}>
                        {renderTree()}
                    </div>
                    {
                        showArchiveUnitDrawer &&
                        <ArchivalUnitDrawer
                            archivalUnitID={selectedArchivalUnit}
                            open={selectedArchivalUnit !== 0}
                            onClose={onSelectArchivalUnit}
                            onTreeOpenClick={handleTreeOpenAction}
                            theme={theme}
                            onThemeSelect={setTheme}
                        />
                    }
                </div>
            )
        }
    } else {
        return <Loader/>
    }
}

export default CollectionPage
