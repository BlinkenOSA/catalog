import style from "./FacetPage.module.scss";
import React from "react";
import FacetMenu from "./FacetMenu";
import FacetValues from "./parts/FacetValues";
import FacetHelper from "./parts/FacetHelper";
import ResultCounter from "./parts/ResultCounter";

/**
 * The facet management page. Displays when a user clicks on a facet group.
 *
 * @param {Object} params
 * @param {string} params.selectedFacetGroup The name of the selected facet group.
 * @param {function} params.onSelectFacetGroup Handling of selecting a particular group.
 * @param {func} params.onFilterClick Handling clicking the Filter button.
 */
const FacetPage = ({selectedFacetGroup, onSelectFacetGroup, onFilterClick}) => {
    return (
        <div className={style.FacetPageWrapper}>
            <div className={style.FacetPage}>
                <FacetMenu
                    inverse={true}
                    selectedFacetGroup={selectedFacetGroup}
                    onSelectFacetGroup={onSelectFacetGroup}
                />
                <div className={style.FacetSelection}>
                    <FacetValues selectedFacetGroup={selectedFacetGroup} />
                </div>
                <div className={style.FacetDescription}>
                    <FacetHelper selectedFacetGroup={selectedFacetGroup} />
                </div>
                <div className={style.ResultCounter}>
                    <ResultCounter onFilterClick={onFilterClick} />
                </div>
            </div>
        </div>
    )
}

export default FacetPage;
