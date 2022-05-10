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

    const getLeaves = (archivalUnit, isLast) => {
        switch (archivalUnit['level']) {
            case 'F':
                return (
                    <div key={archivalUnit['key']} className={style.Fonds}>
                        <TreeNode
                            archivalUnit={archivalUnit}
                            open={openNodes.includes(archivalUnit['key'])}
                            onOpenClose={onOpenClose}
                            hasChildren={archivalUnit.hasOwnProperty('children')}
                            isLast={isLast}
                        />
                    </div>
                )
            case 'SF':
                return (
                    <div key={archivalUnit['key']} className={style.Subfonds}>
                        <TreeNode
                            archivalUnit={archivalUnit}
                            open={openNodes.includes(archivalUnit['key'])}
                            onOpenClose={onOpenClose}
                            hasChildren={archivalUnit.hasOwnProperty('children')}
                            isLast={isLast}
                        />
                    </div>
                )
            case 'S':
                return (
                    <div key={archivalUnit['key']} className={style.Series}>
                        <TreeNode
                            archivalUnit={archivalUnit}
                            open={openNodes.includes(archivalUnit['key'])}
                            onOpenClose={onOpenClose}
                            hasChildren={false}
                            isLast={isLast}
                        />
                    </div>
                )
        }
    }

    const renderTree = () => {
        const treeData = [];

        data.forEach((fonds, index) => {
            treeData.push(
                getLeaves(fonds, index === data.length - 1)
            )
            if (fonds.hasOwnProperty('children')) {
                fonds['children'].forEach((subfonds, index) => {
                    treeData.push(
                        getLeaves(subfonds, index === fonds['children'].length - 1)
                    )
                    if (subfonds.hasOwnProperty('children')) {
                        subfonds['children'].forEach((series, index) => {
                            treeData.push(
                                getLeaves(series, index === subfonds['children'].length - 1)
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
