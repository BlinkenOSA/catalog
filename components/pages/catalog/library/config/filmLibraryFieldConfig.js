export const filmLibraryFieldConfig = [
    {
        group: 'General Information',
        fields: [
            {
                label: 'Director/Creator',
                fieldConfig: {'100': ['a', 'd']},
                links: {
                    '100': { subfields: ['a'], target: 'director' }
                }
            }, {
                label: 'Original Title',
                fieldConfig: {'880': ['a', 'c'], '245': ['a', 'c']},
                display: 'vertical'
            }, {
                label: 'Uniform Title',
                fieldConfig: {'240': ['a']}
            }, {
                label: 'Language',
                fieldConfig: {'041': ['a'], '546': ['a']}
            }, {
                label: 'Language of subtitles',
                fieldConfig: {'041': ['j']}
            }, {
                label: 'Published',
                fieldConfig: {'260': ['a', 'b', 'c', 'e', 'f']}
            }, {
                label: 'Physical Description',
                fieldConfig: {'300': ['a', 'b', 'c', 'e', 'f', 'g']}
            }, {
                label: 'Series',
                fieldConfig: ['440', '800', '810', '811', '830']
            }
        ]
    }, {
        group: 'Contributors',
        fields: [
            {
                label: '',
                fieldConfig: ['700', '710', '711', '720', '730']
            }
        ]
    }, {
        group: 'Contents Summary',
        fields: [
            {
                label: '',
                fieldConfig: ['520']
            }
        ]
    }, {
        group: 'Subjects',
        fields: [
            {
                label: 'Subject',
                fieldConfig: ['600','610','611','630','650','651','653','654','656','657','658','690','691','693','696', '697','698','699'],
                display: 'vertical'
            }, {
                label: 'Genre',
                fieldConfig: ['655'],
                display: 'vertical',
                links: {
                    '655': {subfields: ['a'], target: 'genre'}
                }
            }
        ]
    }, {
        group: 'Bibliographic Information',
        fields: [
            {
                label: 'Collective Title',
                fieldConfig: ['243']
            }, {
                label: 'Title Variation',
                fieldConfig: ['246']
            }, {
                label: 'Former Title',
                fieldConfig: ['247']
            }, {
                label: 'Musical Presentation',
                fieldConfig: {'254': ['a']}
            }, {
                label: 'Map Data',
                fieldConfig: ['255']
            }, {
                label: 'File Characteristics',
                fieldConfig: {'256': ['a']}
            }, {
                label: 'Frequency',
                fieldConfig: ['310']
            }, {
                label: 'Former Publication Frequency',
                fieldConfig: ['321']
            }, {
                label: 'Medium',
                fieldConfig: ['340']
            }, {
                label: 'Vol/date range',
                fieldConfig: ['362']
            }, {
                label: 'Note',
                fieldConfig: ['500', '502', '526', '530', '545', '547', '550', '552', '563', '584', '590', '592'],
                display: 'vertical'
            }, {
                label: 'With',
                fieldConfig: ['501']
            }, {
                label: 'Content',
                fieldConfig: ['505']
            }, {
                label: 'Access',
                fieldConfig: ['506']
            }, {
                label: 'Scale',
                fieldConfig: ['507']
            }, {
                label: 'Citation',
                fieldConfig: ['510']
            }, {
                label: 'Report',
                fieldConfig: ['513']
            }, {
                label: 'Event',
                fieldConfig: ['518']
            }, {
                label: 'Reproduction',
                fieldConfig: ['533']
            }, {
                label: 'Original Version',
                fieldConfig: ['534']
            }, {
                label: 'Location of Originals',
                fieldConfig: ['535']
            }, {
                label: 'Format',
                fieldConfig: ['538']
            }, {
                label: 'Terms',
                fieldConfig: ['540']
            }, {
                label: 'Source',
                fieldConfig: ['541']
            }, {
                label: 'Copyright Status',
                fieldConfig: ['542']
            }, {
                label: 'Finding Aid',
                fieldConfig: ['555']
            }, {
                label: 'Library Special Collection',
                fieldConfig: ['580']
            }, {
                label: 'ISBN',
                fieldConfig: {'020': ['a']}
            }, {
                label: 'ISSN',
                fieldConfig: {'022': ['a']}
            }
        ]
    }
]
