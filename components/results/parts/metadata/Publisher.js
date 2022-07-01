import DescriptionValue from "../DescriptionValue";

const Publisher = ({label, result}) => {
    const renderValue = () => {
        switch (result['record_origin']) {
            case 'Library':
                return result.hasOwnProperty('publisher') ? result['publisher'].join(', ') : ''
            case 'Film Library':
                return result.hasOwnProperty('publisher') ? result['publisher'].join(', ') : ''
            default:
                return '';
        }
    }

    return <DescriptionValue label={label} value={renderValue()} />
}

export default Publisher;
