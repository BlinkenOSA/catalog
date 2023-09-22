import style from './LibraryCollectionDrawer.module.scss'
import {libraryCollections} from "../libraryCollections";

const LibraryCollectionDrawer = ({open, collectionID, onClose, isMobile}) => {
    const renderContent = () => {
        if (libraryCollections.hasOwnProperty(collectionID)) {
            return libraryCollections[collectionID]['description']
        } else {
            return ''
        }
    }

    const renderInfo = () => {
        return (
            <div className={style.Info} >
                <div className={style.InfoFace}>つ(ಠ益ಠノ)</div>
                <div className={style.InfoMainText}>Select a collection</div>
                <div className={style.InfoText}>
                    If you click on a title, you will see a short information<br/>
                    about the collection.
                </div>
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className={open ? `${style.Drawer} ${style.Mobile}` : `${style.Drawer} ${style.Closed} ${style.Mobile}`}>
                <div className={style.Window}>
                    <div className={style.CloseButton} onClick={onClose}>
                        <span> </span>
                        <span> </span>
                    </div>
                    {renderContent()}
                </div>
            </div>
        )
    } else {
        return (
            <div className={style.Drawer}>
                {
                    open ?
                        <div className={style.Window}>
                            {renderContent()}
                        </div> : renderInfo()
                }
            </div>
        )
    }
}

export default LibraryCollectionDrawer;
