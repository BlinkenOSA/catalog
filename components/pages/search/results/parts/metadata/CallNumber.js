import React from 'react';
import DescriptionValue from "../DescriptionValue";

const CallNumber = ({label, result}) => {
    if (result['record_origin'] === 'Archives') {
        return <DescriptionValue label={label} value={result['call_number']} />
    } else {
        return <DescriptionValue label={label} value={result['call_number']} />
    }
}

export default CallNumber;
