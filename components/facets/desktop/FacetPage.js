import style from "./FacetPage.module.scss";
import React, {useEffect, useState} from "react";
import FacetMenu from "./FacetMenu";
import FacetValues from "./FacetValues";
import FacetHelper from "./FacetHelper";
import ResultCounter from "./ResultCounter";
import {useRouter} from "next/router";
import {addFacet, removeFacet} from "../../../utils/facetFunctions";
import {createParams} from "../../../utils/urlParamFunctions";
import FacetDateRange from "./FacetDateRange";
import FacetWordCloud from "./FacetWordCloud";

/**
 * The facet management page. Displays when a user clicks on a facet group.
 *
 * @param {Object} params
 * @param {string} params.selectedFacetGroup The name of the selected facet group.
 * @param {function} params.onSelectFacetGroup Handling of selecting a particular group.
 * @param {func} params.onShowButtonClick Handling clicking the Show button.
 * @param {Object} params.facets Facet results of the search query.
 * @param {number} params.total Total number of results.
 * @param {Object} params.facetConfig Facetconfig object.
 */
const FacetPage = ({selectedFacetGroup, onSelectFacetGroup, onShowButtonClick,
                       facets, total, facetConfig, breadcrumbHeight=0, type='normal'}) => {

    const [selectedFacetObject, setSelectedFacetObject] = useState('')

    const router = useRouter();
    const {query, limit, offset, ...selectedFacets} = router.query;

    useEffect(() => {
        setSelectedFacetObject('')
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

        if (type === 'gallery') {
            onShowButtonClick()
        }
    }

    /**
     * Handler of adding the facetValue.
     *
     * @param value The value to be added to the selectedFacets. It will be added to the page URL params.
     */
    const addFacetValue = (value) => {
        const SFGroup = selectedFacetGroup.replace('_wikidata', '')
        const sf = addFacet(selectedFacets, SFGroup, value);

        router.replace({
            query: createParams(query, limit, 0, sf),
        }, undefined, {shallow: false});
    };

    /**
     * Handler of removing the facetValue.
     *
     * @param value The value to be removed from the selectedFacets. It will be removed from the page URL params.
     */
    const removeFacetValue = (value) => {
        const SFGroup = selectedFacetGroup.replace('_wikidata', '')
        const newFacets = removeFacet(selectedFacets, SFGroup, value)

        router.replace({
            query: createParams(query, limit, 0, newFacets),
        }, undefined, {shallow: false})
    }

    const getSelectedFacetValues = () => {
        let facetValues = [];
        const SFGroup = selectedFacetGroup.replace('_wikidata', '')

        if (selectedFacets.hasOwnProperty(SFGroup)) {
            if (Array.isArray(selectedFacets[SFGroup])) {
                facetValues = selectedFacets[SFGroup];
            } else {
                facetValues = [selectedFacets[SFGroup]]
            }
        }
        return facetValues
    }

    const onSelectFacetValue = (value) => {
        setSelectedFacetObject(value)
    };

    const renderFacetValues = (facetType) => {
        switch (facetType) {
            case 'list':
            case 'wiki':
            case 'series':
                return (
                  <FacetValues
                    breadcrumbHeight={breadcrumbHeight}
                    facetValues={facets.hasOwnProperty(`${selectedFacetGroup}_facet`) ? facets[`${selectedFacetGroup}_facet`] : []}
                    onFacetActionClick={onFacetActionClick}
                    selectedFacetGroup={selectedFacetGroup}
                    selectedFacetValues={getSelectedFacetValues()}
                    onSelectFacetValue={onSelectFacetValue}
                    type={type}
                  />
                )
            case 'date':
                return (
                  <FacetDateRange
                    facetValues={facets.hasOwnProperty(`${selectedFacetGroup}_facet`) ? facets[`${selectedFacetGroup}_facet`] : []}
                    onFacetActionClick={onFacetActionClick}
                    selectedFacetGroup={selectedFacetGroup}
                    selectedFacetValues={getSelectedFacetValues()}
                    type={type}
                  />
                )
            case 'wordcloud':
                return (
                    <FacetWordCloud
                        facetValues={facets.hasOwnProperty(`${selectedFacetGroup}_facet`) ? facets[`${selectedFacetGroup}_facet`] : []}
                        onFacetActionClick={onFacetActionClick}
                    />
                )
        }
    }

    if (type === 'gallery') {
        switch (selectedFacetGroup) {
            case 'year_created':
                return (
                    <div className={style.FacetPageWrapperGallery}>
                        <div className={style.FacetDateGallery}>
                            <div className={style.FacetSelection}>
                                {renderFacetValues(facetConfig[selectedFacetGroup]['type'])}
                            </div>
                            <div className={style.FacetDescription}>
                                <FacetHelper
                                    type={type}
                                    facetValues={facets.hasOwnProperty(`${selectedFacetGroup}_facet`) ? facets[`${selectedFacetGroup}_facet`] : []}
                                    onFacetActionClick={onFacetActionClick}
                                    selectedFacetGroup={selectedFacetGroup}
                                    selectedFacetObject={selectedFacetObject}
                                    selectedFacetValues={getSelectedFacetValues()}
                                />
                            </div>
                        </div>
                    </div>
                )
            case 'keyword':
                return (
                    <div className={style.FacetPageWrapperGallery}>
                        {renderFacetValues(facetConfig[selectedFacetGroup]['type'])}
                    </div>
                )
            default:
                return (
                    <div className={style.FacetPageWrapperGallery}>
                        <div className={style.FacetContentGallery}>
                            <div className={style.FacetSelection}>
                                {renderFacetValues(facetConfig[selectedFacetGroup]['type'])}
                            </div>
                            <div className={style.FacetDescription}>
                                <FacetHelper
                                    type={type}
                                    facetValues={facets.hasOwnProperty(`${selectedFacetGroup}_facet`) ? facets[`${selectedFacetGroup}_facet`] : []}
                                    onFacetActionClick={onFacetActionClick}
                                    selectedFacetGroup={selectedFacetGroup}
                                    selectedFacetObject={selectedFacetObject}
                                    selectedFacetValues={getSelectedFacetValues()}
                                />
                            </div>
                        </div>
                    </div>
                )
        }
    } else {
        return (
            <div className={style.FacetPageWrapper}>
                <div className={style.FacetPage}>
                    <FacetMenu
                        inverse={true}
                        selectedFacetGroup={selectedFacetGroup}
                        onSelectFacetGroup={onSelectFacetGroup}
                    />
                    <div className={style.FacetSelection}>
                        {renderFacetValues(facetConfig[selectedFacetGroup]['type'])}
                    </div>
                    <div className={style.FacetDescription}>
                        <FacetHelper
                            facetValues={facets.hasOwnProperty(`${selectedFacetGroup}_facet`) ? facets[`${selectedFacetGroup}_facet`] : []}
                            onFacetActionClick={onFacetActionClick}
                            selectedFacetGroup={selectedFacetGroup}
                            selectedFacetObject={selectedFacetObject}
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
}

export default FacetPage;
