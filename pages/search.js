import Head from 'next/head'
import Layout from "../components/layout/Layout";
import BreadcrumbSearch from "../components/breadcrumbs/BreadcrumbSearch";
import SearchPage from "../components/content/SearchPage";
import React, {useState} from "react";
import FacetPage from "../components/facets/FacetPage";

const Search = () => {
    const [selectedFacetGroup, setSelectedFacetGroup] = useState('')

    const onSelectFacetGroup = (facetGroup) => {
        if (selectedFacetGroup === facetGroup) {
            setSelectedFacetGroup('')
        } else {
            setSelectedFacetGroup(facetGroup)
        }
    }

    const onFilterClick = () => {
        setSelectedFacetGroup('')
    }

    const renderPage = () => {
        if (selectedFacetGroup === '') {
            return (
                <React.Fragment>
                    <BreadcrumbSearch module={''} />
                    <SearchPage onSelectFacetGroup={onSelectFacetGroup} />
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <BreadcrumbSearch inverse={true} module={''} />
                    <FacetPage
                        selectedFacetGroup={selectedFacetGroup}
                        onSelectFacetGroup={onSelectFacetGroup}
                        onFilterClick={onFilterClick}
                    />
                </React.Fragment>
            )
        }
    }

    return (
        <Layout>
            <Head>
               <title>Blinken OSA Archivum - Catalog</title>
            </Head>
            {renderPage()}
        </Layout>
    )
}

export default Search
