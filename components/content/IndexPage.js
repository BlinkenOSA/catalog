import React from "react";
import style from "./IndexPage.module.scss";
import FacetMenu from "../facets/FacetMenu";
import Badges from "./parts/indexPage/Badges";


/**
 * Page responsible for displaying the search results
 *
 * @param {Object} params
 * @param {func} params.onSelectFacetGroup Handling of selecting a particular group.
 */
const IndexPage = ({onSelectFacetGroup}) => {
    return (
        <div className={style.ContentIndex}>
            <FacetMenu
                onSelectFacetGroup={onSelectFacetGroup}
            />
            <div className={style.Content}>
                <Badges />
            </div>
        </div>
    )
}

export default IndexPage;
