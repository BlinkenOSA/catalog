import style from "./LibraryItem.module.scss";
import React, {useEffect, useState} from "react";
import {iso6392} from "iso-639-2";

const LibraryItem = ({record, group, label, fieldConfig, links={}, display='sameRow', isMobile}) => {
    let values = [];

    const getValues = (document, field, subfields, linkedSubfields) => {
        const values = [];
        const fields = document['fields'].filter(df => Object.keys(df).includes(field))
        fields.forEach(f => {
            const v = []
            f[field]['subfields'].forEach(sf => {
                const subfieldTag = Object.keys(sf)[0]
                if (subfields.includes(subfieldTag)) {
                    const value = sf[subfieldTag]
                    if (linkedSubfields.includes(subfieldTag)) {
                        v.push({value: value, link: true})
                    } else {
                        v.push({value: value, link: false})
                    }
                }
            })
            values.push(v)
        })
        return values
    }

    const addValues = (fieldKey, subfields) => {
        const value = {
            field: fieldKey,
            displayValues: [],
            link: ''
        };
        let linkedSubfields = []

        // We collect the target parameter, plus the linked subfields
        if (Object.keys(links).includes(fieldKey)) {
            value['link'] = links[fieldKey]['target']
            linkedSubfields = links[fieldKey]['subfields'];
        }
        const displayValues = getValues(record, fieldKey, subfields, linkedSubfields)

        if (displayValues.length > 0) {
            if(displayValues[0].length > 0) {
                value['displayValues'] = displayValues
                values.push(value)
            }
        }
    }

    const clearLinkText = (value) => {
        return value.replace(/[\s|\.|\,]+$/i, '');
    }

    const displayValues = () => {
        return values.map(fieldValues => {
            switch (fieldValues['field']) {
                case '041':
                    return fieldValues['displayValues'].map((displayValues) => (
                      <div>
                          {
                              displayValues.map((displayValue, index) => {
                                  const lang = iso6392.filter(l => l['iso6392B'] === displayValue['value'])
                                  return <span> {lang.length > 0 ? lang[0]['name'] : ''}</span>
                              })
                          }
                      </div>
                    ))
                case '650':
                    return fieldValues['displayValues'].map((displayValues) => (
                      <div>
                          {
                              displayValues.map((displayValue, index) => {
                                  if (displayValue['link']) {
                                      return (
                                        <React.Fragment>
                                            <span> {index > 0 ? '->' : ''} </span>
                                            <a href={`/?${fieldValues['link']}=${clearLinkText(displayValue['value'])}`}>
                                                {displayValue['value']}
                                            </a>
                                        </React.Fragment>
                                      )
                                  } else {
                                      return (
                                        <React.Fragment>
                                            <span> {index > 0 ? '->' : ''} </span>
                                            <span> {displayValue['value']}</span>
                                        </React.Fragment>
                                      )
                                  }
                              })
                          }
                      </div>
                    ))
                default:
                    return fieldValues['displayValues'].map((displayValues) => (
                        <div>
                            {
                              displayValues.map((displayValue, index) => {
                                  if (displayValue['link']) {
                                      return (
                                        <a href={`/?${fieldValues['link']}=${clearLinkText(displayValue['value'])}`}>
                                            {displayValue['value']}
                                        </a>
                                      )
                                  } else {
                                      return (<span> {displayValue['value']}</span>)
                                  }
                              })
                            }
                        </div>
                    ))
            }
        })
    }

    // Preparation
    if (fieldConfig) {
        let subfields;
        // If fieldConfig is an array of values, that means that we need to grab all the subfields
        if (Array.isArray(fieldConfig)) {
            fieldConfig.forEach(fieldKey => {
                subfields = "abcdefghijklmnopqrstuvwxyz".split("")
                addValues(fieldKey, subfields)
            })
            // Every other case, we are only allowing certain subfields
        } else {
            Object.keys(fieldConfig).forEach(fieldKey => {
                subfields = fieldConfig[fieldKey]
                addValues(fieldKey, subfields)
            })
        }
    }

    if (values.length > 0) {
        if (values[0]['displayValues'].length > 0) {
            if (isMobile) {
                return (
                    <div className={`${style.Row} ${style.Mobile}`}>
                        <div className={style.Category}>{group}</div>
                        <div className={style.ValueWrapper}>
                            <div className={style.Label}>{label}</div>
                            <div className={style.Value}>
                                {displayValues()}
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
                            {displayValues()}
                        </div>
                    </div>
                )
            }
        }
    }
    return ''

}

export default LibraryItem;
