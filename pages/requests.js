import React from "react";
import style from "./pages.module.scss";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import BreadcrumbSearch from "../components/breadcrumbs/BreadcrumbSearch";
import dynamic from 'next/dynamic'


const PrivacyPolicy = () => {
    const CartForm = dynamic(() => import('../components/cart/CartForm'), {
        ssr: false
    })

    const CartList = dynamic(() => import('../components/cart/CartList'), {
        ssr: false
    })

    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Requests</title>
            </Head>
            <BreadcrumbSearch module={'staticPage'} />
            <div className={style.Page}>
                <div className={style.PageTitle}>
                    <h1>Requests</h1>
                </div>
                <div className={style.FormContent}>
                    <CartForm />
                    <CartList />
                </div>
            </div>
        </Layout>
    )
};

export default PrivacyPolicy;
