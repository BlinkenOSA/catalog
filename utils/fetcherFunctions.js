import axios from 'axios';
import {processParams} from "./urlParamFunctions";
import {facetConfig} from "../config/facetConfig";
export const API = process.env.NEXT_PUBLIC_AMS_API;
export const SOLR_API = process.env.NEXT_PUBLIC_SOLR;

export const fetcher = (url, params) => {
    return axios.get(
        `${API}${url}`,
        {
            params: params,
        }
    ).then(res => res.data);
};

export const nextAPIFetcher = (url, params) => {
    return axios.get(
        `${url}`,
        {params: params}
    ).then(res => res.data);
}

export const solrFetcher = (params) => {
    const {query, filterQuery, limit, offset, sort, selectedFacets, selectedFacetsDates} = processParams(params)

    let baseParams = new URLSearchParams();

    // Add query
    baseParams.append('q', query ? query : '*')

    // Add filterQuery
    filterQuery && baseParams.append('fq', filterQuery)

    // Process facet filters
    Object.keys(facetConfig).forEach(key => {
        if (facetConfig[key]['type'] === 'date') {
            if (selectedFacetsDates.hasOwnProperty(key)) {
                let date = '';
                if (Array.isArray(selectedFacetsDates[key])) {
                    date = selectedFacetsDates[key][0]
                } else {
                    date = selectedFacetsDates[key]
                }
                const years = date.split('-');
                if (years.length === 2) {
                    const yearFrom = Number(years[0])
                    const yearTo = Number(years[1])
                    if (Number.isInteger(yearFrom) && Number.isInteger(yearTo)) {
                        baseParams.append('fq', `year_created_facet:[${yearFrom} TO ${yearTo}]`)
                    }
                } else {
                    const yearFrom = Number(years[0])
                    baseParams.append('fq', `year_created_facet:${yearFrom}`)
                }
            }
        } else {
            if (selectedFacets.hasOwnProperty(key)) {
                if (Array.isArray(selectedFacets[key])) {
                    selectedFacets[key].forEach(facetValue => {
                        baseParams.append('fq', `${key}_facet:"${facetValue}"`)
                    })
                } else {
                    baseParams.append('fq', `${key}_facet:"${selectedFacets[key]}"`)
                }
            }
        }
    })

    if (limit) {
        baseParams.append('rows', limit)
    }

    if (offset) {
        baseParams.append('start', offset)
    }

    if (sort) {
        baseParams.append('sort', sort)
    }

    return axios.get(
        SOLR_API,
        {params: baseParams}
    ).then(res => res.data);
}
