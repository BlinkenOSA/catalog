const GeneralInformationArea = {
    group: {
        'EN': 'General Information',
    },
    fields: [
        {
            label: {
                'EN': 'Reference Code',
            },
            field: 'archival_reference_code',
            link: {}
        }, {
            label: {
                'EN': 'Located at',
            },
            field: 'located_at',
            link: {}
        }, {
            label: {
                'EN': 'Title',
            },
            field: 'title',
            link: {},
        }, {
            label: {
                'EN': 'Original Title',
            },
            field: 'title_original',
            link: {},
        }, {
            label: {
                'EN': 'Date(s)',
            },
            field: 'date_from',
            link: {},
            display: 'newRow'
        }, {
            label: {
                'EN': 'Description Level',
            },
            field: 'level',
            link: {},
        }, {
            label: {
                'EN': 'Primary Type',
            },
            field: 'primary_type',
            link: {},
        }, {
            label: {
                'EN': 'Duration',
            },
            field: 'duration',
            link: {},
        }
    ],
}

export const findingAidsFieldConfig = [
    GeneralInformationArea,
]
