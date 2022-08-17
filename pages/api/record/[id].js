import axios from "axios";
import {Marc} from "marcjs";

export default async function handler(req, res) {
    const {id} = req.query;
    let fa = {};
    let isad = {};
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
            case 'Archives':
                if (record['primary_type'] === 'Archival Unit') {
                    const data = JSON.parse(record['isad_json'])
                    isad['isad-eng'] = JSON.parse(data['isad_json_eng'])
                    if (data.hasOwnProperty('isad_json_2nd')) {
                        isad['isad-translation'] = JSON.parse(data['isad_json_2nd'])
                    }
                    return res.status(200).json(isad)
                } else {
                    const data = JSON.parse(record['item_json'])
                    return res.status(200).json(data)
                }
            default:
                return res.status(200).json({})
        }
    }
    return res.status(404).json({error: 'Not found'})
}
