import Head from 'next/head'
import Layout from "../components/layout/Layout";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import IndexPage from "../components/pages/IndexPage";
import React, {useState} from "react";
import FacetPage from "../components/facets/desktop/FacetPage";
import {makeSolrParams} from "../utils/fetcherFunctions";
import {useRouter} from "next/router";
import SearchPage from "../components/pages/SearchPage";
import LayoutWithFacet from "../components/layout/LayoutWithFacet";
import {useMeasure} from "react-use";
import { Media } from "../utils/media";
import FacetPageMobile from "../components/facets/mobile/FacetPageMobile";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
const API = process.env.NEXT_PUBLIC_AMS_API;
const SOLR_API = process.env.NEXT_PUBLIC_SOLR;

export async function getServerSideProps(context) {
  const params = context.query
  const solrParams = Object.entries(params).length > 0 ? makeSolrParams(params) : makeSolrParams({qf: 'identifier_search'})

  const res = await fetch(`${SOLR_API}?` + solrParams)
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
                {
                    Object.entries(router.query).length === 0 ?
                        <IndexPage
                            badgeData={badgeData}
                            newIsadData={newIsadData}
                            onSelectFacetGroup={onSelectFacetGroup}
                        /> :
                        <SearchPage
                            data={data}
                            onSelectFacetGroup={onSelectFacetGroup}
                        />
                }
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
