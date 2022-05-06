import style from "./CollectionPage.module.scss";
import Tree, {TreeNode} from "rc-tree";
import "rc-tree/assets/index.css"
import useSWR from 'swr'
import {fetcher} from "../../utils/fetcher";
import Loader from "./parts/loader/Loader";

const CollectionPage = () => {
    const { data, error } = useSWR('/archival_units', fetcher)

    const renderTreeNodes = () => {
        const treeData = []

        const getTitle = (referenceCode, title) => {
            return (
                <div className={style.TreeNodeValue}>
                    <span className={style.TreeNodeReferenceCode}>{referenceCode}</span>
                    <span className={style.TreeNodeTitle}>{title}</span>
                </div>
            )
        }

        const getLeaves = (archivalUnit) => {
            switch (archivalUnit['level']) {
                case 'F':
                    if (archivalUnit.hasOwnProperty('children')) {
                        return (
                            <TreeNode
                                title={() => getTitle(archivalUnit['reference_code'], archivalUnit['title'])}
                                key={archivalUnit['reference_code']}
                                isLeaf={!archivalUnit.hasOwnProperty('children')}
                                className={style.TreeNodeFonds}
                            >
                                {archivalUnit['children'].map(au => getLeaves(au))}
                            </TreeNode>
                        )
                    } else {
                        return (
                            <TreeNode
                                title={() => getTitle(archivalUnit['reference_code'], archivalUnit['title'])}
                                key={archivalUnit['reference_code']}
                                isLeaf={false}
                                className={style.TreeNodeFonds}
                            />
                        )
                    }
                case 'SF':
                    if (archivalUnit.hasOwnProperty('children')) {
                        return (
                            <TreeNode
                                title={() => getTitle(archivalUnit['reference_code'], archivalUnit['title'])}
                                key={archivalUnit['reference_code']}
                                isLeaf={!archivalUnit.hasOwnProperty('children')}
                                className={style.TreeNodeSubfonds}
                            >
                                {archivalUnit['children'].map(au => getLeaves(au))}
                            </TreeNode>
                        )
                    } else {
                        return (
                            <TreeNode
                                title={() => getTitle(archivalUnit['reference_code'], archivalUnit['title'])}
                                key={archivalUnit['reference_code']}
                                isLeaf={!archivalUnit.hasOwnProperty('children')}
                                className={style.TreeNodeSubfonds}
                            />
                        )
                    }
                case 'S':
                    return (
                        <TreeNode
                            title={() => getTitle(archivalUnit['reference_code'], archivalUnit['title'])}
                            key={archivalUnit['reference_code']}
                            isLeaf={true}
                            className={archivalUnit['subfonds'] ? style.TreeNodeSeries : style.TreeNodeSeriesWithoutSubfonds}
                        />
                    )
            }
        }

        data.forEach(fonds => {
            treeData.push(getLeaves(fonds))
        });

        return treeData
    }

    if (data) {
        return (
            <div className={style.Tree}>
                <Tree
                    showLine
                    clickable
                    defaultExpandAll
                >
                    {renderTreeNodes()}
                </Tree>
            </div>
        )
    } else {
        return <Loader/>
    }
}

export default CollectionPage
