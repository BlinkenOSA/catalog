import style from "./IsadItem.module.scss";
import React from "react";
import parse from 'html-react-parser';

const IsadItem = ({id, record, language, group, label, field, bilingual, links='', display='sameRow', isMobile}) => {
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
        switch (fieldName) {
            case 'year_from':
                const renderDatePredominant = () => {
                    if (record.hasOwnProperty('date_predominant')) {
                        return record['date_predominant'] !== null ? ` (predominant ${record['date_predominant']})` : ''
                    } else {
                        return ''
                    }
                }

                return (
                    <React.Fragment>
                        <div>
                            {record['year_from']} - {record.hasOwnProperty('year_to') ? record['year_to'] : ''}
                            {renderDatePredominant()}
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
                if (record.hasOwnProperty('isaar')) {
                    return (
                      <div>
                         {record['isaar']['name']}
                      </div>
                    )
                } else {
                    return ''
                }
            case 'scope_and_content_abstract':
            case 'scope_and_content_abstract_original':
            case 'scope_and_content_narrative':
            case 'scope_and_content_narrative_original':
            case 'archival_history':
            case 'archival_history_original':
            case 'system_of_arrangement_information':
            case 'system_of_arrangement_information_original':
            case 'administrative_history':
            case 'administrative_history_original':
            case 'physical_characteristics':
            case 'physical_characteristics_original':
            case 'note':
            case 'note_original':
                return parse(record[fieldName])
            default:
                return renderValue(record[fieldName])
        }
    }

    const displayField = () => {
        if (isMobile) {
            return (
                <div className={`${style.Row} ${style.Mobile}`}>
                    <div className={style.Category}>{group.hasOwnProperty(language) ? group[language] : group['EN']}</div>
                    <div className={style.ValueWrapper}>
                        <div className={style.Label}>{label.hasOwnProperty(language) ? label[language] : label['EN']}</div>
                        <div className={style.Value}>
                            {displayValues()}
                        </div>
                    </div>
                </div>
            )
        } else {
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
