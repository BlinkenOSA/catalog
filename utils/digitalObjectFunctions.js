const generateSeriesCodeFromReferenceCode = (referenceCode) => {
    return referenceCode.substring(0, referenceCode.indexOf(':'))
}

export const getURL = (archivalID, digitalVersionID, type, isThumbnail = false) => {
    let storageURL = '';
    let extension = '';

    switch (type) {
        case 'Moving Image':
            storageURL = 'https://storage.osaarchivum.org/catalog/video'
            extension = 'm3u8'
            break;
        case 'Audio':
            storageURL = 'https://storage.osaarchivum.org/catalog/audio'
            extension = 'mp3'
            break;
        case 'Still Image':
            storageURL = 'https://iiif2.osaarchivum.org/iiif/2'
            extension = 'jpg'
    }

    if (isThumbnail) {
        extension = 'jpg'
    }

    const seriesCode = generateSeriesCodeFromReferenceCode(archivalID)
        .replaceAll(' ', '_')
        .replaceAll('-', '_')

    switch (type) {
        case 'Textual':
            return getPdfURL(digitalVersionID, `${digitalVersionID}.jpg`)
        case 'Still Image':
            if (isThumbnail) {
                const urlComponent = encodeURIComponent(`catalog/${seriesCode}/${digitalVersionID}.${extension}`);
                return `${storageURL}/${urlComponent}/full/150,/0/default.jpg`
            } else {
                return `${storageURL}/${encodeURIComponent(`catalog/${seriesCode}/${digitalVersionID}.${extension}`)}`
            }
        default:
            return `${storageURL}/${seriesCode}/${digitalVersionID}.${extension}`
    }
}

export const getVideoURL = (identifier, isThumbnail=false) => {
    const storageURL = 'https://storage.osaarchivum.org/catalog/video'
    const tokens = identifier.split("_").slice(0, 5);

    if (isThumbnail) {
        return `${storageURL}/${tokens.join("_")}/${identifier}/${identifier}.jpg`
    } else {
        return `${storageURL}/${tokens.join("_")}/${identifier}/${identifier}.m3u8`
    }
}

export const getPdfURL = (identifier, fileName, isThumbnail=false) => {
    const storageURL = 'https://storage.osaarchivum.org/catalog/textual'
    const tokens = identifier.split("_").slice(0, 5);

    if (isThumbnail) {
        return `${storageURL}/${tokens.join("_")}/${identifier}.jpg`
    } else {
        return `${storageURL}/${tokens.join("_")}/${fileName}`
    }
}