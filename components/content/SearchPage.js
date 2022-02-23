import React from "react";
import style from "./SearchPage.module.scss";
import FacetMenu from "../facets/FacetMenu";

/**
 * Page responsible for displaying the search results
 *
 * @param {Object} params
 * @param {func} params.onSelectFacetGroup Handling of selecting a particular group.
 */
const SearchPage = ({onSelectFacetGroup}) => {

    return (
        <div className={style.ContentSearch}>
            <FacetMenu
                onSelectFacetGroup={onSelectFacetGroup}
            />
            <div className={style.Content}>

            </div>
        </div>
    )
}

export default SearchPage;
