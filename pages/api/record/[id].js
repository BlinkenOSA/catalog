import axios from "axios";
import {Marc} from "marcjs";

export default async function handler(req, res) {
    const {id} = req.query;
    let marc;

    const getData = () => {
        let baseParams = new URLSearchParams();
        baseParams.append('q', `id:${id}`);
        return axios.get(
            `http://localhost:8983/solr/osacatalog/select`,
            {params: baseParams}
        ).then(res => res.data);
    }
    const data = await getData();

    if (data['response']['docs'].length === 1) {
        const record = data['response']['docs'][0];
        switch (record['record_origin']) {
            case 'Library':
                marc = Marc.parse(record['marcxml'], 'Marcxml');
                return res.status(200).json(marc.mij())
            case 'Film Library':
                marc = Marc.parse(record['marcxml'], 'Marcxml');
                return res.status(200).json(marc.mij())
            default:
                return res.status(200).json({})
        }
    }
    return res.status(404).json({error: 'Not found'})
}
