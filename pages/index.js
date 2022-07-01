import Head from 'next/head'
import Layout from "../components/layout/Layout";
import BreadcrumbSearch from "../components/breadcrumbs/BreadcrumbSearch";
import IndexPage from "../components/content/IndexPage";
import React, {useState} from "react";
import FacetPage from "../components/facets/FacetPage";
import useSWR from "swr";
import {solrFetcher} from "../utils/fetcher";
import {useRouter} from "next/router";
import SearchPage from "../components/content/SearchPage";
import LayoutWithFacet from "../components/layout/LayoutWithFacet";
import {useMeasure} from "react-use";

const Index = () => {
    const [ref, {height}] = useMeasure();

    const router = useRouter();

    const { data, error } = useSWR(router.query, solrFetcher)
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
                <BreadcrumbSearch
                    total={data ? data['response']['numFound'] : 0}
                    reference={ref}
                    inverse={false}
                    module={''}
                />
                {
                    Object.entries(router.query).length === 0 ?
                        <IndexPage
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
            </LayoutWithFacet>
        )
    }
}

export default Index
