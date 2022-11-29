import useSWR from "swr";
import {fetcher} from "../../../utils/fetcherFunctions";
import style from "./FindingAidsLocation.module.scss";
import Loader from "../../pages/parts/loader/Loader";
import TreeNode from "./parts/treeNode/TreeNode";
import {Collapse} from 'react-collapse';
import Button from "../../pages/parts/buttons/Button";
import {useState} from "react";

const FindingAidsLocation = ({id, onTreeNodeClick, isMobile}) => {
    const [locationOpen, setLocationOpen] = useState(true)

    const { data, error } = useSWR(`finding-aids-location/${id}/`, fetcher)

    const getClassType = (record, isLast=false) => {
        switch (record['level']) {
            case 'F':
                return 'FondsLast'
            case 'SF':
                return 'FondsLastSubfondsLast'
            case 'S':
                if (record['has_subfonds']) {
                    return 'FondsLastSubfondsLastSeriesLast'
                } else {
                    return 'FondsLastSeriesLast'
                }
            case 'container':
                if (record['has_subfonds']) {
                    return 'ContainerWithSubfondsLast'
                } else {
                    return 'ContainerWithoutSubfondsLast'
                }
            case 'folder':
            case 'item':
                if (record['key'] === 'placeholder') {
                    if (record['has_subfonds']) {
                        return 'FolderPlaceholderWithSubfonds'
                    } else {
                        return 'FolderPlaceholderWithoutSubfonds'
                    }
                } else {
                    if (record['has_subfonds']) {
                        return isLast ? 'FolderWithSubfondsLast' : 'FolderWithSubfonds'
                    } else {
                        return isLast ? 'FolderWithoutSubfondsLast' : 'FolderWithoutSubfonds'
                    }
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
                <div className={isMobile ? `${style.Row} ${style.Mobile}` : style.Row}>
                    <div className={style.Category}>Location</div>
                    <div className={style.Value}>
                        <Button
                            text={`${locationOpen ? 'Close' : 'Open'} location info`}
                            onClick={onClick}
                        />
                    </div>
                </div>
                <Collapse isOpened={locationOpen} >
                    <div className={isMobile ? `${style.Tree} ${style.Mobile}` : style.Tree}>
                        {
                            data.map((record, index) => (
                                <TreeNode
                                    onTreeNodeClick={handleTreeNodeClick}
                                    key={index}
                                    data={record}
                                    selected={record['active']}
                                    classType={getClassType(record, index+1 === data.length)}
                                    open={true}
                                    isMobile={isMobile}
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
