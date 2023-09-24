import style from "./FilterMenu.module.scss";
import React from "react";
import {galleryFacetConfig} from "../../../../config/galleryFacetConfig";

/**
 * Displaying the main facet selector menu. Either the basic (light) or the inverted (dark) version
 *
 * @param {Object} params
 * @param {boolean} params.inverse Define if the menu is in inverse (dark) display mode.
 * @param {string} params.selectedFacetGroup The name of the selected facet group.
 * @param {func} params.onSelectFacetGroup Handling of selecting a particular group.
 */
const FilterMenu = ({inverse, selectedFacetGroup, onSelectFacetGroup}) => {

  /**
   * Rendering the facetGroup buttons.
   */
  const renderFacetButtons = () => {
        return (
            Object.keys(galleryFacetConfig).map((key) => (
                galleryFacetConfig[key]['type'] &&
                <li
                    className={inverse && selectedFacetGroup === key ? style.FacetSelected : undefined}
                    key={key}
                    onClick={() => onSelectFacetGroup(key)}
                >
                    <span>{galleryFacetConfig[key]['title']}</span>
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

export default FilterMenu;
