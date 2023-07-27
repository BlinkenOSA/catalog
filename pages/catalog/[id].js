import Head from 'next/head'
import Layout from "../../components/layout/Layout";
import BreadcrumbSearch from "../../components/breadcrumbs/desktop/BreadcrumbSearch";
import React from "react";
import useSWR from "swr";
import {fetcher, solrFetcher} from "../../utils/fetcherFunctions";
import {useRouter} from "next/router";
import {useMeasure} from "react-use";
import LibraryPage from "../../components/catalog/library/LibraryPage";
import style from "../pages.module.scss"
import IsadPage from "../../components/catalog/isad/IsadPage";
import dynamic from "next/dynamic";
import { Media } from "../../utils/media";
import BreadcrumbSearchMobile from "../../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
export const API = process.env.NEXT_PUBLIC_AMS_API;
export const SOLR_API = process.env.NEXT_PUBLIC_SOLR;

const FindingAidsPage = dynamic(() => import("../../components/catalog/finding-aids/FindingAidsPage"), {
    ssr: false,
});

export async function getServerSideProps(context) {
    const { id } = context.params;

    // Fetch data from solr
    const solrParams = new URLSearchParams({
        q: `id:${id}`
    })

    const res = await fetch(`${SOLR_API}?` + solrParams)
    const solrData = await res.json()

    if (solrData) {
        const record = solrData['response']['docs'][0]

        switch (record['record_origin']) {
            case 'Library':
                break;
            case 'Archives':
                if (record['primary_type'] === 'Archival Unit') {
                    const {ams_id} = record;
                    const [metadataRes, hierarchyRes] = await Promise.all([
                        fetch(`${API}archival-units/${ams_id}/`),
                        fetch(`${API}archival-units-tree/${ams_id}/`)
                    ])
                    const [metadata, hierarchy] = await Promise.all([
                        metadataRes.json(), hierarchyRes.json()
                    ])
                    console.log(hierarchy)
                    return { props: {
                        solrData,
                        metadata,
                        hierarchy
                    } }
                } else {

                }
        }
    }

    // Pass data to the page via props
    return { props: {
        solrData,
    } }
}

const CatalogPage = ({solrData, data, metadata, hierarchy}) => {
    const [ref, {height}] = useMeasure();

    // const router = useRouter();
    // const { id } = router.query;

    // const { data, error } = useSWR(id && {query: `id:${id}`}, solrFetcher)

    const renderPage = (isMobile) => {
        if (solrData) {
            const record = solrData['response']['docs'][0]
            switch (record['record_origin']) {
                case 'Library':
                    return <LibraryPage record={record} type={'library'} isMobile={isMobile}/>
                case 'Film Library':
                    return <LibraryPage record={record} type={'filmLibrary'} isMobile={isMobile}/>
                case 'Archives':
                    if (record['primary_type'] === 'Archival Unit') {
                        return <IsadPage data={data} metadata={metadata} hierarchy={hierarchy} record={record} isMobile={isMobile}/>
                    } else {
                        return <FindingAidsPage record={record} isMobile={isMobile}/>
                    }
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
            <Media lessThan="md">
                <BreadcrumbSearchMobile
                    reference={ref}
                    inverse={false}
                    module={'detail'}
                />
                <div className={`${style.Page} ${style.Mobile}`}>
                    {renderPage(true)}
                </div>
            </Media>
            <Media greaterThanOrEqual="md">
                <BreadcrumbSearch
                    reference={ref}
                    inverse={false}
                    module={'detail'}
                />
                <div className={style.Page}>
                    {renderPage(false)}
                </div>
            </Media>

        </Layout>
    )
}

export default CatalogPage
