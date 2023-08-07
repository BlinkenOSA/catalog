import Head from 'next/head'
import Layout from "../../components/layout/Layout";
import BreadcrumbSearch from "../../components/breadcrumbs/desktop/BreadcrumbSearch";
import React from "react";
import {useMeasure} from "react-use";
import LibraryPage from "../../components/catalog/library/LibraryPage";
import style from "../pages.module.scss"
import IsadPage from "../../components/catalog/isad/IsadPage";
import { Media } from "../../utils/media";
import BreadcrumbSearchMobile from "../../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
import FindingAidsPage from "../../components/catalog/finding-aids/FindingAidsPage";
export const API = process.env.NEXT_PUBLIC_AMS_API;
export const SOLR_API = process.env.NEXT_PUBLIC_SOLR;
export const SOLR_STATS_API = process.env.NEXT_PUBLIC_SOLR_STATS;


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
            case 'Film Library':
                return {
                    props: {
                        solrData
                    }
                }
            case 'Archives':
                const {ams_id} = record;
                if (record['primary_type'] === 'Archival Unit') {

                    const statsParams = new URLSearchParams({
                        q: `${record['description_level'].toLowerCase()}_id:${ams_id}`
                    })

                    const [metadataRes, hierarchyRes, insightsRes] = await Promise.all([
                        fetch(`${API}archival-units/${ams_id}/`),
                        fetch(`${API}archival-units-tree/${ams_id}/`),
                        fetch(`${SOLR_STATS_API}?` + statsParams)
                    ])
                    const [metadata, hierarchy, insights] = await Promise.all([
                        metadataRes.json(), hierarchyRes.json(), insightsRes.json()
                    ])
                    return {
                        props: {
                            solrData,
                            metadata,
                            hierarchy,
                            insights
                        }
                    }
                } else {
                    const [metadataRes, hierarchyRes] = await Promise.all([
                        fetch(`${API}finding-aids/${id}/`),
                        fetch(`${API}finding-aids-location/${id}/`),
                    ])
                    const [metadata, hierarchy, insights] = await Promise.all([
                        metadataRes.json(), hierarchyRes.json()
                    ])
                    return {
                        props: {
                            solrData,
                            metadata,
                            hierarchy
                        }
                    }
                }
            default:
                break;
        }
    }

    // Pass data to the page via props
    return { props: {
        solrData,
    } }
}

const CatalogPage = ({solrData, metadata, hierarchy, insights}) => {
    const [ref] = useMeasure();

    const renderPage = (isMobile) => {
        if (solrData) {
            const record = solrData['response']['docs'][0]
            switch (record['record_origin']) {
                case 'Library':
                    return <LibraryPage record={record} type={'library'} isMobile={isMobile}/>
                case 'Film Library':
                    return <LibraryPage record={record} type={'film-library'} isMobile={isMobile}/>
                case 'Archives':
                    if (record['primary_type'] === 'Archival Unit') {
                        return <IsadPage
                          solrData={record}
                          metadata={metadata}
                          hierarchy={hierarchy}
                          insights={insights}
                          isMobile={isMobile}/>
                    } else {
                        return <FindingAidsPage
                          solrData={record}
                          metadata={metadata}
                          hierarchy={hierarchy}
                          isMobile={isMobile}
                        />
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
