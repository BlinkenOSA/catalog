const Title = ({result}) => {
    if (result['record_origin'] === 'Archives') {
        if (result['primary_type'] === 'Archival Unit') {
            return `${result['reference_code']} ${result['title']} [${result['date_created']}]`
        } else {
            return `${result['title']} [${result['date_created']}]`
        }
    } else {
        return `${result['title']} [${result['date_created']}]`
    }
}

export default Title;
