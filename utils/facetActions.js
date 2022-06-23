/**
 * Adding the selected facetValue to the selectedFacets.
 *
 * @param selectedFacets The object of currently selected facets.
 * @param facetGroup The facetGroup where the element is added to.
 * @param facetValue The actual value being added.
 * @returns {Object} The object containing the newly selected facets.
 */
export const addFacet = (selectedFacets, facetGroup, facetValue) => {
    if (selectedFacets.hasOwnProperty(facetGroup)) {
        if (Array.isArray(selectedFacets[facetGroup])) {
            selectedFacets[facetGroup].push(facetValue)
        } else {
            selectedFacets[facetGroup] = [selectedFacets[facetGroup], facetValue]
        }
    } else {
        selectedFacets[facetGroup] = facetValue
    }

    return selectedFacets
}

/**
 * Removing the selected facetValue from the selectedFacets.
 *
 * @param selectedFacets The object of currently selected facets.
 * @param facetGroup The facetGroup where the element is removed from.
 * @param facetValue The actual value being removed.
 * @returns {Object} The object containing the newly selected facets.
 */
export const removeFacet = (selectedFacets, facetGroup, facetValue) => {
    let newFacets;

    if (selectedFacets.hasOwnProperty(facetGroup)) {
        if (Array.isArray(selectedFacets[facetGroup])) {
            newFacets = {...selectedFacets}
            newFacets[facetGroup] = selectedFacets[facetGroup].filter(facet => facet !== facetValue)
        } else {
            newFacets = {...selectedFacets}
            delete newFacets[facetGroup]
        }
    } else {
        newFacets = {...selectedFacets}
    }

    return newFacets;
}
