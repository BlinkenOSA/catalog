import style from "./FacetPage.module.scss";
import React from "react";
import Facets from "./FacetMenu";
import FacetValues from "./FacetValues";
import FacetHelper from "./FacetHelper";
import ResultCounter from "./ResultCounter";

const FacetPage = ({selectedFacetGroup, onSelectFacetGroup}: {
        selectedFacetGroup: string,
        onSelectFacetGroup: (facetName: string) => void
    }) => {

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
