import React from "react";
import style from "./pages.module.scss";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import RegistrationForm from "../components/registration/desktop/RegistrationForm";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
import { Media } from "../utils/media";
import RegistrationFormMobile from "../components/registration/mobile/RegistrationFormMobile";

export const getStaticProps = async () => {
  return { props: {} }
}

const Registration = () => {
    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Registration</title>
            </Head>
            <Media lessThan="md">
                <BreadcrumbSearchMobile module={'staticPage'} />
                <div className={`${style.Page} ${style.Mobile}`}>
                    <div className={`${style.PageTitle} ${style.Mobile}`}>
                        <h1>Registration</h1>
                    </div>
                    <div>
                        <RegistrationFormMobile />
                    </div>
                </div>
            </Media>
            <Media greaterThanOrEqual="md">
                <BreadcrumbSearch module={'staticPage'} />
                <div className={style.Page}>
                    <div className={style.PageTitle}>
                        <h1>Registration</h1>
                    </div>
                    <div>
                        <RegistrationForm />
                    </div>
                </div>
            </Media>
        </Layout>
    )
};

export default Registration;
