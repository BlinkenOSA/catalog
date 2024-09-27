import {MeiliSearch} from "meilisearch";

const SEARCH_API = process.env.NEXT_PUBLIC_SEARCH_API;
const SEARCH_API_KEY = process.env.NEXT_PUBLIC_SEARCH_API_KEY;


export default async function handler(req, res) {
	const {series_id, query, start, offset, tab, view, ...params} = req.query;

	const containerFrom = start ? Number(start) : 1;

	const client = new MeiliSearch({
		host: SEARCH_API,
		apiKey: SEARCH_API_KEY,
	});

	const index = client.index("catalog");

	const getFilterParams = () => {
		const p = []

		p.push(`series_id = ${series_id}`)
		p.push(`container_number >= ${containerFrom}`)

		// Handle filters
		Object.keys(params).forEach(key => {
			if (params[key]) {
				p.push(`${key} = "${params[key]}"`)
			}
		})

		return p.join(' AND ')
	}

	const getData = async (initialLimit = 20) => {
		const data = await index.search(query ? query : '', {
			filter: getFilterParams(),
			attributesToHighlight: ['title', 'title_original', 'contents_summary', 'contents_summary_original'],
			limit: initialLimit,
			offset: offset ? Number(offset) : 0,
			facets: ['subject', 'geo', 'contributor', 'year_created'],
			sort: ['container_number:asc', 'folder_number:asc', 'sequence_number:asc']
		})
		return data
	}

	if (view === 'all') {
		const firstResults = await getData()
		const results = await getData(firstResults['estimatedTotalHits']);

		return res.status(200).json(results)
	} else {
		const results = await getData()
		return res.status(200).json(results)
	}

}