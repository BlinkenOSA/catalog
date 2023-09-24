import Head from 'next/head'
import Layout from "../components/layout/Layout";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import IndexPage from "../components/pages/index/IndexPage";
import React, {useEffect, useState} from "react";
import FacetPage from "../components/facets/desktop/FacetPage";
import {makeSolrParams} from "../utils/fetcherFunctions";
import {useRouter} from "next/router";
import SearchPage from "../components/pages/search/SearchPage";
import LayoutWithFacet from "../components/layout/LayoutWithFacet";
import {useDeepCompareEffect, useMeasure, useSessionStorage} from "react-use";
import { Media } from "../utils/media";
import FacetPageMobile from "../components/facets/mobile/FacetPageMobile";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
import {Buffer} from "buffer";
import IndexPageNew from "../components/pages/index/IndexPageNew";

const API = process.env.NEXT_PUBLIC_AMS_API;
const SOLR_API = process.env.NEXT_PUBLIC_SOLR;

const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER;
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS;

export async function getServerSideProps2(context) {
  const params = context.query
  const solrParams = Object.entries(params).length > 0 ? makeSolrParams(params) : makeSolrParams({qf: 'identifier_search'})

  // SOLR Basic Authentication
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + Buffer.from(SOLR_USER + ":" + SOLR_PASS).toString('base64'));

  const res = await fetch(`${SOLR_API}?` + solrParams, {
    headers: headers
  })
  const data = await res.json()

  if (Object.entries(params).length === 0) {
    const [tagDataRes, newContentIsadRes] = await Promise.all([
      fetch(`${API}collection-specific-tags/`),
      fetch(`${API}newly-added-content/isad`)
    ]);

    const [badgeData, newIsadData] = await Promise.all([
      tagDataRes.json(), newContentIsadRes.json()
    ])
    return { props: { data, badgeData, newIsadData } }
  } else {
    return { props: { data } }
  }
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

    if (selectedFacetGroup === '') {
        if (Object.entries(router.query).length === 0) {
          return (
            <IndexPageNew
              badgeData={badgeData}
              newIsadData={newIsadData}
              onSelectFacetGroup={onSelectFacetGroup}
            />
          )
        } else {
          return (
            <Layout>
              <Head>
                <title>Blinken OSA Archivum - Catalog</title>
              </Head>
              <Media lessThan="md">
                {
                  (className, renderChildren) => {
                    return renderChildren ?
                      <BreadcrumbSearchMobile
                        total={data ? data['response']['numFound'] : 0}
                        reference={ref}
                        inverse={false}
                        module={''}
                        onSelectFacetGroup={onSelectFacetGroup}
                        isMobile={true}
                      /> : '';
                  }
                }
              </Media>
              <Media greaterThanOrEqual="md">
                {
                  (className, renderChildren) => {
                    return renderChildren ?
                      <BreadcrumbSearch
                        total={data ? data['response']['numFound'] : 0}
                        reference={ref}
                        inverse={false}
                        module={''}
                        isMobile={false}
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
        }
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
                                        total={data ? data['response']['numFound'] : 0}
                                        inverse={true}
                                        module={''}
                                        onSelectFacetGroup={onSelectFacetGroup}
                                        isMobile={true}
                                    />
                                    <FacetPageMobile
                                        breadcrumbHeight={height}
                                        facets={data ? data['facet_counts']['facet_fields'] : {}}
                                        total={data ? data['response']['numFound'] : 0}
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

export default Index
