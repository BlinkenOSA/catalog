type facetOptions = {
    [key: string]: {
        title: string,
        search: boolean,
        help?: string
    }
}

export const facetConfig: facetOptions = {
    record_origin: { title: 'Record Origin', search: true, help: 'record_origin.md' },
    record_type: { title: 'Record Type', search: false },
    description_level: { title: 'Archival Description Level', search: true },
    digital_collection: { title: 'Digital Collection', search: true },
    date: { title: 'Creation Date', search: true },
    creator: { title: 'Creator (Author/Director)', search: true },
    language: { title: 'Language', search: true },
    genre: { title: 'Form/Genre', search: true }
}

