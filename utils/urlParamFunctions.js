import {facetConfig} from "../config/facetConfig";

export const createParams = (query, limit, offset, selectedFacets) => {
    const {id, ...restOfTheFacets} = selectedFacets;
    const params = {
        ...restOfTheFacets
    }

    if (query && query !== '') {
        params['query'] = query
    } else {
        params['query'] = '*'
    }

    if (limit) {
        params['limit'] = limit
    }

    if (offset) {
        params['offset'] = offset
    }

    return params;
}


export const processParams = (params) => {
    let newParams = {};
    const { query, qf, filterQuery, limit, offset, sort, ...rest } = params;

    newParams['query'] = query ? query : ''
    newParams['qf'] = qf
    newParams['filterQuery'] = filterQuery
    newParams['limit'] = limit
    newParams['offset'] = offset
    newParams['sort'] = sort
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
