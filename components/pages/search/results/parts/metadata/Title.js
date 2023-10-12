import parse from 'html-react-parser';

const Title = ({result, highlights}) => {
    const renderTitle = () => {
        if (highlights && highlights.hasOwnProperty(result['id'])) {
            if (highlights[result['id']].hasOwnProperty('title_search_en')) {
                const title = highlights[result['id']]['title_search_en'].join()
                return parse(title);
            }
        }
        return result['title']
    }

    if (result['record_origin'] === 'Archives') {
        if (result['primary_type'] === 'Archival Unit') {
            return <span>{result['reference_code']} {renderTitle()} [{result['date_created']}]</span>
        } else {
            return <span>{renderTitle()} [{result['date_created']}]</span>
        }
    } else {
        return <span>{renderTitle()}{result['date_created'] ? ` [${result['date_created']}]` : ''}</span>
    }
}

export default Title;
