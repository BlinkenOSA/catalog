import Head from 'next/head'
import Layout from "../components/layout/Layout";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import IndexPageDesktop from "../components/pages/index/desktop/IndexPage";
import IndexPageMobile from "../components/pages/index/mobile/IndexPage";
import React, {useEffect, useState} from "react";
import FacetPage from "../components/facets/desktop/FacetPage";
import {makeSearchParams, makeSolrParams} from "../utils/fetcherFunctions";
import {useRouter} from "next/router";
import SearchPage from "../components/pages/search/SearchPage";
import LayoutWithFacet from "../components/layout/LayoutWithFacet";
import {useDeepCompareEffect, useMeasure, useSessionStorage} from "react-use";
import {Media} from "../utils/media";
import FacetPageMobile from "../components/facets/mobile/FacetPageMobile";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
import {facetConfig} from "../config/facetConfig";
import { MeiliSearch } from "meilisearch";

const API = process.env.NEXT_PUBLIC_AMS_API;

const SEARCH_API = process.env.NEXT_PUBLIC_SEARCH_API;
const SEARCH_USER = process.env.NEXT_PUBLIC_SEARCH_API_KEY;

export async function getServerSideProps(context) {
    const params = context.query
    const searchParams = makeSearchParams(params)

    const client = new MeiliSearch({
        host: SEARCH_API,
        apiKey: SEARCH_USER,
    });

    const index = client.index("catalog");

    let data = []

    const {q, ...p} = searchParams

    if (Object.entries(params).length > 0) {
        data = await index.search(q, {
            ...p,
            facets: ['language', 'subject', 'geo', 'year_created', 'primary_type', 'contributor', 'keyword'],
            attributesToHighlight: ['title', 'title_original', 'contents_summary', 'contents_summary_original'],
        })
    } else {
        data = {'estimatedTotalHits': 0}
    }

    return {props: {data}}
}


const Index = ({data, badgeData, newIsadData}) => {
    const [ref, {height}] = useMeasure();

    const router = useRouter();

    const [selectedFacetGroup, setSelectedFacetGroup] = useState('')

    /* Keep current route in the session storage */
    const [storage, setStorage] = useSessionStorage('blinken-osa-catalog-searchpage', router.asPath);
    useDeepCompareEffect(() => {
        setStorage(router.asPath)
    }, [router])

    const onSelectFacetGroup = (facetGroup) => {
        if (selectedFacetGroup === facetGroup) {
            setSelectedFacetGroup('')
        } else {
            setSelectedFacetGroup(facetGroup)
        }
    }

    const onShowButtonClick = () => {
        setSelectedFacetGroup('')
    }

    if (data['estimatedTotalHits'] === 0) {
        return (
            <>
                <Media greaterThanOrEqual="md">
                    <IndexPageDesktop
                        badgeData={badgeData}
                        newIsadData={newIsadData}
                        onSelectFacetGroup={onSelectFacetGroup}
                    />
                </Media>
                <Media lessThan="md">
                  <IndexPageMobile
                    badgeData={badgeData}
                    newIsadData={newIsadData}
                    onSelectFacetGroup={onSelectFacetGroup}
                  />
                </Media>
            </>
        )
    } else {
        if (selectedFacetGroup === '') {
            return (
                <Layout>
                    <Head>
                        <title>Blinken OSA Archivum - Catalog</title>
                    </Head>
                    <Media greaterThanOrEqual="md">
                        {
                            (className, renderChildren) => {
                                return renderChildren ?
                                    <BreadcrumbSearch
                                        total={data ? data['estimatedTotalHits'] : 0}
                                        reference={ref}
                                        inverse={false}
                                        module={''}
                                    /> : '';
                            }
                        }
                    </Media>
                    <Media lessThan="md">
                      {
                        (className, renderChildren) => {
                          return renderChildren ?
                            <BreadcrumbSearchMobile
                              defaultFacetOpen={'primary_type'}
                              total={data ? data['estimatedTotalHits'] : 0}
                              reference={ref}
                              inverse={false}
                              module={''}
                              onSelectFacetGroup={onSelectFacetGroup}
                            /> : '';
                        }
                      }
                    </Media>
                    <SearchPage
                        data={data}
                        onSelectFacetGroup={onSelectFacetGroup}
                    />
                </Layout>
            )
        } else {
            return (
                <LayoutWithFacet>
                    <Head>
                        <title>Blinken OSA Archivum - Catalog</title>
                    </Head>
                    <Media lessThan="md">
                        {
                            (className, renderChildren) => {
                                return renderChildren ?
                                    <React.Fragment>
                                        <BreadcrumbSearchMobile
                                            reference={ref}
                                            defaultFacetOpen={'primary_type'}
                                            total={data ? data['estimatedTotalHits'] : 0}
                                            inverse={true}
                                            module={''}
                                            onSelectFacetGroup={onSelectFacetGroup}
                                            isMobile={true}
                                        />
                                        <FacetPageMobile
                                            facetConfig={facetConfig}
                                            breadcrumbHeight={height}
                                            facets={data ? data['facetDistribution'] : {}}
                                            total={data ? data['estimatedTotalHits'] : 0}
                                            selectedFacetGroupInitial={selectedFacetGroup}
                                            onShowButtonClick={onShowButtonClick}
                                        />
                                    </React.Fragment> : '';
                            }
                        }
                    </Media>
                    <Media greaterThanOrEqual="md">
                        <BreadcrumbSearch
                            reference={ref}
                            inverse={true}
                            module={''}
                        />
                        <FacetPage
                            facetConfig={facetConfig}
                            breadcrumbHeight={height}
                            facets={data ? data['facetDistribution'] : {}}
                            total={data ? data['estimatedTotalHits'] : 0}
                            selectedFacetGroup={selectedFacetGroup}
                            onSelectFacetGroup={onSelectFacetGroup}
                            onShowButtonClick={onShowButtonClick}
                        />
                    </Media>
                </LayoutWithFacet>
            )
        }
    }
}

export default Index;