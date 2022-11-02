import useSWR from "swr";
import {fetcher} from "../../../utils/fetcherFunctions";
import style from "./FindingAidsLocation.module.scss";
import Loader from "../../pages/parts/loader/Loader";
import TreeNode from "./parts/treeNode/TreeNode";
import {Collapse} from 'react-collapse';
import Button from "../../pages/parts/buttons/Button";
import {useState} from "react";

const FindingAidsLocation = ({id, onTreeNodeClick}) => {
    const [locationOpen, setLocationOpen] = useState(true)

    const { data, error } = useSWR(`finding-aids-location/${id}/`, fetcher)

    const getClassType = (record, isLast=false) => {
        switch (record['level']) {
            case 'F':
                return 'FondsLast'
            case 'SF':
                return 'FondsLastSubfondsLast'
            case 'S':
                return 'FondsLastSubfondsLastSeriesLast'
            case 'container':
                return 'ContainerLast'
            case 'folder':
                if (record['key'] === 'placeholder') {
                    return 'FolderPlaceholder'
                } else {
                    return isLast ? 'FolderLast' : 'Folder'
                }
            case 'item':
                if (record['key'] === 'placeholder') {
                    return 'FolderPlaceholder'
                } else {
                    return isLast ? 'FolderLast' : 'Folder'
                }
        }
    }

    const onClick = () => {
        setLocationOpen(!locationOpen)
    }

    const handleTreeNodeClick = (id) => {
        onTreeNodeClick(id)
    }

    if (data) {
        return (
            <div className={style.LocationTree}>
                <div className={style.Row}>
                    <div className={style.Category}>Location</div>
                    <div className={style.Value}>
                        <Button
                            text={`${locationOpen ? 'Close' : 'Open'} location info`}
                            onClick={onClick}
                        />
                    </div>
                </div>
                <Collapse isOpened={locationOpen} >
                    <div className={style.Tree}>
                        {
                            data.map((record, index) => (
                                <TreeNode
                                    onTreeNodeClick={handleTreeNodeClick}
                                    key={index}
                                    data={record}
                                    selected={record['active']}
                                    classType={getClassType(record, index+1 === data.length)}
                                    open={true}
                                />
                            ))
                        }
                    </div>
                </Collapse>
            </div>
        )
    } else {
        return (
            <div className={style.LocationTree}>
                <Loader height={'200px'}/>
            </div>
        )
    }
}

export default FindingAidsLocation
