import Layout from "../components/layout/Layout";
import Head from "next/head";
import style from "./pages.module.scss";
import BreadcrumbSearch from "../components/breadcrumbs/BreadcrumbSearch";
import React from "react";
import dynamic from "next/dynamic";


const ArchivalCollections = () => {
    const CollectionPage = dynamic(() => import('../components/content/CollectionPage'), {
        ssr: false
    })

    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Archival Collections</title>
            </Head>
            <BreadcrumbSearch module={'collections'} />
            <div className={style.Page}>
                <div className={style.PageTitle}>
                    <h1>List of Fonds</h1>
                </div>
                <CollectionPage/>
            </div>
        </Layout>
    )
}

export default ArchivalCollections;
