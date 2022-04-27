import style from "./CollectionPage.module.scss";
import Tree, {TreeNode} from "rc-tree";
import "rc-tree/assets/index.css"
import archivalUnits from "../../utils/archivalUnits";

const CollectionPage = ({treeData}) => {
    const renderTreeNodes = () => {
        const treeData = []

        const getTitle = (referenceCode, title) => {
            return (
                <div className={style.TreeNodeValue}>
                    <div className={style.TreeNodeReferenceCode}>{referenceCode}</div>
                    <div className={style.TreeNodeTitle}>{title}</div>
                </div>
            )
        }

        const getLeaves = (archivalUnit) => {
            switch (archivalUnit.level) {
                case 'F':
                    if (archivalUnit.hasOwnProperty('children')) {
                        return (
                            <TreeNode
                                title={() => getTitle(archivalUnit.referenceCode, archivalUnit.title)}
                                key={archivalUnit.referenceCode}
                                isLeaf={!archivalUnit.hasOwnProperty('children')}
                                className={style.TreeNodeFonds}
                            >
                                {archivalUnit.children.map(au => getLeaves(au))}
                            </TreeNode>
                        )
                    } else {
                        return (
                            <TreeNode
                                title={() => getTitle(archivalUnit.referenceCode, archivalUnit.title)}
                                key={archivalUnit.referenceCode}
                                isLeaf={false}
                                className={style.TreeNodeFonds}
                            />
                        )
                    }
                case 'SF':
                    if (archivalUnit.hasOwnProperty('children')) {
                        return (
                            <TreeNode
                                title={() => getTitle(archivalUnit.referenceCode, archivalUnit.title)}
                                key={archivalUnit.referenceCode}
                                isLeaf={!archivalUnit.hasOwnProperty('children')}
                                className={style.TreeNodeSubfonds}
                            >
                                {archivalUnit.children.map(au => getLeaves(au))}
                            </TreeNode>
                        )
                    } else {
                        return (
                            <TreeNode
                                title={() => getTitle(archivalUnit.referenceCode, archivalUnit.title)}
                                key={archivalUnit.referenceCode}
                                isLeaf={!archivalUnit.hasOwnProperty('children')}
                                className={style.TreeNodeSubfonds}
                            />
                        )
                    }
                case 'S':
                    return (
                        <TreeNode
                            title={() => getTitle(archivalUnit.referenceCode, archivalUnit.title)}
                            key={archivalUnit.referenceCode}
                            isLeaf={true}
                            className={archivalUnit.subfonds ? style.TreeNodeSeries : style.TreeNodeSeriesWithoutSubfonds}
                        />
                    )
            }
        }

        archivalUnits.forEach(fonds => {
            treeData.push(getLeaves(fonds))
        });

        return treeData
    }

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
}

export default CollectionPage