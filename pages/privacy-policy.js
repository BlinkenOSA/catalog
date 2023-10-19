import React from "react";
import style from "./pages.module.scss";
import Layout from "../components/layout/Layout";
import Head from "next/head";

export const getStaticProps = async () => {
    return { props: {data: {}} }
}

const PrivacyPolicy = () => {
    return (
        <Layout>
            <Head>
                <title>Blinken OSA Archivum - Privacy Policy</title>
            </Head>
            <div className={style.Page}>
                <div className={style.PageTitle}>
                    <h1>Privacy Policy</h1>
                </div>
                <div className={style.StaticContent}>
                    <div>
                        <p>
                            The website Blinken OSA Catalog is operated by the Blinken OSA Arhcivum,
                            an organizational unit of Central European University (in
                            Hungarian: Közép-európai Egyetem), as part of its
                            domain <a href={'https://www.osaarchivum.org'} target={'_blank'}>www.osaarchivum.org</a>.
                            Blinken OSA informs its visitors herewith about its data processing practices, the
                            organizational and technical measures it introduced in order to protect personal data,
                            and the users’ possibilities for remedies.
                        </p>
                        <h2>1. Data Controller</h2>
                        <p>
                            Közép-európai Egyetem (registration number: FI 272861, seat: 1051 Budapest, Nádor u. 9.)
                        </p>
                        <h2>2. Data Protection Officer</h2>
                        <p>
                            The Data Protection Officer of Közép-európai Egyetem, concerning electronic documents,
                            is Szilárd Bedecs, IT Director; available in matters concerning data processing by
                            Blinken OSA
                            at <a href={'mailto:dataprotection@osaarchivum.org'}>dataprotection@osaarchivum.org</a>.
                        </p>
                        <h2>3. Scope of Processed Personal Data</h2>
                        <p>
                            Anyone can visit <a href={'https://catalog.osaarchivum.org'} target={'_blank'}>catalog.osaarchivum.org</a> without
                            providing any personal data beyond those recorded automatically and necessary
                            for technical reasons.
                        </p>
                        <p>
                            In order to maintain the technical connection, the
                            website <a href={'https://catalog.osaarchivum.org'} target={'_blank'}>catalog.osaarchivum.org</a> sends
                            so-called cookies to the user’s computer, and these are automatically deleted
                            when the browser is closed.<br/>
                            <a href={'https://catalog.osaarchivum.org'} target={'_blank'}>catalog.osaarchivum.org</a> lets Google Analytics,
                            YouTube and Twitter install cookies capable of individual identification on the user’s
                            computer. Google Analytics serves the purpose of analyzing the website’s visitor
                            statistics, while the connection with YouTube and Twitter is the consequence of making
                            Blinken OSA accessible through these services. Google, YouTube and Twitter are data
                            controllers independent from Blinken OSA, who – through the cookies installed by them –
                            can determine the users’ profile and analyze their activities on the Internet.<br/>
                            Visitors of <a href={'https://catalog.osaarchivum.org'} target={'_blank'}>catalog.osaarchivum.org</a> can
                            delete cookies installed on their computer any time during browsing.
                            Deleting the cookies installed by our website does not limit
                            the further use of the website, only search history is deleted on such occasions.
                        </p>
                        <h2>4. The Purpose of Data Processing</h2>
                        <p>
                            Recording and storing data relating to the time of the visit, the IP address and the data
                            of the browser and the operating system are characteristics of the system, processing
                            thereof is indispensable, and serves statistical purposes and ensures the availability
                            of the service.
                        </p>
                    </div>
                    <div>
                        <h2>5. The Legal Basis of Data Processing</h2>
                        <p>
                            In compliance with the provisions of Act CVIII of 2001 on Certain Aspects of Electronic
                            Commerce and Information Society Services, the data controller is authorized to process
                            personal data indispensable for providing the service. The operator of the website
                            processes data necessary for providing the service, for the necessary extent and time
                            period.
                        </p>
                        <h2>6. Period for Storing Personal Data</h2>
                        <p>
                            The personal data processed
                            by <a href={'https://catalog.osaarchivum.org'} target={'_blank'}>catalog.osaarchivum.org</a> (necessary
                            for maintaining the service technically) are automatically deleted when closing the browser, or within
                            one month the latest.
                        </p>
                        <h2>7. Scope of Those Accessing Personal Data</h2>
                        <p>
                            Access to data recorded in the course of the technical operating of the website are
                            accessible solely to staff members of the data controller. The operator of the
                            website does not employ intermediaries as data processors. The data controller does
                            not transfer personal data to third persons, except for transfers prescribed by law.
                            About cookies installed on the user’s computer by external data controllers, see
                            section 2 above. Please note that clickable web addresses (links) available on our
                            website, if not pointing to pages within the domain osaarchivum.org, belong to
                            the sphere of responsibility of other data controllers.
                        </p>
                        <h2>8. Data Security Measures</h2>
                        <p>
                            Personal data relating to visiting the website are stored on our own servers operating in
                            Blinken OSA’s server room, guarded 24 hours a day.
                        </p>
                        <h2>9. Rights of Users Relating to the Processing of Their Personal Data</h2>
                        <p>
                            If you find that the operator of the
                            website <a href={'https://catalog.osaarchivum.org'} target={'_blank'}>catalog.osaarchivum.org</a> has
                            infringed your rights to protection of personal data, please contact us
                            at <a href={'mailto:dataprotection@osaarchivum.org'}>dataprotection@osaarchivum.org</a>
                            so that we can redress the possible infringement.
                        </p>
                        <p>
                            We inform our users that they can file complaints at the National Authority for Data
                            Protection and Freedom of
                            Information (<a href={'https://www.naih.hu'} target={'_blank'}>www.naih.hu</a>) or
                            file a claim with a civil court.
                            The details of this and the data controller’s legal obligations are included in Act CXII
                            of 2011 on the Right of Informational Self-Determination and on Freedom of Information as
                            well as in Section 13/A of Act CVIII of 2001 on Certain Aspects of Electronic Commerce
                            and Information Society Services.
                        </p>
                        <p>
                            Should you need further information about the processing of personal data, please
                            contact us at <a href={'mailto:dataprotection@osaarchivum.org'}>dataprotection@osaarchivum.org</a>.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default PrivacyPolicy;
