import style from "./IsadItem.module.scss";
import React from "react";
import parse from 'html-react-parser';

const IsadItem = ({id, record, language, group, label, field, links={}, display='sameRow'}) => {
    const getData = () => {
        if (language === 'EN') {
            return record['isad-eng'];
        } else {
            if (record.hasOwnProperty('isad-translation')) {
                return record['isad-translation'];
            } else {
                return {};
            }
        }
    }
    const isadData = getData();

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
            case 'dateFrom':
                return (
                    <React.Fragment>
                        <div>
                            {isadData['dateFrom']} - {isadData.hasOwnProperty('dateTo') ? isadData['dateTo'] : ''}
                            {isadData.hasOwnProperty('datePredominant') ? ` (predominant ${isadData['datePredominant']})` : ''}
                        </div>
                    </React.Fragment>
                )
            case 'scopeAndContentAbstract':
            case 'scopeAndContentNarrative':
                return parse(isadData[field])
            default:
                return renderValue(isadData[field])
        }
    }

    if (isadData) {
        if (isadData.hasOwnProperty(field)) {
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
    return ''

}

export default IsadItem;
