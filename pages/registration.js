import React from "react";
import style from "./pages.module.scss";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import BreadcrumbSearch from "../components/breadcrumbs/BreadcrumbSearch";
import RegistrationForm from "../components/registration/RegistrationForm";


const Registration = () => {
    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Registration</title>
            </Head>
            <BreadcrumbSearch module={'staticPage'} />
            <div className={style.Page}>
                <div className={style.PageTitle}>
                    <h1>Registration</h1>
                </div>
                <div>
                    <RegistrationForm />
                </div>
            </div>
        </Layout>
    )
};

export default Registration;
