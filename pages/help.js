import Layout from "../components/layout/Layout";
import Head from "next/head";
import style from "./pages.module.scss";
import React from "react";
import { Media } from "../utils/media";
import HelpPage from "../components/pages/help/HelpPage";

export const getStaticProps = async () => {
    return { props: {data: {defaultSelected: 'catalog'}}}
}

const Help = ({data}) => {
    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Help</title>
            </Head>
            <Media lessThan="md">
                <div className={`${style.Page} ${style.Mobile}`}>
                    <div className={`${style.PageTitle} ${style.Mobile}`}>
                        <h1>Help</h1>
                    </div>
                    <HelpPage isMobile={true} defaultSelected={''} />
                </div>
            </Media>
            <Media greaterThanOrEqual="md">
                <div className={style.Page}>
                    <div className={style.PageTitle}>
                        <h1>Help</h1>
                    </div>
                    <HelpPage defaultSelected={data['defaultSelected']} />
                </div>
            </Media>
        </Layout>
    )
}

export default Help
