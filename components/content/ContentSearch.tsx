import React from "react";
import style from "./ContentSearch.module.scss";
import FacetMenu from "../facets/FacetMenu";

const ContentSearch = ({onSelectFacetGroup}: {
    onSelectFacetGroup: (facetName: string) => void
    }) => {

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

export default ContentSearch;
