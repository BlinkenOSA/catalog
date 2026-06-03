import {facetConfig} from "../config/facetConfig";
import {galleryFacetConfig} from "../config/galleryFacetConfig";

const BASE_SOLR_PARAM_KEYS = ['query', 'qf', 'filterQuery', 'limit', 'offset', 'sort', 'cursorMark'];

export const createParams = (query, limit, offset, selectedFacets) => {
    const {id, ...restOfTheFacets} = selectedFacets;
    const params = {
        ...restOfTheFacets
    }

    if (query && query !== '') {
        params['query'] = query
    }

    if (limit) {
        params['limit'] = limit
    }

    if (offset) {
        params['offset'] = offset
    }

    return params;
}

export const getAcceptedParamKeys = (type='normal') => {
    const fc = type === 'gallery' ? galleryFacetConfig : facetConfig

    return new Set([
        ...BASE_SOLR_PARAM_KEYS,
        ...Object.keys(fc)
    ])
}

export const filterAcceptedParams = (params = {}, type='normal') => {
    const acceptedKeys = getAcceptedParamKeys(type)

    return Object.keys(params).reduce((result, key) => {
        if (acceptedKeys.has(key)) {
            result[key] = params[key]
        }

        return result
    }, {})
}

export const getRejectedParamKeys = (params = {}, type='normal', extraAcceptedKeys = []) => {
    const acceptedKeys = getAcceptedParamKeys(type)
    extraAcceptedKeys.forEach((key) => acceptedKeys.add(key))

    return Object.keys(params).filter((key) => !acceptedKeys.has(key))
}

const hasValue = (value) => {
    if (Array.isArray(value)) {
        return value.length > 0
    }

    return value !== undefined && value !== null && value !== ''
}

export const hasMeaningfulSearchParams = (params = {}, type='normal') => {
    const acceptedParams = filterAcceptedParams(params, type)
    const { query, qf, filterQuery, limit, offset, sort, cursorMark, ...rest } = acceptedParams

    if (hasValue(query) || hasValue(qf) || hasValue(filterQuery)) {
        return true
    }

    return Object.values(rest).some(hasValue)
}

export const processParams = (params, type='normal') => {
    const fc = type === 'gallery' ? galleryFacetConfig : facetConfig

    let newParams = {};
    const acceptedParams = filterAcceptedParams(params, type)
    const { query, qf, filterQuery, limit, offset, sort, cursorMark, ...rest } = acceptedParams;

    newParams['query'] = query ? query : ''
    newParams['qf'] = qf
    newParams['filterQuery'] = filterQuery
    newParams['limit'] = limit
    newParams['offset'] = offset
    newParams['sort'] = sort
    newParams['selectedFacets'] = {}
    newParams['selectedFacetsDates'] = {}
    newParams['cursorMark'] = cursorMark

    const addToSelectedFacets = (mainKey, key) => {
        if (rest.hasOwnProperty(key)) {
            newParams[mainKey][key] = rest[key]
        }
    }

    // Handle selectedFacets
    Object.keys(fc).forEach((key) => {
        if (fc[key]['type'] === 'date') {
            addToSelectedFacets('selectedFacetsDates', key)
        } else {
            addToSelectedFacets('selectedFacets', key)
        }
    })

    return newParams;
}
