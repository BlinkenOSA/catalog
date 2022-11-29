import style from "./LibraryItem.module.scss";
import {getValues} from "../../../utils/marcFunctions";
import React from "react";
import {displaySubjectField} from "../../../utils/libraryDisplayFunctions";

const LibraryItem = ({record, data, group, label, fieldConfig, links={}, display='sameRow', isMobile}) => {
    let values = [];

    const addValues = (fieldKey, subfields) => {
        const value = {field: fieldKey, linkedValue: [], value: [] , link: ''};
        if (Object.keys(links).includes(fieldKey)) {
            subfields = subfields.filter(x => !links[fieldKey]['fields'].includes(x));
            value['link'] = links[fieldKey]['target']
            value['linkedValue'] = getValues(record, fieldKey, links[fieldKey]['fields'])
        }
        value['value'] = getValues(record, fieldKey, subfields)
        if (value['linkedValue'].length > 0 || value['value'].length > 0) {
            values = values.concat(value)
        }
    }

    if (fieldConfig) {
        if (Array.isArray(fieldConfig)) {
            fieldConfig.forEach(fieldKey => {
                const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
                addValues(fieldKey, alphabetArray)
            })
        } else {
            Object.keys(fieldConfig).forEach(fieldKey => {
                if (fieldConfig[fieldKey] === 'all') {
                    const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
                    addValues(fieldKey, alphabetArray)
                } else {
                    let subfields = fieldConfig[fieldKey]
                    addValues(fieldKey, subfields)
                }
            })
        }
    }

    const displayValues = () => {
        const displayLink = (link, linkedValues, type = 'sameRow') => {
            if (linkedValues.length > 0) {
                switch (type) {
                    case 'sameRow':
                        return (
                            linkedValues.map(lv => (
                                <a href={`/?${link}=${lv.join(' ')}`}>
                                    {lv.join(' ')}
                                </a>
                            ))
                        )
                    default:
                        return linkedValues.map((lv, index) => (
                            <div key={index}>
                                <a href={`/?${link}=${lv.join(' ')}`}>
                                    {lv.join(' ')}
                                </a>
                            </div>
                        ))
                }
            } else {
                return ''
            }
        }

        const displayData = (value, type = 'sameRow') => {
            if (value.length > 0) {
                switch (type) {
                    case 'sameRow':
                        return value.map(v => v.join(' ')).join(' ')
                    default:
                        return value.map((v, index) => (
                            <div key={index}>
                                {v.join(' ')}
                            </div>
                        ))
                }
            } else {
                return ''
            }
        }

        if (display === 'sameRow') {
            return (
                <div>
                    {
                        values.map((value, index) => {
                            switch (value['field']) {
                                default:
                                    return (
                                        <span key={index}>
                                            {displayLink(value['link'], value['linkedValue'])} {displayData(value['value'])}
                                        </span>
                                    )
                            }
                        })
                    }
                </div>
            )
        } else {
            return (
                values.map((value, index) => {
                    switch (value['field']) {
                        case '650':
                            return displaySubjectField(value);
                        default:
                            return (
                                <div key={index}>
                                    <span>
                                        {displayLink(value['link'], value['linkedValue'], 'newRow')} {displayData(value['value'], 'newRow')}
                                    </span>
                                </div>
                            )
                    }
                })
            )
        }
    }

    if (data || values.length > 0) {
        if (values[0]['value'].length > 0 || values[0]['linkedValue'].length > 0 ) {
            if (isMobile) {
                return (
                    <div className={`${style.Row} ${style.Mobile}`}>
                        <div className={style.Category}>{group}</div>
                        <div className={style.ValueWrapper}>
                            <div className={style.Label}>{label}</div>
                            <div className={style.Value}>
                                {data ? data : displayValues()}
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className={style.Row}>
                        <div className={style.Category}>{group}</div>
                        <div className={style.Label}>{label}</div>
                        <div className={style.Value}>
                            {data ? data : displayValues()}
                        </div>
                    </div>
                )
            }
        }
    }
    return ''

}

export default LibraryItem;
