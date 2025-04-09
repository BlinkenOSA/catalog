import {getPdfURL} from "../../../../../utils/digitalObjectFunctions";
import axios from "axios";

export default async function handler(req, res) {
    const {identifier, filename} = req.query;
    const url = getPdfURL(identifier, filename)

    const getData = () => {
        return axios.head(url).then(response => response.headers)
    }

    const data = await getData();
    return res.status(200).json({size: data['content-length']})
}