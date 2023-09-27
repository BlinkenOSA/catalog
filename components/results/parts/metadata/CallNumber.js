import React from 'react';
import DescriptionValue from "../DescriptionValue";

const CallNumber = ({label, result}) => {
    if (result['record_origin'] === 'Archives') {
        switch (result['description_level']) {
            case 'Folder':
                return <DescriptionValue label={label} value={result['call_number']} />
            case 'Item':
                return <DescriptionValue label={label} value={result['call_number']} />
            default:
                return ''
        }
    } else {
        return <DescriptionValue label={label} value={result['call_number']} />
    }
}

export default CallNumber;
