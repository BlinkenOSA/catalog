import axios from "axios";
import {Marc} from "marcjs";
import {getSubfieldValues} from "../../../../utils/marcFunctions";

export default async function handler(req, res) {
    const {id} = req.query;

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
        if (record['record_origin'] === 'Library') {
            const marc = Marc.parse(record['marcxml'], 'Marcxml');
            const values = getSubfieldValues(marc, '020', 'a')

            if (values > 0) {
                const isbn = values[0];
                const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
                return res.redirect(url)
            }
        }
    }
    return res.redirect('/images/1x1.png')
}
