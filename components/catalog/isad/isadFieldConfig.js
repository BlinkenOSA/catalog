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
            link: {}
        }, {
            label: {
                'EN': 'Date(s)',
                'HU': 'Időkör'
            },
            field: 'dateFrom',
            link: {}
        }, {
            label: {
                'EN': 'Description Level',
                'HU': 'Leírás szintje'
            },
            field: 'descriptionLevel',
            link: {}
        }, {
            label: {
                'EN': 'Extent and medium (estimated)',
                'HU': 'Terjedelem és adathordozók (becsült)'
            },
            field: 'extent_estimated',
            link: {},
            display: 'vertical'
        }, {
            label: {
                'EN': 'Extent and medium (processed)',
                'HU': 'Terjedelem és adathordozók (feldolgozott)'
            },
            field: 'extent',
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
                'EN': 'Administrative / Biographical history',
                'HU': 'Szervtörténet / Életrajz'
            },
            field: 'administrativeHistory',
            link: {}
        }, {
            label: {
                'EN': 'Archival history',
                'HU': 'A megőrzés története'
            },
            field: 'archivalHistory',
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
            field: 'scopeAndContentAbstract',
            link: {}
        }, {
            label: {
                'EN': 'Scope and content (narrative)',
                'HU': 'Tárgy és tartalom (kifejtés)'
            },
            field: 'scopeAndContentNarrative',
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
            field: 'systemOfArrangement',
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
            field: 'rightsAccess',
            link: {}
        }, {
            label: {
                'EN': 'Conditions governing reproduction',
                'HU': ' Reprodukciós korlátozások'
            },
            field: 'rightsReproduction',
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
            field: 'physicalCharacteristics',
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
            field: 'locationOfOriginals',
            link: {}
        }, {
            label: {
                'EN': 'Existence and location of copies',
                'HU': ' Másolatok léte és őrzőhelye'
            },
            field: 'loctionOfCopies',
            link: {}
        }, {
            label: {
                'EN': 'Related units of description',
                'HU': 'Kapcsolódó leírási egységek'
            },
            field: 'relatedUnits',
            link: {}
        }, {
            label: {
                'EN': 'Publication note',
                'HU': 'Publikációk'
            },
            field: 'publicationNote',
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
            field: 'archivistsNote',
            link: {}
        }, {
            label: {
                'EN': 'Rules or Conventions',
                'HU': 'Szabványok és szabályok'
            },
            field: 'rulesOrConventions',
            link: {}
        }, {
            label: {
                'EN': 'Date(s) of descriptions',
                'HU': 'A leírás készítésének ideje'
            },
            field: 'dateOfDescription',
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
