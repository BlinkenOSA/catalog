/**
 * Config object for the facets.
 * @type {title: string, search: boolean, help: string}
 */
export const facetConfig = {
    primary_type: { title: 'Record Type', search: false, info: true, type: 'list' },
    year_created: { title: 'Creation Date', search: false, info: true, type: 'date' },
    language_wikidata: { title: 'Language', search: true, info: true, type: 'wiki' },
    language: { title: 'Language', search: true, info: true, type: undefined },
    subject_wikidata: { title: 'Subjects', search: true, info: true, type: 'wiki' },
    subject: { title: 'Subjects', search: true, info: true, type: undefined },
    contributor_wikidata: { title: 'Contributors', search: true, info: true, type: 'wiki' },
    contributor: { title: 'Contributors', search: false, info: false, type: undefined },
    geo_wikidata: { title: 'Geo Locations', search: true, info: true, type: 'wiki' },
    geo: { title: 'Geo Locations', search: true, info: true, type: undefined },
    keyword: { title: 'Tags', search: true, info: true, type: undefined },
    record_origin: { title: 'Record Origin', search: false, info: true, type: 'list' },
    availability: { title: 'Availability', search: false, info: true, type: 'list' },
    library_collection: { title: 'Library Special Collection', search: true, info: false, type: undefined },
    author: { title: 'Author', search: true, info: false, type: undefined },
    director: { title: 'Director', search: true, info: false, type: undefined },
    digital_collection: { title: 'Digital Collection', search: true, info: false, type: undefined }
}

