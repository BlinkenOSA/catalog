import style from "./PrimaryTypeButton.module.scss";
import {GrTree} from "react-icons/gr";

const PrimaryTypeButton = ({origin, primaryType, descriptionLevel}) => {
    if (origin === 'Film Library') {
        return (
            <div className={style.Button}>
                <img
                    alt="MovingImageIcon"
                    title={'Moving Image'}
                    src={'/icons/TypeMovingImage.svg'}
                    style={{display: 'block'}}
                />
                <span className={style.Text}>Moving Image</span>
            </div>
        )
    }

    switch (primaryType) {
        case 'Archival Unit':
            return(
              <div className={style.Button}>
                <GrTree/>
                <span className={style.Text}>{`${descriptionLevel} Description`}</span>
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
                    <span className={style.Text}>Book</span>
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
                    <span className={style.Text}>Continuing Resource</span>
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
                    <span className={style.Text}>Folder / Item</span>
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
                    <span className={style.Text}>Moving Image</span>
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
                    <span className={style.Text}>Textual</span>
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
                    <span className={style.Text}>Still Image</span>
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
                    <span className={style.Text}>Audio</span>
                </div>
            );
        default:
            return ''
    }
}

export default PrimaryTypeButton;
