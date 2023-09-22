import Layout from "../components/layout/Layout";
import Head from "next/head";
import style from "./pages.module.scss";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import React from "react";
import { Media } from "../utils/media";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
import LibraryCollectionPage from "../components/pages/library-collections/LibraryCollectionPage";


const LibrarySpecialCollections = () => {
    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Library Special Collections</title>
            </Head>
            <Media lessThan="md">
                <BreadcrumbSearchMobile module={'collections'} />
                <div className={`${style.Page} ${style.Mobile}`}>
                    <div className={`${style.PageTitle} ${style.Mobile}`}>
                        <h1>Library Special Collections</h1>
                    </div>
                    <LibraryCollectionPage isMobile={true} />
                </div>
            </Media>
            <Media greaterThanOrEqual="md">
                <BreadcrumbSearch module={'collections'} />
                <div className={style.Page}>
                    <div className={style.PageTitle}>
                        <h1>Library Special Collections</h1>
                    </div>
                    <LibraryCollectionPage />
                </div>
            </Media>
        </Layout>
    )
}

export default LibrarySpecialCollections;
