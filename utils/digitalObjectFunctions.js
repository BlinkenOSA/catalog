const generateSeriesCodeFromReferenceCode = (referenceCode) => {
    return referenceCode.substring(0, referenceCode.indexOf(':'))
}

const getURL = (archivalID, digitalVersionID, type, isThumbnail = false) => {
    let storageURL = '';
    let extension = '';
    switch (type) {
        case 'Textual':
            storageURL = 'https://storage.osaarchivum.org/catalog/textual'
            extension = 'pdf'
            break;
        case 'Moving Image':
            storageURL = 'https://storage.osaarchivum.org/catalog/video'
            extension = 'm3u8'
            break;
        case 'Audio':
            storageURL = 'https://storage.osaarchivum.org/catalog/audio'
            extension = 'mp3'
            break;
        case 'Still Image':
            storageURL = 'https://iiif.osaarchivum.org/iiif/2'
            extension = 'jpg'
    }

    if (isThumbnail) {
        extension = 'jpg'
    }

    const seriesCode = generateSeriesCodeFromReferenceCode(archivalID).replaceAll(' ', '_')

    if (type === 'Still Image') {
        if (isThumbnail) {
            const urlComponent = encodeURIComponent(`catalog/${seriesCode}/${digitalVersionID}.${extension}`);
            return `${storageURL}/${urlComponent}/full/150,/0/default.jpg`
        } else {
            return `${storageURL}/${encodeURIComponent(`catalog/${seriesCode}/${digitalVersionID}.${extension}`)}`
        }
    } else {
        return `${storageURL}/${seriesCode}/${digitalVersionID}.${extension}`
    }
}

export default getURL;
