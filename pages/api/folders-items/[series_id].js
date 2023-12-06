import {makeSolrParams, solrFetcher} from "../../../utils/fetcherFunctions";
import axios from "axios";

const SOLR_FOLDERS_ITEMS_API = process.env.NEXT_PUBLIC_SOLR_FOLDERS_ITEMS;

const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS

export default async function handler(req, res) {
	let done = false;
	let solrData = [];
	const {series_id, ...params} = req.query;

	params['filterQuery'] = `series_id:${series_id}`
	params['cursorMark'] = '*'

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

	while (!done) {
		const results = await getData()

		if (params['cursorMark'] === results['nextCursorMark']) {
			done = true
		}
		solrData.push(results)
		params['cursorMark'] = results['nextCursorMark']
	}
	return res.status(200).json(solrData)
}