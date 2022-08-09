import Head from 'next/head'
import Layout from "../../components/layout/Layout";
import BreadcrumbSearch from "../../components/breadcrumbs/BreadcrumbSearch";
import React from "react";
import useSWR from "swr";
import {solrFetcher} from "../../utils/fetcherFunctions";
import {useRouter} from "next/router";
import {useMeasure} from "react-use";
import LibraryPage from "../../components/catalog/library/LibraryPage";
import style from "../pages.module.scss"
import FilmLibraryPage from "../../components/catalog/film-library/FilmLibraryPage";

const CatalogPage = () => {
    const [ref, {height}] = useMeasure();

    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(id && {query: `id:${id}`}, solrFetcher)

    const renderPage = () => {
        if (data) {
            const record = data['response']['docs'][0]
            switch (record['record_origin']) {
                case 'Library':
                    return <LibraryPage record={record} />
                case 'Film Library':
                    return <FilmLibraryPage record={record} />
                default:
                    return '';
            }
        }
    }

    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Catalog</title>
            </Head>
            <BreadcrumbSearch
                reference={ref}
                inverse={false}
                module={'detail'}
            />
            <div className={style.Page}>
                {renderPage()}
            </div>
        </Layout>
    )
}

export default CatalogPage
