const createParams = (query, limit, offset, selectedFacets) => {
    const params = {
        ...selectedFacets
    }

    if (query && query !== '') {
        params['query'] = query
    }

    if (limit) {
        params['limit'] = limit
    }

    if (offset) {
        params['offset'] = offset
    }

    return params;
}

export default createParams;
