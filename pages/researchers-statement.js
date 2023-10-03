import React from "react";
import style from "./pages.module.scss";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";

export const getStaticProps = async () => {
    return { props: {} }
}

const ResearchersStatement = () => {
    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Researcher's Statement</title>
            </Head>
            <BreadcrumbSearch module={'staticPage'} />
            <div className={style.Page}>
                <div className={style.PageTitle}>
                    <h1>Researcher's Statement</h1>
                </div>
                <div className={style.StaticContent}>
                    <div>
                        <ol type={"I"}>
                            <li>
                                On the fair and lawful use of documents containing personal data in Blinken OSA Archivum.
                                <p>
                                    I have read and understand the following rules and statements (a. – f.)
                                    regarding Blinken OSA Archivum (OSA).
                                </p>
                                <ol type={'a'}>
                                    <li>
                                        The principal aim of the OSA is to make its holdings available for research. OSA respects the wishes of
                                        donors as well as the international norms concerning informational rights and freedoms.
                                    </li>
                                    <li>
                                        In the case of public figures or individuals performing public functions, personal data relating to such
                                        activities are subject to the main rule of openness. Therefore documents containing such data are freely
                                        available to researchers unless otherwise stipulated by the donor.
                                    </li>
                                    <li>
                                        Restrictions on the accessibility of documents which contain personal data concerning other individuals are
                                        given at the discretion of the donor, and OSA presumes that the access status of the documents has been
                                        correctly indicated. Therefore OSA itself restricts the availability of documents for research only if releasing
                                        them would clearly violate an individual's rights and legal interests.
                                    </li>
                                    <li>
                                        OSA is not responsible for checking the authenticity, accuracy, completeness and timeliness of data
                                        recorded in the documents. I understand that the documents prove only the fact that these data were
                                        preserved by the originator, keeper or donor of the documents.
                                    </li>
                                    <li>
                                        Some of OSA’s publicly available material might contain data which could infringe the rights and legal
                                        interests of the individuals concerned if publicized or used out of context. I hereby declare that I accept all
                                        legal and financial responsibility arising out of, or in connection with, this possible infringement of the rights
                                        and legal interests of individuals, and that to the greatest extent permitted by law, I will indemnify and
                                        defend OSA from and against all claims, damages, judgments, fines, penalties and costs arising out of, or in
                                        connection with, this possible infringement of the rights and legal interests of individuals.
                                    </li>
                                    <li>
                                        According to the ethical norms of scientific research and to the rules governing rights to information,
                                        accessibility does not automatically mean publicity. I declare that I am aware of my special obligation to
                                        respect the privacy rights of individuals in any publication of biographical data from unpublished sources
                                        contained in the Radio Free Europe/Radio Liberty Archives of OSA.
                                    </li>
                                </ol>
                            </li>
                            <li>
                                On the reproduction of copyrighted and non-copyrighted materials
                                <p>
                                    I, hereby declare that any usage of scanned or photographically reproduced material obtained from the holdings of
                                    the OSA will be used solely for non-commercial research and educational purposes in low resolution format. For
                                    exceptions to Hungarian and International Copyright Law please consult the applicable legislation. Any additional
                                    usage, publication, public projection, screening, performance is subject to permission, please submit request to the
                                    Senior Reference Archivist.
                                </p>
                            </li>
                            <li>
                                On the use of Parallel Archive
                                <p>
                                    I, hereby declare that any usage of scanned or photographically reproduced material obtained from the holdings of
                                    the OSA will be used solely for non-commercial research and educational purposes in low resolution format. For
                                    exceptions to Hungarian and International Copyright Law please consult the applicable legislation. Any additional
                                    usage, publication, public projection, screening, performance is subject to permission, please submit request to the
                                    Senior Reference Archivist.
                                </p>
                            </li>
                        </ol>

                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default ResearchersStatement;
