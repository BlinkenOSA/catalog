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

const FindingAidsPage = dynamic(() => import("../../components/catalog/finding-aids/FindingAidsPage"), {
    ssr: false,
});

const CatalogPage = () => {
    const [ref, {height}] = useMeasure();

    const router = useRouter();
    const { id } = router.query;

    const { data, error } = useSWR(id && {query: `id:${id}`}, solrFetcher)

    const renderPage = (isMobile) => {
        if (data) {
            const record = data['response']['docs'][0]
            switch (record['record_origin']) {
                case 'Library':
                    return <LibraryPage record={record} type={'library'} isMobile={isMobile}/>
                case 'Film Library':
                    return <LibraryPage record={record} type={'filmLibrary'} isMobile={isMobile}/>
                case 'Archives':
                    if (record['primary_type'] === 'Archival Unit') {
                        return <IsadPage record={record} isMobile={isMobile}/>
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
