const GeneralInformationArea = {
    group: {
        'EN': 'General Information',
        'HU': 'Általános Információk'
    },
    fields: [
        {
            label: {
                'EN': 'Reference Code',
                'HU': 'Referncia Kód'
            },
            field: 'archival_reference_code',
            link: {}
        }, {
            label: {
                'EN': 'Located at',
                'HU': 'Itt található',
            },
            field: 'located_at',
            link: {}
        }, {
            label: {
                'EN': 'Title',
                'HU': 'Cím',
            },
            field: 'title',
            link: {},
        }, {
            label: {
                'EN': 'Original Title',
                'HU': 'Eredeti Cím'
            },
            field: 'title_original',
            link: {},
        }, {
            label: {
                'EN': 'Date(s)',
                'HU': 'Dátum(ok)'
            },
            field: 'date_from',
            link: {},
            display: 'newRow'
        }, {
            label: {
                'EN': 'Description Level',
                'HU': 'Leírás Szintje'
            },
            field: 'level',
            link: {},
        }, {
            label: {
                'EN': 'Primary Type',
                'HU': 'Elsődleges Típus'
            },
            field: 'primary_type',
            link: {},
        }, {
            label: {
                'EN': 'Duration',
                'HU': 'Hossz'
            },
            field: 'duration',
            link: {},
        }
    ],
}

const Content = {
    group: {
        'EN': 'Content',
        'HU': 'Tartalom'
    },
    fields: [
        {
            label: {
                'EN': 'Contents Summary',
                'HU': 'Tartalmi Összegzés'
            },
            field: 'contents_summary',
            bilingual: true,
            link: {}
        }
    ]
}

export const findingAidsFieldConfig = [
  GeneralInformationArea,
  Content
]
