import React from "react";
import style from "./pages.module.scss";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import dynamic from 'next/dynamic'
import { Media } from "../utils/media";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";


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
            <Media lessThan="md">
              <BreadcrumbSearchMobile module={'staticPage'} />
              <div className={`${style.Page} ${style.Mobile}`}>
                <div className={`${style.PageTitle} ${style.Mobile}`}>
                  <h1>Requests</h1>
                </div>
                <div className={`${style.FormContent} ${style.Mobile}`}>
                  <CartList isMobile={true} />
                  <CartForm isMobile={true} />
                </div>
              </div>
            </Media>
            <Media greaterThanOrEqual="md">
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
            </Media>
        </Layout>
    )
};

export default PrivacyPolicy;
