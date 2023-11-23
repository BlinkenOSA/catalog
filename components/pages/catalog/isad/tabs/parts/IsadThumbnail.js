import {getPdfURL, getURL, getVideoURL} from "../../../../../../utils/digitalObjectFunctions";

const IsadThumbnail = ({record}) => {
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

    return (
        <div style={{paddingBottom: '10px'}}>
            <img
                width={150}
                alt={'thumbnail'}
                src={getThumbnailURL()}
            />
        </div>
    )
}

export default IsadThumbnail;
