import style from "../IsadPage.module.scss";
import React from "react";
import {isadFieldConfig} from "../isadFieldConfig";
import IsadItem from "../IsadItem";


const IsadMetadataPage = ({id, data, language}) => {
    if (data) {
        return (
            <div>
                {
                    isadFieldConfig.map((ifc, index) => (
                        <div className={style.MetadataGroup} key={index}>
                            {
                                ifc['fields'].map((field, index) => (
                                    <IsadItem
                                        id={id}
                                        language={language}
                                        key={index}
                                        record={data}
                                        group={ifc['group']}
                                        label={field['label']}
                                        links={ifc['link']}
                                        field={field['field']}
                                        display={field.hasOwnProperty('display') ? field['display'] : 'sameRow'}
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

export default IsadMetadataPage;
