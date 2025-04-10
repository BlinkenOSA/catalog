import {getPdfURL} from "../../../../../utils/digitalObjectFunctions";
import axios from "axios";

const CATALOG_DOWNLOAD_USER = process.env.NEXT_PUBLIC_CATALOG_DOWNLOAD_USER;
const CATALOG_DOWNLOAD_PASS = process.env.NEXT_PUBLIC_CATALOG_DOWNLOAD_PASS;

export default async function handler(req, res) {
    const {identifier, filename} = req.query;
    const url = getPdfURL(identifier, filename)

    const getData = () => {
        return axios.head(url, {
            auth: {
                username: CATALOG_DOWNLOAD_USER,
                password: CATALOG_DOWNLOAD_PASS
            }
        }).then(response => response.headers)
    }

    const data = await getData();
    return res.status(200).json({size: data['content-length']})
}