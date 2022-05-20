import style from "./PrimaryTypeButton.module.scss";

const PrimaryTypeButton = ({primaryType}) => {
    switch (primaryType) {
        case 'Archival Unit':
            return(
                <div className={style.Button}>
                    <img
                        alt="ArchivalUnitIcon"
                        title={'Archival Unit'}
                        src={'/icons/TypeArchivalUnit.svg'}
                        style={{display: 'block'}}
                    />
                </div>
            )
        case 'Book':
            return(
                <div className={style.Button}>
                    <img
                        alt="BookIcon"
                        title={'Book'}
                        src={'/icons/TypeBook.svg'}
                        style={{display: 'block'}}
                    />
                </div>
            );
        case 'Continuing Resource':
            return(
                <div className={style.Button}>
                    <img
                        alt="ContinuingResourceIcon"
                        title={'Continuing Resource'}
                        src={'/icons/TypeContinuingResource.svg'}
                        style={{display: 'block'}}
                    />
                </div>
            );
        case 'Folder / Item':
            return(
                <div className={style.Button}>
                    <img
                        alt="FolderItemIcon"
                        title={'Folder / Item'}
                        src={'/icons/TypeFolderItem.svg'}
                        style={{display: 'block'}}
                    />
                </div>
            );
        case 'Moving Image':
            return(
                <div className={style.Button}>
                    <img
                        alt="MovingImageIcon"
                        title={'Moving Image'}
                        src={'/icons/TypeMovingImage.svg'}
                        style={{display: 'block'}}
                    />
                </div>
            );
        case 'Textual':
            return(
                <div className={style.Button}>
                    <img
                        alt="TextualMaterialIcon"
                        title={'Textual Material'}
                        src={'/icons/TypeTextual.svg'}
                        style={{display: 'block'}}
                    />
                </div>
            );
        case 'Still Image':
            return(
                <div className={style.Button}>
                    <img
                        alt="ImageIcon"
                        title={'Still Image'}
                        src={'/icons/TypeImage.svg'}
                        style={{display: 'block'}}
                    />
                </div>
            );
        case 'Audio':
            return(
                <div className={style.Button}>
                    <img
                        alt="AudioIcon"
                        title={'Audio'}
                        src={'/icons/TypeAudio.svg'}
                        style={{display: 'block'}}
                    />
                </div>
            );
    }
}

export default PrimaryTypeButton;
