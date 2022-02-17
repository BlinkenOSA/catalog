import Head from 'next/head'
import Layout from "../components/layout/Layout";
import BreadcrumbSearch from "../components/breadcrumbs/BreadcrumbSearch";
import ContentSearch from "../components/content/ContentSearch";
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

  const renderPage = () => {
      if (selectedFacetGroup === '') {
          return (
              <React.Fragment>
                  <BreadcrumbSearch module={''} />
                  <ContentSearch
                      onSelectFacetGroup={onSelectFacetGroup}
                  />
              </React.Fragment>
          )
      } else {
          return (
              <React.Fragment>
                  <BreadcrumbSearch inverse={true} module={''} />
                  <FacetPage
                      selectedFacetGroup={selectedFacetGroup}
                      onSelectFacetGroup={onSelectFacetGroup}
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
