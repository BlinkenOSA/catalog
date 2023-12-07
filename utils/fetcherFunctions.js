import axios from 'axios';
import {processParams} from "./urlParamFunctions";
import {facetConfig} from "../config/facetConfig";
import {galleryFacetConfig} from "../config/galleryFacetConfig";
import {base} from "next/dist/build/webpack/config/blocks/base";

export const API = process.env.NEXT_PUBLIC_AMS_API;
export const SOLR_API = process.env.NEXT_PUBLIC_SOLR;
export const SOLR_FOLDERS_ITEMS_API = process.env.NEXT_PUBLIC_SOLR_FOLDERS_ITEMS;
const SOLR_IMAGE_GALLERY_API = process.env.NEXT_PUBLIC_SOLR_IMAGE_GALLERY;

const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER;
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS;

export const fetcher = (url, params) => {
    return axios.get(
        `${API}${url}`,
        {
            params: params,
        }
    ).then(res => res.data);
};

export const catalogAPIFetcher = (url, params) => {
    return axios.get(
        `${url}`,
        {
            params: params,
        }
    ).then(res => res.data);
}

export const makeSolrParams = (params, type='normal') => {
    const fc = type === 'gallery' ? galleryFacetConfig : facetConfig

    const {query, filterQuery, limit, offset, sort, qf, cursorMark, selectedFacets, selectedFacetsDates} = processParams(params, type)
    let baseParams = new URLSearchParams();

    // Add query
    baseParams.append('q', query ? query : '*')

    // Add filterQuery
    filterQuery && baseParams.append('fq', filterQuery)

    // Process facet filters
    Object.keys(fc).forEach(key => {
        if (fc[key]['type'] === 'date') {
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

    if (qf) {
        baseParams.append('qf', qf)
    }

    if (cursorMark) {
        baseParams.append('cursorMark', cursorMark)
    }

    return baseParams
}

export const solrFetcher = (params) => {
    let solrAPI;
    const { solrCore } = params;
    let solrParams;

    switch (solrCore) {
        case 'folders-items':
            solrParams = makeSolrParams(params);
            solrAPI = SOLR_FOLDERS_ITEMS_API
            break;
        case 'image-gallery':
            solrParams = makeSolrParams(params, 'gallery');
            solrAPI = SOLR_IMAGE_GALLERY_API
            break;
        default:
            solrParams = makeSolrParams(params);
            solrAPI = SOLR_API;
            break;
    }

    return axios.get(
      solrAPI,
      {
          params: solrParams,
          auth: {
              username: SOLR_USER,
              password: SOLR_PASS
          }
      }
    ).then(res => res.data);
}
