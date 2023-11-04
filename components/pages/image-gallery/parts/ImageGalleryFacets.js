import style from "./ImageGalleryFacets.module.scss";
import FacetValues from "../../../facets/desktop/FacetValues";
import FacetDateRange from "../../../facets/desktop/FacetDateRange";
import React from "react";
import {addFacet, removeFacet} from "../../../../utils/facetFunctions";
import {createParams} from "../../../../utils/urlParamFunctions";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const ImageGalleryFacets = ({facets, selectedFacetGroup, facetConfig, onSelectFacetGroup}) => {
    const [selectedFacetObject, setSelectedFacetObject] = useState('')

    const router = useRouter();
    const {query, limit, offset, ...selectedFacets} = router.query;

    useEffect(() => {
        setSelectedFacetObject('')
    }, [selectedFacetGroup])

    const renderFacetValues = (type) => {
        switch (type) {
            case 'list':
            case 'wiki':
                return (
                  <FacetValues
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
                  />
                )
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


    const onFacetActionClick = (value, action) => {
        if (action === 'add') {
            addFacetValue(value)
        } else {
            removeFacetValue(value)
        }
    }

    return (
        <div className={style.FacetPageWrapper}>
            {renderFacetValues(facetConfig[selectedFacetGroup]['type'])}
        </div>
    )
}

export default ImageGalleryFacets;