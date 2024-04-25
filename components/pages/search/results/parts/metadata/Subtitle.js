import parse from "html-react-parser";

const Subtitle = ({result, highlights}) => {
    const renderValue = (valueKey, suffix) => {
        if (highlights && highlights.hasOwnProperty(result['id'])) {
            if (highlights[result['id']].hasOwnProperty('creator_search')) {
                const title = highlights[result['id']]['creator_search'].join(', ').toUpperCase()
                return parse(`${suffix} ${title}`);
            }
        }
        return result['valueKey']
    }

    switch(result['record_origin']) {
        case 'Archives':
            switch (result['archival_level']) {
                case 'Archival Unit':
                    return '';
                case 'Folder/Item':
                    return '';
            }
        case 'Film Library':
            return renderValue('director', 'directed by')
        case 'Library':
            return renderValue('author', 'by')
        default:
            return ''
    }
}

export default Subtitle;
