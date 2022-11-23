import Layout from "../components/layout/Layout";
import Head from "next/head";
import style from "./pages.module.scss";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import React from "react";
import dynamic from "next/dynamic";
import { Media } from "../utils/media";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";


const ArchivalCollections = () => {
    const CollectionPage = dynamic(() => import('../components/pages/CollectionPage'), {
        ssr: false
    })

    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Archival Collections</title>
            </Head>
            <Media lessThan="md">
                <BreadcrumbSearchMobile module={'collections'} />
                <div className={`${style.Page} ${style.Mobile}`}>
                    <div className={`${style.PageTitle} ${style.Mobile}`}>
                        <h1>List of Fonds</h1>
                    </div>
                    <CollectionPage
                        isMobile={true}
                        showArchiveUnitDrawer={true}
                    />
                </div>
            </Media>
            <Media greaterThanOrEqual="md">
                <BreadcrumbSearch module={'collections'} />
                <div className={style.Page}>
                    <div className={style.PageTitle}>
                        <h1>List of Fonds</h1>
                    </div>
                    <CollectionPage
                        showArchiveUnitDrawer={true}
                    />
                </div>
            </Media>
        </Layout>
    )
}

export default ArchivalCollections;
