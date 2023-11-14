import Head from 'next/head'
import Layout from "../components/layout/Layout";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import IndexPageDesktop from "../components/pages/index/desktop/IndexPage";
import IndexPageMobile from "../components/pages/index/mobile/IndexPage";
import React, {useEffect, useState} from "react";
import FacetPage from "../components/facets/desktop/FacetPage";
import {makeSolrParams} from "../utils/fetcherFunctions";
import {useRouter} from "next/router";
import SearchPage from "../components/pages/search/SearchPage";
import LayoutWithFacet from "../components/layout/LayoutWithFacet";
import {useDeepCompareEffect, useMeasure, useSessionStorage} from "react-use";
import {Media} from "../utils/media";
import FacetPageMobile from "../components/facets/mobile/FacetPageMobile";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
import {Buffer} from "buffer";
import {facetConfig} from "../config/facetConfig";


const API = process.env.NEXT_PUBLIC_AMS_API;
const SOLR_API = process.env.NEXT_PUBLIC_SOLR;

const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER;
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS;

export async function getServerSideProps(context) {
    const params = context.query
    const solrParams = Object.entries(params).length > 0 ? makeSolrParams(params) : makeSolrParams({qf: 'identifier_search'})
    let data = []

    if (Object.entries(params).length > 0) {
        // SOLR Basic Authentication
        let headers = new Headers();
        headers.set('Authorization', 'Basic ' + Buffer.from(SOLR_USER + ":" + SOLR_PASS).toString('base64'));

        const res = await fetch(`${SOLR_API}?` + solrParams, {
            headers: headers
        })
        data = await res.json()
    } else {
        data = []
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

    if (data.length === 0) {
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
                                        total={data ? data['response']['numFound'] : 0}
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
                              total={data ? data['response']['numFound'] : 0}
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
                                            total={data ? data['response']['numFound'] : 0}
                                            inverse={true}
                                            module={''}
                                            onSelectFacetGroup={onSelectFacetGroup}
                                            isMobile={true}
                                        />
                                        <FacetPageMobile
                                            facetConfig={facetConfig}
                                            breadcrumbHeight={height}
                                            facets={data ? data['facet_counts']['facet_fields'] : {}}
                                            total={data ? data['response']['numFound'] : 0}
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
                            facets={data ? data['facet_counts']['facet_fields'] : {}}
                            total={data ? data['response']['numFound'] : 0}
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