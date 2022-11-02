import style from "./IsadItem.module.scss";
import React from "react";
import parse from 'html-react-parser';

const IsadItem = ({id, record, language, group, label, field, bilingual, links='', display='sameRow'}) => {
    const fieldName = language === 'EN' ? field : (bilingual ? `${field}_original` : field);

    const renderValue = (data) => {
        if (Array.isArray(data)) {
            if (display === 'sameRow') {
                return data.join(', ')
            } else {
                return data.map((d, index) => {
                    return <div key={index}>{d}</div>
                })
            }
        } else {
            return data
        }
    }

    const displayValues = () => {
        switch (field) {
            case 'year_from':
                return (
                    <React.Fragment>
                        <div>
                            {record['year_from']} - {record.hasOwnProperty('year_to') ? record['year_to'] : ''}
                            {record.hasOwnProperty('date_predominant') ? ` (predominant ${record['date_predominant']})` : ''}
                        </div>
                    </React.Fragment>
                )
            case 'accruals':
                switch (language) {
                    case 'HU':
                        return record['accruals'] ? 'Várható' : 'Nem várható'
                    default:
                        return record['accruals'] ? 'Expected' : 'Not Expected'

                }
            case 'description_level':
                return record['description_level']
            case 'isaar':
                return record['isaar'].map((rec, index) => {
                    return (
                        <div key={index}>
                            <a href={`/catalog/isaar/${rec['id']}`}>{rec['name']}</a>
                        </div>
                    )
                })
            case 'scope_and_content_abstract':
            case 'scope_and_content_narrative':
                return parse(record[fieldName])
            default:
                return renderValue(record[fieldName])
        }
    }

    const displayField = () => {
        return (
            <div className={style.Row}>
                <div className={style.Category}>{group.hasOwnProperty(language) ? group[language] : group['EN']}</div>
                <div className={style.Label}>{label.hasOwnProperty(language) ? label[language] : label['EN']}</div>
                <div className={style.Value}>
                    {displayValues()}
                </div>
            </div>
        )
    }

    const detectValueExists = (fieldName) => {
        let exists = false;
        if (record.hasOwnProperty(fieldName)) {
            if (Array.isArray(record[fieldName])) {
                if (record[fieldName].length > 0) {
                    exists = true
                }
            } else {
                if (record[fieldName] !== "" && record[fieldName] !== null) {
                    exists = true
                }
            }
        }
        return exists
    }

    if (record) {
        if (detectValueExists(fieldName)) {
            return displayField()
        }
    }
    return ''

}

export default IsadItem;
