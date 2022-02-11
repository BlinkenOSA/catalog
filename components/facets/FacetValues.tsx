import style from "./FacetValues.module.scss";
import React, {useState} from "react";
import {facetValues} from "../../utils/facetValues";
import FacetSearch from "./FacetSearch";
import {facetConfig} from "../../config/facetConfig";

const FacetValues = ({selectedFacetGroup}: {
        selectedFacetGroup: string,
    }) => {

    const renderFacetButtons = () => {
        const facets: {value: string, count: number}[] = facetValues[selectedFacetGroup];

        return (
            facets.map((facet, index) => (
                <li
                    key={index}
                >
                    <span>{facet['value']}</span>
                    <div className={style.Button} />
                </li>
            ))
        )
    }

    if (facetValues.hasOwnProperty(selectedFacetGroup)) {
        return (
            <div className={style.FacetValues}>
                {facetConfig[selectedFacetGroup]['search'] && <FacetSearch/>}
                <ul>
                    {renderFacetButtons()}
                </ul>
            </div>
        )
    } else {
        return (<span/>)
    }
}

export default FacetValues;
