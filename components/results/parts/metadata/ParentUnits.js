import React from 'react';
import DescriptionValue from "../DescriptionValue";

const ParentUnits = ({label, result}) => {
    if (result['record_origin'] === 'Archives') {
        switch (result['description_level']) {
            case 'Fonds':
                return ''
            case 'Subfonds':
                return <DescriptionValue label={label} value={result['fonds_name']} />
            case 'Series':
                return <DescriptionValue label={label} value={result['subfonds_name']} />
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
