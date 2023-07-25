/**
 * Config object for the facets.
 * @type {title: string, search: boolean, help: string}
 */
export const facetConfig = {
    record_origin: { title: 'Record Origin', search: false, info: true, type: 'list' },
    availability: { title: 'Availability', search: false, info: true, type: 'list' },
    primary_type: { title: 'Record Type', search: false, info: true, type: 'list' },
    year_created: { title: 'Year of Creation', search: false, info: true, type: 'date' },
    subject_wikidata: { title: 'Subjects', search: true, info: true, type: 'wiki' },
    subject: { title: 'Subjects', search: true, info: true, type: undefined },
    contributor_wikidata: { title: 'Contributors', search: true, info: true, type: 'wiki' },
    contributor: { title: 'Contributors', search: false, info: false, type: undefined },
    subject_term: { title: 'Subject Terms', search: true, info: false, type: 'list' },
    geo_wikidata: { title: 'Geo Locations', search: true, info: true, type: 'wiki' },
    geo: { title: 'Geo Locations', search: true, info: true, type: undefined },
    keyword: { title: 'Keywords', search: true, info: false, type: 'list' },
}

