import axios from 'axios';
import {processParams} from "./processParams";
import {base} from "next/dist/build/webpack/config/blocks/base";
import {facetConfig} from "../config/facetConfig";
export const API = process.env.NEXT_PUBLIC_CATALOG_API;

export const fetcher = (url, params) => {
    return axios.get(
        `${API}${url}`,
        {params: params}
    ).then(res => res.data);
};

export const solrFetcher = (params) => {
    const {query, limit, offset, selectedFacets, selectedFacetsDates} = processParams(params)

    let baseParams = new URLSearchParams();
    baseParams.append('facet.field', 'record_origin_facet')
    baseParams.append('facet.field', 'primary_type_facet')
    baseParams.append('facet.field', 'genre_facet')
    baseParams.append('facet.field', 'language_facet')
    baseParams.append('facet.field', 'date_created_facet')
    baseParams.append('facet.field', 'subject_person_facet')
    baseParams.append('facet.limit', '-1')
    baseParams.append('wt', 'json')

    // Add query
    baseParams.append('q', query ? query : '*')

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
                        baseParams.append('fq', `date_created_facet:[${yearFrom} TO ${yearTo}]`)
                    }
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

    return axios.get(
        `http://localhost:8983/solr/osacatalog/select`,
        {params: baseParams}
    ).then(res => res.data);
}
