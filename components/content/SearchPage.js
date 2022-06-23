import React from "react";
import style from "./SearchPage.module.scss";
import FacetMenu from "../facets/FacetMenu";
import useSWR from "swr";
import {fetcher} from "../../utils/fetcher";

/**
 * Page responsible for displaying the search results
 *
 * @param {Object} params
 * @param {func} params.onSelectFacetGroup Handling of selecting a particular group.
 */
const SearchPage = ({onSelectFacetGroup}) => {
    const { data, error } = useSWR('/search', fetcher);

    return (
        <div className={style.ContentSearch}>
            <FacetMenu
                onSelectFacetGroup={onSelectFacetGroup}
            />
            <div className={style.Content}>
                <h2>Search</h2>
            </div>
        </div>
    )
}

export default SearchPage;
