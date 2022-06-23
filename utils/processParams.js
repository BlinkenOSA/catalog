import {facetConfig} from "../config/facetConfig";

export const processParams = (params) => {
    let newParams = {};
    const {query, limit, offset, ...rest} = params;

    newParams['query'] = query ? query : ''
    newParams['limit'] = limit
    newParams['offset'] = offset
    newParams['selectedFacets'] = {}
    newParams['selectedFacetsDates'] = {}

    const addToSelectedFacets = (mainKey, key) => {
        if (rest.hasOwnProperty(key)) {
            newParams[mainKey][key] = rest[key]
        }
    }

    // Handle selectedFacets
    Object.keys(facetConfig).forEach((key) => {
        if (facetConfig[key]['type'] === 'date') {
            addToSelectedFacets('selectedFacetsDates', key)
        } else {
            addToSelectedFacets('selectedFacets', key)
        }
    })

    return newParams;
}
