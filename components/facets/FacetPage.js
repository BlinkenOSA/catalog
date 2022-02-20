import style from "./FacetPage.module.scss";
import React from "react";
import Facets from "./FacetMenu";
import FacetValues from "./FacetValues";
import FacetHelper from "./FacetHelper";
import ResultCounter from "./ResultCounter";
import {useRouter} from "next/router";

/**
 * The facet management page. Displays when a user clicks on a facet group.
 *
 * @param {Object} params
 * @param {string} params.selectedFacetGroup The name of the selected facet group.
 * @param {function} params.onSelectFacetGroup Handling of selecting a particular group.
 */
const FacetPage = ({selectedFacetGroup, onSelectFacetGroup}) => {
    return (
        <div className={style.FacetPageWrapper}>
            <div className={style.FacetPage}>
                <Facets
                    inverse={true}
                    selectedFacetGroup={selectedFacetGroup}
                    onSelectFacetGroup={onSelectFacetGroup}
                />
                <div className={style.FacetSelection}>
                    <FacetValues
                        selectedFacetGroup={selectedFacetGroup}
                    />
                </div>
                <div className={style.FacetDescription}>
                    <FacetHelper
                        selectedFacetGroup={selectedFacetGroup}
                    />
                </div>
                <div className={style.ResultCounter}>
                    <ResultCounter />
                </div>
            </div>
        </div>
    )
}

export default FacetPage;
