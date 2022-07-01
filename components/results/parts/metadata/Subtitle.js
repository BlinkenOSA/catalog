const Subtitle = ({result}) => {
    switch(result['record_origin']) {
        case 'Archives':
            switch (result['archival_level']) {
                case 'Archival Unit':
                    return '';
                case 'Folder/Item':
                    return '';
            }
        case 'Film Library':
            return result.hasOwnProperty('director') ? `directed by ${result['director'].join(', ').toUpperCase()}` : ''
        case 'Library':
            return result.hasOwnProperty('author') ? `by ${result['author'].join(', ').toUpperCase()}` : '';
        default:
            return ''
    }
}

export default Subtitle;
