/**
 * Config object for the facets.
 * @type {title: string, search: boolean, help: string}
 */
export const galleryFacetConfig = {
    series: { title: 'Collection', search: false, info: false, type: 'list' },
    year_created: { title: 'Year of Creation', search: false, info: true, type: 'date' },
    keyword: { title: 'Tags', search: true, info: false, type: 'wordcloud' },
    geo_wikidata: { title: 'Geo Locations', search: true, info: true, type: 'wiki' }
}

