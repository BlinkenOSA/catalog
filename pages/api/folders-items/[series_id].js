import {makeSolrParams, solrFetcher} from "../../../utils/fetcherFunctions";
import axios from "axios";

const SOLR_FOLDERS_ITEMS_API = process.env.NEXT_PUBLIC_SOLR_FOLDERS_ITEMS;

const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS

export default async function handler(req, res) {
	let done = false;
	let index = 1;
	let solrData;
	const {series_id, start, offset, tab, view, ...params} = req.query;

	const containerFrom = start ? Number(start) : 1;

	params['filterQuery'] = `series_id:${series_id} AND container_number_sort:[${containerFrom} TO *]`

	if (view === 'all') {
		params['cursorMark'] = '*'
	} else {
		params['limit'] = 20
		params['offset'] = offset
	}

	const getData = () => {
		const solrParams = makeSolrParams(params)

		return axios.get(
			SOLR_FOLDERS_ITEMS_API,
			{
				params: solrParams,
				auth: {
					username: SOLR_USER,
					password: SOLR_PASS
				}
			}
		).then(res => res.data);
	}

	if (view === 'all') {
		while (!done) {
			const results = await getData()

			if (params['cursorMark'] === results['nextCursorMark']) {
				done = true
			}

			if (index === 1) {
				solrData = results;
			} else {
				solrData['response']['docs'].push(...results['response']['docs'])
			}

			params['cursorMark'] = results['nextCursorMark']
			index += 1;
		}
		return res.status(200).json(solrData)
	} else {
		const results = await getData()
		return res.status(200).json(results)
	}

}