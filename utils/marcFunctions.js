import {iso6392} from 'iso-639-2'

export const getSubfieldValues = (marc, field, subfield) => {
    let values = [];
    const mainField = marc.get(field);

    if (mainField.length > 0) {
        mainField.forEach(mf => {
            mf['subf'].forEach(sf => {
                if (sf[0] === subfield) {
                    values.push(sf[1])
                }
            })
        })
    }

    if (values.length > 0) {
        return values
    } else {
        return '';
    }
}

const getSubfieldValue = (subfields, fieldCode) => {
    let values = [];
    const filtered = subfields ? subfields.filter(sf => Object.keys(sf).includes(fieldCode)) : []

    filtered.forEach(f => {
        f.hasOwnProperty(fieldCode) && values.push(f[fieldCode])
    })
    return values
}

export const getTitle = (document) => {
    let values = [];
    const titleField = document['fields'].filter(field => Object.keys(field).includes('245'))
    const titleSubfields = titleField[0]['245']['subfields']

    const publishField = document['fields'].filter(field => Object.keys(field).includes('260'))
    const publishSubfields = publishField[0]['260']['subfields']

    values.push(getSubfieldValue(titleSubfields, 'a'))
    values.push(getSubfieldValue(titleSubfields, 'b'))
    values.push(getSubfieldValue(titleSubfields, 'c'))

    values.push(`${getSubfieldValue(publishSubfields, 'c')}`)
    return values.join(' ');
}

export const getValues = (document, field, subfields, separator=' ') => {
    let values = [];

    const fields = document['fields'].filter(df => Object.keys(df).includes(field))
    fields.forEach(f => {
        let subfieldValues = [];

        /* Special mappings */
        switch (field) {
            case '041':
                subfields.forEach(sf => {
                    const subfieldValue = getSubfieldValue(f[field]['subfields'], sf)
                    if (subfieldValue.length > 0 && sf === 'a') {
                        const lang = iso6392.filter(l => l['iso6392B'] === subfieldValue[0])
                        subfieldValues.push(lang.length > 0 ? lang[0]['name'] : '')
                    } else {
                        subfieldValue && subfieldValues.push(...subfieldValue)
                    }
                })
                values.push(subfieldValues)
                break;
            case '952':
                subfields.forEach(sf => {
                    const subfieldValue = getSubfieldValue(f[field]['subfields'], sf)
                    if (subfieldValue.length > 0) {
                        subfieldValues.push(...subfieldValue)
                    } else {
                        subfieldValues.push('-')
                    }
                })
                values.push(subfieldValues)
                break;
            default:
                subfields.forEach(sf => {
                    const subfieldValue = getSubfieldValue(f[field]['subfields'], sf)
                    subfieldValue.length > 0 && subfieldValues.push(...subfieldValue)
                })
                values.push(subfieldValues)
                break;
        }
    })
    return values;
}
