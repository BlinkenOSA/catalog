import parse from 'html-react-parser';

const Title = ({result}) => {
    const {_formatted} = result

    if (result['record_origin'] === 'Archives') {
        if (result['primary_type'] === 'Archival Unit') {
            return <span>{result['reference_code']} {parse(_formatted['title'])} [{result['date_created']}]</span>
        } else {
            return <span>{parse(_formatted['title'])} [{result['date_created']}]</span>
        }
    } else {
        return <span>{parse(_formatted['title'])}{result['date_created'] ? ` [${result['date_created']}]` : ''}</span>
    }
}

export default Title;
