import React from "react";
import {findingAidsFieldConfig} from "./config/findingAidsFieldConfig";
import FindingAidsItem from "./FindingAidsItem";
import style from './FindingAidsPage.module.scss'

const FindingAidsMetadataPage = ({id, data, language, isMobile, passRef}) => {
    if (data) {
        return (
            <div className={style.MetadataWrapper} ref={passRef}>
                {
                    findingAidsFieldConfig.map((ifc, index) => (
                        <div className={style.MetadataGroup} key={index}>
                            {
                                ifc['fields'].map((field, index) => (
                                    <FindingAidsItem
                                        id={id}
                                        language={language}
                                        key={index}
                                        record={data}
                                        group={ifc['group']}
                                        label={field['label']}
                                        links={ifc['link']}
                                        field={field['field']}
                                        bilingual={field['bilingual']}
                                        display={field.hasOwnProperty('display') ? field['display'] : 'sameRow'}
                                        isMobile={isMobile}
                                    />
                                ))}
                        </div>
                    ))
                }
            </div>
        )
    } else {
        return ''
    }
}

export default FindingAidsMetadataPage;
