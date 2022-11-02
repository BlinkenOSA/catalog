import style from "./FindingAidsItem.module.scss";
import React from "react";
import parse from 'html-react-parser';

const FindingAidsItem = ({id, record, language, group, label, field, links={}, display='sameRow'}) => {
    const fieldName = field;

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
            case 'archival_unit':
                return <a href={`/catalog/${record['catalog_id']}`}>{record['archival_unit']['title_full']}</a>
            case 'date_from':
                let dates = []
                dates.push(`${record['date_from']}${record['date_to'] ? `- ${record['date_to']}` : ''}`)
                record['dates'].forEach(d => {
                    dates.push(`${d['date_from']}${d['date_to'] ? `- ${d['date_to']}` : ''}${d['date_type'] ? ` (${d['date_type']})` : ''}`)
                })
                return renderValue(dates)
            case 'contents_summary':
                return parse(record[field])
            case 'duration':
                let d = []
                const duration = record['duration'].split(':')
                if (Number(duration[0]) > 0) {
                    d.push(Number(duration[0]) > 1 ? `${Number(duration[0])} hours` : `${Number(duration[0])} hour`)
                }
                if (Number(duration[1]) > 0) {
                    d.push(Number(duration[1]) > 1 ? `${Number(duration[1])} minutes` : `${Number(duration[1])} minute`)
                }
                if (Number(duration[2]) > 0) {
                    d.push(Number(duration[2]) > 1 ? `${Number(duration[2])} seconds` : `${Number(duration[2])} second`)
                }
                return d.join(' ');
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

export default FindingAidsItem;
