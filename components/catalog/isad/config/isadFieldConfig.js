const IdentityStatementArea = {
    group: {
        'EN': 'Identity Statement',
        'HU': 'Azonosítás'
    },
    fields: [
        {
            label: {
                'EN': 'Reference Code',
                'HU': 'Referencia Kód'
            },
            field: 'referencde_code',
            link: {}
        }, {
            label: {
                'EN': 'Title',
                'HU': 'Cím'
            },
            field: 'title',
            bilingual: true,
            link: {}
        }, {
            label: {
                'EN': 'Date(s)',
                'HU': 'Időkör'
            },
            field: 'year_from',
            link: {}
        }, {
            label: {
                'EN': 'Description Level',
                'HU': 'Leírás szintje'
            },
            field: 'description_level',
            link: {}
        }, {
            label: {
                'EN': 'Extent and medium (estimated)',
                'HU': 'Terjedelem és adathordozók (becsült)'
            },
            field: 'carrier_estimated',
            link: {},
            display: 'vertical'
        }, {
            label: {
                'EN': 'Extent and medium (processed)',
                'HU': 'Terjedelem és adathordozók (feldolgozott)'
            },
            field: 'extent_processed',
            bilingual: true,
            link: {},
            display: 'vertical'
        }
    ]
}

const ContextArea = {
    group: {
        'EN': 'Context',
        'HU': 'Konteksztus'
    },
    fields: [
        {
            label: {
                'EN': 'Name of creator(s)',
                'HU': 'Az iratképző(k) neve'
            },
            field: 'creator',
            link: {}
        }, {
            label: {
                'EN': 'Name of creator(s)',
                'HU': 'Az iratképző(k) neve'
            },
            field: 'isaar',
            link: '/isaar/{id}'
        }, {
            label: {
                'EN': 'Administrative / Biographical history',
                'HU': 'Szervtörténet / Életrajz'
            },
            field: 'administrative_history',
            bilingual: true,
            link: {}
        }, {
            label: {
                'EN': 'Archival history',
                'HU': 'A megőrzés története'
            },
            field: 'archival_history',
            bilingual: true,
            link: {}
        }, {
            label: {
                'EN': 'Immediate source of acquisition or transfer',
                'HU': 'Levéltárba kerülés/Gyarapodás'
            },
            field: 'acquisition',
            link: {}
        }
    ]
}

const ContentAndStructureArea = {
    group: {
        'EN': 'Content and structure',
        'HU': 'Tartalom és szerkezet'
    },
    fields: [
        {
            label: {
                'EN': 'Scope and content (abstract)',
                'HU': 'Tárgy és tartalom (összefoglalás)'
            },
            field: 'scope_and_content_abstract',
            bilingual: true,
            link: {}
        }, {
            label: {
                'EN': 'Scope and content (narrative)',
                'HU': 'Tárgy és tartalom (kifejtés)'
            },
            field: 'scope_and_content_narrative',
            bilingual: true,
            link: {}
        }, {
            label: {
                'EN': 'Appraisal, destruction and scheduling information',
                'HU': 'Iratértékelés, selejtezés, tervezés'
            },
            field: 'appraisal',
            link: {}
        }, {
            label: {
                'EN': 'Accruals',
                'HU': 'Jövőbeni gyarapodás'
            },
            field: 'accruals',
            link: {}
        }, {
            label: {
                'EN': 'System of arrangement',
                'HU': 'A leírási egység szerkezete'
            },
            field: 'system_of_arrangement_information',
            bilingual: true,
            link: {}
        }
    ]
}

const ConditionsOfAccessAndUseArea = {
    group: {
        'EN': 'Conditions of access and use',
        'HU': 'Hozzáférés és használat'
    },
    fields: [
        {
            label: {
                'EN': 'Conditions governing access',
                'HU': 'Jogi helyzet'
            },
            field: 'access_rights',
            link: {}
        }, {
            label: {
                'EN': 'Conditions governing reproduction',
                'HU': ' Reprodukciós korlátozások'
            },
            field: 'reproduction_rights',
            link: {}
        }, {
            label: {
                'EN': 'Language/scripts of material',
                'HU': 'Nyelv, írásrendszer'
            },
            field: 'languages',
            link: {}
        }, {
            label: {
                'EN': 'Physical characteristics and technical requirements',
                'HU': 'Fizikai jellemzők, technikai követelmények'
            },
            field: 'physical_characteristics',
            bilingual: true,
            link: {}
        }
    ]
}

const AlliedMaterialsArea = {
    group: {
        'EN': 'Allied Materials',
        'HU': 'Kapcsolódó anyagok'
    },
    fields: [
        {
            label: {
                'EN': 'Existence and location of originals',
                'HU': 'Eredeti példányok léte és őrzőhelye'
            },
            field: 'location_of_originals',
            link: {}
        }, {
            label: {
                'EN': 'Existence and location of copies',
                'HU': ' Másolatok léte és őrzőhelye'
            },
            field: 'location_of_copies',
            link: {}
        }, {
            label: {
                'EN': 'Related units of description',
                'HU': 'Kapcsolódó leírási egységek'
            },
            field: 'related_units',
            link: {}
        }, {
            label: {
                'EN': 'Publication note',
                'HU': 'Publikációk'
            },
            field: 'publication_note',
            bilingual: true,
            link: {}
        }
    ]
}

const NotesArea = {
    group: {
        'EN': 'Notes',
        'HU': 'Jegyzetek'
    },
    fields: [
        {
            label: {
                'EN': '',
                'HU': ''
            },
            field: 'note',
            bilingual: true,
            link: {}
        }
    ]
}

const DescriptionControlArea = {
    group: {
        'EN': 'Description Control',
        'HU': 'Ellenőrzés'
    },
    fields: [
        {
            label: {
                'EN': 'Archivist\'s note',
                'HU': 'A leírás készítése és készítője'
            },
            field: 'archivists_note',
            bilingual: true,
            link: {}
        }, {
            label: {
                'EN': 'Rules or Conventions',
                'HU': 'Szabványok és szabályok'
            },
            field: 'rules_conventions',
            link: {}
        }, {
            label: {
                'EN': 'Date(s) of descriptions',
                'HU': 'A leírás készítésének ideje'
            },
            field: 'date_of_description',
            link: {}
        }
    ]
}

export const isadFieldConfig = [
    IdentityStatementArea,
    ContextArea,
    ContentAndStructureArea,
    ConditionsOfAccessAndUseArea,
    AlliedMaterialsArea,
    NotesArea,
    DescriptionControlArea
]
