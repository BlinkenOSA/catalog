const GeneralInformationArea = {
    group: {
        'EN': 'General Information',
        'HU': 'Általános Információk',
        'RU': 'Общая Информация'
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
        }, {
            label: {
                'EN': 'Language',
                'HU': 'Nyelv'
            },
            field: 'languages',
            link: {},
        }, {
            label: {
                'EN': 'Notes',
                'HU': 'Feljegyzések'
            },
            field: 'note',
            link: {},
        }, {
            label: {
                'EN': 'Access Rights',
                'HU': 'Jogosultságok'
            },
            field: 'access_rights',
            link: {},
        }, {
            label: {
                'EN': 'Restriction Explanation',
                'HU': 'Korlátozás oka'
            },
            field: 'access_rights_restriction_explanation',
            link: {},
        },
    ],
}

const Content = {
    group: {
        'EN': 'Content',
        'HU': 'Tartalom',
        'RU': 'Контент'
    },
    fields: [
        {
            label: {
                'EN': 'Form / Genre',
                'HU': 'Zsáner'
            },
            field: 'genre',
            bilingual: false,
            link: {}
        }, {
            label: {
                'EN': 'Contents Summary',
                'HU': 'Tartalmi Összegzés'
            },
            field: 'contents_summary',
            bilingual: true,
            link: {}
        }, {
            label: {
                'EN': 'Physical Description',
                'HU': 'Fizikai Leírás'
            },
            field: 'physical_description',
            bilingual: true,
            link: {}
        }, {
            label: {
                'EN': 'Physical Condition',
                'HU': 'Fizikai Állapot'
            },
            field: 'physical_description',
            bilingual: true,
            link: {}
        },
    ]
}

const Context = {
    group: {
        'EN': 'Context',
        'HU': 'Kontextus',
        'RU': 'Контекст'
    },
    fields: [
        {
            label: {
                'EN': 'Contributors',
                'HU': 'Közreműködők'
            },
            field: 'contributors',
            bilingual: false,
            link: {}
        }, {
            label: {
                'EN': 'Added Geo Locations',
                'HU': 'Hozzáadott Geolokációk'
            },
            field: 'added_geo_locations',
            bilingual: false,
            link: {}
        }
    ]
}

const Subject = {
    group: {
        'EN': 'Subject',
        'HU': 'Tárgy',
        'RU': 'Тема'
    },
    fields: [
        {
            label: {
                'EN': 'Subjects',
                'HU': 'Tárgyszavak'
            },
            field: 'subjects',
            bilingual: false,
            link: {}
        }, {
            label: {
                'EN': 'Spatial Coverage',
                'HU': 'Területi Lefedettség'
            },
            field: 'spatial_coverage',
            bilingual: false,
            link: {}
        },
    ]
}

export const findingAidsFieldConfig = [
  GeneralInformationArea,
  Content,
  Context,
  Subject
]
