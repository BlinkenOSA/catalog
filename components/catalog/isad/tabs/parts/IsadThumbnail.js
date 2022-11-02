import getURL from "../../../../../utils/digitalObjectFunctions";

const IsadThumbnail = ({record}) => {
    const archivalReferenceCode = record['call_number'][0]

    return (
        <div style={{paddingBottom: '10px'}}>
            <img
                width={150}
                alt={'thumbnail'}
                src={getURL(archivalReferenceCode, record['primary_type'], true)}
            />
        </div>
    )
}

export default IsadThumbnail;
