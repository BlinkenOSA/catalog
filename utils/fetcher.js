import axios from 'axios';
export const API = process.env.NEXT_PUBLIC_CATALOG_API;

export const fetcher = (url, params) => {
    return axios.get(
        `${API}${url}`,
        {params: params}
    ).then(res => res.data);
};
