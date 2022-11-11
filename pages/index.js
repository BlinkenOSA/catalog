import Head from 'next/head'
import Layout from "../components/layout/Layout";
import BreadcrumbSearch from "../components/breadcrumbs/BreadcrumbSearch";
import IndexPage from "../components/pages/IndexPage";
import React, {useState} from "react";
import FacetPage from "../components/facets/desktop/FacetPage";
import useSWR from "swr";
import {solrFetcher} from "../utils/fetcherFunctions";
import {useRouter} from "next/router";
import SearchPage from "../components/pages/SearchPage";
import LayoutWithFacet from "../components/layout/LayoutWithFacet";
import {useMeasure} from "react-use";
import { Media } from "../utils/media";
import FacetPageMobile from "../components/facets/mobile/FacetPageMobile";

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
                <Media lessThan="md">
                    {
                        (className, renderChildren) => {
                            return renderChildren ?
                                <BreadcrumbSearch
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
                                    <BreadcrumbSearch
                                        reference={ref}
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
