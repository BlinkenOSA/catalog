import axios from "axios";
import {Marc} from "marcjs";

const SOLR_API = process.env.NEXT_PUBLIC_SOLR;

const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS

export default async function handler(req, res) {
    const {id} = req.query;
    let marc;

    const getData = () => {
        let baseParams = new URLSearchParams();
        baseParams.append('q', `id:${id}`);
        baseParams.append('fl', 'id,record_origin,marc')
        return axios.get(
          SOLR_API,
            {
                params: baseParams,
                auth: {
                    username: SOLR_USER,
                    password: SOLR_PASS
                }
            }
        ).then(res => res.data);
    }
    const data = await getData();

    if (data['response']['docs'].length === 1) {
        const record = data['response']['docs'][0];
        switch (record['record_origin']) {
            case 'Library':
                marc = Marc.parse(record['marc'], 'mij');
                return res.status(200).json(marc.mij())
            case 'Film Library':
                marc = Marc.parse(record['marc'], 'mij');
                return res.status(200).json(marc.mij())
            default:
                return res.status(200).json({})
        }
    }
    return res.status(404).json({error: 'Not found'})
}
