import React from 'react';
import DescriptionValue from "../DescriptionValue";

const ParentUnits = ({label, result}) => {
    if (result['record_origin'] === 'Archives') {
        switch (result['description_level']) {
            case 'Fonds':
                return ''
            case 'Subfonds':
                return <DescriptionValue label={label} value={'HU OSA 1 Records of the Open Society Foundation for Albania'} />
            case 'Series':
                return (
                    <React.Fragment>
                        <DescriptionValue label={label} value={'HU OSA 1-1 Records of the Open Society Foundation for Albania:Executive Office'} />
                    </React.Fragment>
                )
            case 'Folder':
                return <DescriptionValue label={label} value={result['series_name']} />
            case 'Item':
                return <DescriptionValue label={label} value={result['series_name']} />
            default:
                return ''
        }
    } else {
        return ''
    }
}

export default ParentUnits;
