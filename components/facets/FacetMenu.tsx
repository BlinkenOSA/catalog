import style from "./FacetMenu.module.scss";
import React from "react";
import {facetConfig} from "../../config/facetConfig";

const FacetMenu = ({inverse, selectedFacetGroup, onSelectFacetGroup}: {
        inverse?: boolean,
        selectedFacetGroup?: string,
        onSelectFacetGroup: (facetName: string) => void
    }) => {

    const renderFacetButtons = () => {
        return (
            Object.keys(facetConfig).map((key, value) => (
                <li
                    className={inverse && selectedFacetGroup === key ? style.FacetSelected : undefined}
                    key={key}
                    onClick={() => onSelectFacetGroup(key)}
                >
                    <span>{facetConfig[key]['title']}</span>
                    <div className={style.Button} />
                </li>
            ))
        )
    }

    return (
        <div className={inverse ? `${style.Facets} ${style.FacetsInverse}` : style.Facets}>
            <ul>
                {renderFacetButtons()}
            </ul>
        </div>
    )
}

export default FacetMenu;
