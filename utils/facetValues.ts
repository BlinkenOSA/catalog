type facetValue = {
  value: string,
  count: number
}

type facetValuesOptions = {
  [key: string]: facetValue[]
}

export const facetValues: facetValuesOptions = {
  record_origin: [{
    value: 'Archive',
    count: 13
  }, {
    value: 'Digital Repository',
    count: 1234
  }, {
    value: 'Library',
    count: 34
  }],
  record_type: [{
    value: 'Audio',
    count: 34
  }, {
    value: 'Moving Image',
    count: 3434
  }]
}
