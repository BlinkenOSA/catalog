/**
 * Config object for the facets.
 * @type {title: string, search: boolean, help: string}
 */
export const facetConfig = {
    record_origin: { title: 'Record Origin', search: false, info: true, type: 'list' },
    primary_type: { title: 'Record Type', search: false, info: true, type: 'list' },
    date_created: { title: 'Creation Date', search: false, info: true, type: 'date' },
    subject_person: { title: 'Subject (Person)', search: true, info: true, type: 'list' },
    language: { title: 'Language', search: true, type: 'list' },
    genre: { title: 'Form/Genre', search: true, type: 'list' }
}

