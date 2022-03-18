import style from "../../pages/pages.module.scss";
import Tree from "rc-tree";
import "rc-tree/assets/index.css"
import archivalUnits from "../../utils/archivalUnits";

const CollectionPage = ({treeData}) => {
    const renderTreeData = () => {
        const treeData = []

        const getLeaves = (archivalUnit) => {
            let leafData;

            if (archivalUnit.hasOwnProperty('children')) {
                leafData = {
                    key: archivalUnit.referenceCode,
                    title: `${archivalUnit.referenceCode} ${archivalUnit.title}`,
                    children: archivalUnit.children.map(au => getLeaves(au))
                }
            } else {
                leafData = {
                    key: archivalUnit.referenceCode,
                    title: `${archivalUnit.referenceCode} ${archivalUnit.title}`
                }
            }

            return leafData
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
                treeData={renderTreeData()}
            />
        </div>
    )
}

export default CollectionPage