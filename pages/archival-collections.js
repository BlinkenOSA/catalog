import Layout from "../components/layout/Layout";
import Head from "next/head";
import style from "./pages.module.scss";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import React from "react";
import { Media } from "../utils/media";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
import CollectionPage from "../components/pages/CollectionPage";
export const API = process.env.NEXT_PUBLIC_AMS_API;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${API}archival-units-tree/all/`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}

const ArchivalCollections = ({data}) => {
    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Archival Collections</title>
            </Head>
            <Media lessThan="md">
                <BreadcrumbSearchMobile module={'collections'} />
                <div className={`${style.Page} ${style.Mobile}`}>
                    <div className={`${style.PageTitle} ${style.Mobile}`}>
                        <h1>Archival Collections</h1>
                    </div>
                    <CollectionPage
                        isMobile={true}
                        showArchiveUnitDrawer={true}
                        data={data}
                    />
                </div>
            </Media>
            <Media greaterThanOrEqual="md">
                <BreadcrumbSearch module={'collections'} />
                <div className={style.Page}>
                    <div className={style.PageTitle}>
                        <h1>Archival Collections</h1>
                    </div>
                    <CollectionPage
                        showArchiveUnitDrawer={true}
                        data={data}
                    />
                </div>
            </Media>
        </Layout>
    )
}

export default ArchivalCollections;
