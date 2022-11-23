import style from "./FacetPageMobile.module.scss";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {addFacet, removeFacet} from "../../../utils/facetFunctions";
import {createParams} from "../../../utils/urlParamFunctions";
import {facetConfig} from "../../../config/facetConfig";
import {Collapse} from "react-collapse";
import dynamic from "next/dynamic";
import ResultCounterMobile from "./ResultCounterMobile";
import FacetDateRangeMobile from "./FacetDateRangeMobile";

const FacetValuesMobile = dynamic(() => import("./FacetValuesMobile"), {
    ssr: false,
});

/**
 * The facet management page. Displays when a user clicks on a facet group.
 *
 * @param {Object} params
 * @param {func} params.onShowButtonClick Handling clicking the Show button.
 * @param {Object} params.facets Facet results of the search query.
 * @param {number} params.total Total number of results.
 */
const FacetPageMobile = ({ onShowButtonClick, facets, total, breadcrumbHeight}) => {
    const router = useRouter();
    const {query, limit, offset, ...selectedFacets} = router.query;

    const [selectedFacetGroup, setSelectedFacetGroup] = useState('record_origin')

    /**
     * Handler of changing the facetValue, either it's an add or a remove.
     *
     * @param value The value to be added to the selectedFacets. It will be added to the page URL params.
     * @param action The action wether it's 'add' or 'remove'.
     */
    const onFacetActionClick = (value, action) => {
        if (action === 'add') {
            addFacetValue(value)
        } else {
            removeFacetValue(value)
        }
    }

    /**
     * Handler of adding the facetValue.
     *
     * @param value The value to be added to the selectedFacets. It will be added to the page URL params.
     */
    const addFacetValue = (value) => {
        const sf = addFacet(selectedFacets, selectedFacetGroup, value);

        router.replace({
            query: createParams(query, limit, 0, sf),
        }, undefined, {shallow: true});
    };

    /**
     * Handler of removing the facetValue.
     *
     * @param value The value to be removed from the selectedFacets. It will be removed from the page URL params.
     */
    const removeFacetValue = (value) => {
        const newFacets = removeFacet(selectedFacets, selectedFacetGroup, value)

        router.replace({
            query: createParams(query, limit, 0, newFacets),
        }, undefined, {shallow: true})
    }

    const getSelectedFacetValues = () => {
        let facetValues = [];

        if (selectedFacets.hasOwnProperty(selectedFacetGroup)) {
            if (Array.isArray(selectedFacets[selectedFacetGroup])) {
                facetValues = selectedFacets[selectedFacetGroup];
            } else {
                facetValues = [selectedFacets[selectedFacetGroup]]
            }
        }
        return facetValues
    }

    const handleFacetGroupClick = (key) => {
        selectedFacetGroup === key ? setSelectedFacetGroup('') : setSelectedFacetGroup(key)
    }

    /**
     * Rendering the facetGroup buttons.
     */
    const renderFacetButtons = () => {
        return (
            Object.keys(facetConfig).map((key) => (
                <div key={key}>
                    <div
                        className={selectedFacetGroup === key ? `${style.FacetGroup} ${style.Selected}`: style.FacetGroup}
                        onClick={() => handleFacetGroupClick(key)}
                    >
                        <span>{facetConfig[key]['title']}</span>
                        <div className={style.Button} />
                    </div>
                    <Collapse id={key} isOpened={selectedFacetGroup === key}>
                        {
                            facetConfig[key]['type'] === 'list' ?
                            <FacetValuesMobile
                                breadcrumbHeight={breadcrumbHeight}
                                facetValues={facets.hasOwnProperty(`${key}_facet`) ? facets[`${key}_facet`] : []}
                                selectedFacetGroup={key}
                                selectedFacetValues={getSelectedFacetValues()}
                                onFacetActionClick={onFacetActionClick}
                            /> :
                            <FacetDateRangeMobile
                                facetValues={facets.hasOwnProperty(`${key}_facet`) ? facets[`${key}_facet`] : []}
                                selectedFacetGroup={key}
                                selectedFacetValues={getSelectedFacetValues()}
                                onFacetActionClick={onFacetActionClick}
                            />}
                    </Collapse>
                </div>
            ))
        )
    }

    return (
        <React.Fragment>
            <div className={style.FacetPage}>
                <div className={style.Facets}>
                    {renderFacetButtons()}
                </div>
                <div className={style.ResultCounter}>
                    <ResultCounterMobile
                        total={total}
                        breadcrumbHeight={breadcrumbHeight}
                        onShowButtonClick={onShowButtonClick}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}

export default FacetPageMobile;
