import Layout from "../components/layout/Layout";
import Head from "next/head";
import style from "./pages.module.scss";
import React from "react";
import { Media } from "../utils/media";
import LibraryCollectionPage from "../components/pages/library-collections/LibraryCollectionPage";
import {makeSolrParams} from "../utils/fetcherFunctions";
import {Buffer} from "buffer";
import LibraryCollectionPageV2 from "../components/pages/library-collections/LibraryCollectionPageV2";
import Error from "next/error";
import {filterAcceptedParams, getRejectedParamKeys} from "../utils/urlParamFunctions";

const SOLR_API = process.env.NEXT_PUBLIC_SOLR_STATS;

const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER;
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS;

export async function getServerSideProps(context) {
  const rejectedParams = getRejectedParamKeys(context.query)
  if (rejectedParams.length > 0) {
    context.res.statusCode = 400
    return { props: { errorCode: 400 } }
  }

  const params = filterAcceptedParams(context.query)
  const solrParams = makeSolrParams(params)

  solrParams.append('facet.sort', 'index')
  solrParams.append('fq', 'record_origin_facet:Library')

  // SOLR Basic Authentication
  let headers = new Headers();
  headers.set('Authorization', 'Basic ' + Buffer.from(SOLR_USER + ":" + SOLR_PASS).toString('base64'));

  const res = await fetch(`${SOLR_API}?` + solrParams, {
    headers: headers
  })

  const data = await res.json()
  return { props: { data } }
}

const LibrarySpecialCollections = ({data, errorCode}) => {
    if (errorCode) {
        return <Error statusCode={errorCode} title={'Invalid search parameters'} />
    }

    const libraryCollectionsFacet = data['facet_counts']['facet_fields']['library_collection_facet']
    const total = data['response']['numFound']

    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Library Special Collections</title>
            </Head>
            <Media lessThan="md">
                <div className={`${style.Page} ${style.Mobile}`}>
                    <div className={`${style.PageTitle} ${style.Mobile}`}>
                        <h1>Library Special Collections</h1>
                    </div>
                    <LibraryCollectionPageV2 data={libraryCollectionsFacet} total={total} isMobile={true} />
                </div>
            </Media>
            <Media greaterThanOrEqual="md">
                <div className={style.Page}>
                    <div className={style.PageTitle}>
                        <h1>Library Special Collections</h1>
                    </div>
                    <LibraryCollectionPageV2 data={libraryCollectionsFacet} total={total} />
                </div>
            </Media>
        </Layout>
    )
}

export default LibrarySpecialCollections;
