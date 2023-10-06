import React from "react";
import style from "./pages.module.scss";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import dynamic from 'next/dynamic'
import { Media } from "../utils/media";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";


const RequestsPage = () => {
    const CartForm = dynamic(() => import('../components/cart/CartForm'), {
        ssr: false
    })

    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Requests</title>
            </Head>
            <Media lessThan="md">
              <div className={`${style.Page} ${style.Mobile}`}>
                <div className={`${style.PageTitle} ${style.Mobile}`}>
                  <h1>Requests</h1>
                </div>
                <CartForm isMobile={true} />
              </div>
            </Media>
            <Media greaterThanOrEqual="md">
              <div className={style.Page}>
                  <div className={style.PageTitle}>
                      <h1>Requests</h1>
                  </div>
                  <CartForm />
              </div>
            </Media>
        </Layout>
    )
};

export default RequestsPage;
