/**
 * Config object for the facets.
 * @type {title: string, search: boolean, help: string}
 */
export const facetConfig = {
    record_origin: { title: 'Record Origin', search: false, info: true, type: 'list' },
    availability: { title: 'Availability', search: false, info: true, type: 'list' },
    primary_type: { title: 'Record Type', search: false, info: true, type: 'list' },
    year_created: { title: 'Year of Creation', search: false, info: true, type: 'date' },
    subject_wikidata: { title: 'Subjects', search: true, info: true, type: 'list' },
    contributor_wikidata: { title: 'Contributors', search: true, info: true, type: 'list' },
    geo_wikidata: { title: 'Geo Locations', search: true, info: true, type: 'wiki' },
    keyword: { title: 'Keywords', search: true, info: false, type: 'list' },
}

