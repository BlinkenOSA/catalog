/**
 * Config object for the facets.
 * @type {title: string, search: boolean, help: string}
 */
export const galleryFacetConfig = {
    collection: { title: 'Collection', search: false, info: false, type: 'list' },
    year_created: { title: 'Year of Creation', search: false, info: true, type: 'date' },
    author: { title: 'Author', search: true, info: false, type: 'list' },
    geo_wikidata: { title: 'Geo Locations', search: true, info: true, type: 'wiki' },
}

