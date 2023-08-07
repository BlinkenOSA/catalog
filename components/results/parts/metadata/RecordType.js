import DescriptionValue from "../DescriptionValue";

const RecordType = ({label, result}) => {
    const renderValue = () => {
        switch (result['record_origin']) {
            case 'Archives':
                switch (result['description_level']) {
                    case 'Fonds':
                        return `Archival Fonds description`
                    case 'Subfonds':
                        return `Archival Subfonds description`
                    case 'Series':
                        return `Archival Series description`
                    case 'Folder':
                        if (result['primary_type'] === 'Textual') {
                            return `Folder in ${result['container_type']}`
                        } else {
                            return result['container_type']
                        }
                    case `Item`:
                        if (result['primary_type'] === 'Textual') {
                            return `Item in a folder in ${result['container_type']}`
                        } else {
                            return result['container_type']
                        }
                    default:
                        return ''
                }
            case 'Film Library':
                return `Moving Image, ${result['extent']}`
            case 'Library':
                return `${result['primary_type']}${result['extent'] ? `, ${result['extent']}` : ''}`
            default:
                return ''
        }
    }

    return <DescriptionValue label={label} value={renderValue()} />
}

export default RecordType;
