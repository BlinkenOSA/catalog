import style from "./FacetPage.module.scss";
import React, {useEffect, useState} from "react";
import FacetMenu from "./FacetMenu";
import FacetValues from "./parts/FacetValues";
import FacetHelper from "./parts/FacetHelper";
import ResultCounter from "./parts/ResultCounter";
import {useRouter} from "next/router";
import {addFacet, removeFacet} from "../../utils/facetActions";
import createParams from "../../utils/createParams";
import {facetConfig} from "../../config/facetConfig";
import FacetDateRange from "./parts/FacetDateRange";

/**
 * The facet management page. Displays when a user clicks on a facet group.
 *
 * @param {Object} params
 * @param {string} params.selectedFacetGroup The name of the selected facet group.
 * @param {function} params.onSelectFacetGroup Handling of selecting a particular group.
 * @param {func} params.onShowButtonClick Handling clicking the Show button.
 * @param {Object} params.facets Facet results of the search query.
 * @param {number} params.total Total number of results.
 */
const FacetPage = ({selectedFacetGroup, onSelectFacetGroup, onShowButtonClick, facets, total, breadcrumbHeight}) => {
    const [selectedFacetValue, setSelectedFacetValue] = useState('')

    const router = useRouter();
    const {query, limit, offset, ...selectedFacets} = router.query;

    useEffect(() => {
        setSelectedFacetValue('')
    }, [selectedFacetGroup])

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
            query: createParams(query, limit, offset, sf),
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
            query: createParams(query, limit, offset, newFacets),
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

    const onSelectFacetValue = (value) => {
        setSelectedFacetValue(value)
    };

    return (
        <div className={style.FacetPageWrapper}>
            <div className={style.FacetPage}>
                <FacetMenu
                    inverse={true}
                    selectedFacetGroup={selectedFacetGroup}
                    onSelectFacetGroup={onSelectFacetGroup}
                />
                <div className={style.FacetSelection}>
                    {
                        facetConfig[selectedFacetGroup]['type'] === 'list' ?
                            <FacetValues
                                breadcrumbHeight={breadcrumbHeight}
                                facetValues={facets.hasOwnProperty(`${selectedFacetGroup}_facet`) ? facets[`${selectedFacetGroup}_facet`] : []}
                                onFacetActionClick={onFacetActionClick}
                                selectedFacetGroup={selectedFacetGroup}
                                selectedFacetValues={getSelectedFacetValues()}
                                onSelectFacetValue={onSelectFacetValue}
                            /> :
                            <FacetDateRange
                                facetValues={facets.hasOwnProperty(`${selectedFacetGroup}_facet`) ? facets[`${selectedFacetGroup}_facet`] : []}
                                onFacetActionClick={onFacetActionClick}
                                selectedFacetGroup={selectedFacetGroup}
                                selectedFacetValues={getSelectedFacetValues()}
                            />
                    }
                </div>
                <div className={style.FacetDescription}>
                    <FacetHelper
                        facetValues={facets.hasOwnProperty(`${selectedFacetGroup}_facet`) ? facets[`${selectedFacetGroup}_facet`] : []}
                        onFacetActionClick={onFacetActionClick}
                        selectedFacetGroup={selectedFacetGroup}
                        selectedFacetValue={selectedFacetValue}
                        selectedFacetValues={getSelectedFacetValues()}
                    />
                </div>
                <div className={style.ResultCounter}>
                    <ResultCounter
                        total={total}
                        breadcrumbHeight={breadcrumbHeight}
                        onShowButtonClick={onShowButtonClick}
                    />
                </div>
            </div>
        </div>
    )
}

export default FacetPage;
