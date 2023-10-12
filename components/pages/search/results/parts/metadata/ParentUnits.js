import React from 'react';
import DescriptionValue from "../DescriptionValue";

const ParentUnits = ({label, result}) => {
    if (result['record_origin'] === 'Archives') {
        return <DescriptionValue label={label} value={result['parent_unit']} />
    } else {
        return ''
    }
}

export default ParentUnits;
