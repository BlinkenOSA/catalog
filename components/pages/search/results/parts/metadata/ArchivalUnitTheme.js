const ArchivalUnitTheme = ({result}) => {
    switch (result['record_origin']) {
        case 'Archives':
            return result.hasOwnProperty('archival_unit_theme') ? `Theme: ${result['archival_unit_theme'].join(', ')}` : ''
    }
}

export default ArchivalUnitTheme;
