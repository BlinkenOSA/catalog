import {getPdfURL, getURL, getVideoURL} from "../../../../../../utils/digitalObjectFunctions";
import style from "./IsadThumbnail.module.scss";

const IsadThumbnail = ({record, isMobile=false}) => {
    const archivalReferenceCode = record['call_number']

    const getThumbnailURL = () => {
        switch (record['primary_type']) {
            case 'Textual':
                return getPdfURL(record['digital_version_barcode'], '', true)
            case 'Moving Image':
                return getVideoURL(record['digital_version_barcode'], true)
            case 'Still Image':
                return getURL(archivalReferenceCode, record['digital_version_barcode'], record['primary_type'], true);
            case 'Audio':
                return getURL(archivalReferenceCode, record['digital_version_barcode'], record['primary_type'], true);
        }
    }

    const getIconClass = () => {
        switch(record['primary_type']) {
            case 'Textual':
            case 'Still Image':
                return '';
            case 'Moving Image':
                return style.MovingImage;
            case 'Audio':
                return style.MovingImage;
        }
    }

    return (
        <div style={{paddingBottom: '10px'}}>
            <div className={isMobile ? `${style.Thumbnail} ${style.Mobile}` : style.Thumbnail}>
                <div className={getIconClass()}>
                    <img
                      width={isMobile ? 100 : 200}
                      alt={'thumbnail'}
                      src={getThumbnailURL()}
                    />
                </div>
            </div>
        </div>
    )
}

export default IsadThumbnail;
