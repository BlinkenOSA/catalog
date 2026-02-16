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
                    <h1>Privacy Notice for the Blinken OSA Archivum’s Catalog</h1>
                </div>
                <div className={style.StaticContent}>
                    <div>
                        <p>
                            At Central European University Private University – CEU GmbH
                            (Quellenstraße 51, 1100 Vienna, Austria, hereinafter „University” or “CEU”)
                            we place great emphasis on the protection of your personal information and on compliance
                            with the applicable data privacy requirements, including specifically the EU General
                            Data Protection Regulation (GDPR*).
                        </p>
                        <p>
                            This privacy notice applies to the use, processing, and storage of personal data collected
                            in relation to the use of the Catalog of the Blinken OSA Archivum (hereinafter “Archivum”)
                            available at catalog.archivum.org (“hereinafter “Catalog”).<br/><br/>

                            <i>* Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April
                                2016 on the protection of natural persons with regard to the processing of
                                personal data and on the free movement of such data, and repealing directive
                                95/46/EC.</i>
                        </p>
                        <h2>1. Who we are and what we do</h2><br/>
                        <p>
                            The Archivum is a Budapest-based organizational unit of CEU. It is an archives that
                            collects, processes, preserves, and makes freely available archival materials from after
                            World War II until present times; an academic institution that conducts research and offers
                            university courses, research and teaching support, scholarships and internships, and
                            organizes academic events; and a cultural institution that aims to communicate its
                            archival and academic work, and the values that constitute the core of the Archivum’s
                            mission through regular exhibitions, an annual film festival, and other public events.
                        </p>
                        <h2>2. Data Controller</h2><br/>
                        <p>
                            <strong>Central European University Private University – CEU GmbH</strong><br/>
                            Quellenstraße 51, 1100 Vienna, Austria<br/>
                            E-mail: <a href={`mailto:privacy@ceu.edu`}>privacy@ceu.edu</a>
                        </p>
                        <h2>3. Data Protection Officer</h2><br/>
                        <p>
                            The data protection officer of Central European University is Rolf-Dieter Kargl
                            available at <a href={`mailto:privacy@ceu.edu`}>privacy@ceu.edu</a>.
                        </p>
                        <h2>4. Scope of Processed Personal Data</h2><br/>
                        <p>
                            Anyone can use the Catalog without providing any personal data.<br/><br/>

                            If users consent to the Catalog’s cookie policy, then their IP address, and
                            other data—such as the time of the visit or activity on the website—are recorded
                            for statistical purposes. The Catalog uses Google Analytics for the purpose of
                            analyzing the website’s visitor statistics.
                        </p>
                        <p>
                            If users register in the Catalog, the following personal data are required and will be
                            collected, processed, and stored:
                        </p>
                        <ul>
                            <li>Name</li>
                            <li>Address</li>
                            <li>E-mail address</li>
                            <li>Affiliation</li>
                            <li>Employment type (if relevant)</li>
                            <li>Department and degree course (if relevant)</li>
                            <li>Research theme</li>
                        </ul>
                        <p>
                            Exceptionally, when following registration further authentication is deemed necessary,
                            or when users request access to restricted materials, the following data may also be
                            collected from the user following registration, via email correspondence:
                        </p>
                        <ul>
                            <li>Phone number</li>
                            <li>Research project</li>
                            <li>Planned publication</li>
                            <li>Supervisor’s contact details</li>
                        </ul>
                        <h2>5. The Purpose of Data Processing</h2><br/>
                        <p>
                            5.1. Recording and storing data relating to the user statistics—such as the time of the
                            visit on the website, the IP address, the operating system used—serves statistical
                            purposes and the improvement of the services provided by the Archivum.
                        </p>
                        <p>
                            5.2. In the case of registered users, the collection, processing, and storage of personal
                            data serves the purposes of ensuring the authenticity of the user registration;
                            contacting the registered user about the requests received through the Catalog;
                            ensuring that the provided materials are only accessible to the registered user.
                        </p>
                    </div>
                    <div>
                        <h2>6. The Legal Basis of Data Processing </h2><br/>
                        <p>
                            Data processing is based on Article 6 (1) (a) and (f) of the GDPR.
                        </p>
                        <p>
                            According to Article 6 (1) (a) of the GDPR, the legal basis for data processing is the
                            consent of the data subject. The Catalog can be viewed and searched without providing
                            personal data. Access to certain digitized content and to our digitization on demand
                            service requires registration, where personal data is collected with the consent of
                            the uses. All users are entitled to withdraw their consent at any time.
                        </p>
                        <p>
                            According to Article 6 (1) (f) of the GDPR the legal basis of data processing is the
                            legitimate interest of the data controller. The Archivum has a legitimate interest in
                            ensuring the authenticity of the registrations and in communicating with the users
                            about their requests.
                        </p>
                        <h2>7. Period for Storing Personal Data</h2><br/>
                        <p>
                            We process personal data provided during the registration until the user’s consent is
                            withdrawn or we find the data inaccurate.
                        </p>
                        <h2>8. Scope of Those Accessing Personal Data</h2><br/>
                        <p>
                            We will not disclose personal data to third parties unless we have a legal obligation or
                            if the user consented explicitly to it.
                        </p>
                        <p>
                            For the proper performance of the activities set out in section 5, we may need to pass on
                            information to our third-party service provider(s) acting as data processors, as follows:
                        </p>
                        <ul>
                            <li><strong>Microsoft Office 365:</strong> email and document management SaaS services;
                                the University’s data stored within the EU (Amsterdam and Dublin).
                            </li>
                        </ul>
                        <p>Data about a user’s activity on the website is collected following consent by:</p>
                        <ul>
                            <li><strong>Google Analytics:</strong> a service collecting information about how
                                visitors use our website, which is processed in accordance with Google’s privacy policy.
                            </li>
                        </ul>
                        <h2>9. Rights of Users Relating to the Processing of Their Personal Data</h2><br/>
                        <p>
                            Users have the right
                        </p>
                        <ul>
                            <li>to access their personal data,</li>
                            <li>to object to the processing of their personal data,</li>
                            <li>to rectify,</li>
                            <li>to erase and</li>
                            <li>to restrict processing their personal data</li>
                            <li>to withdraw their consent at any time</li>
                            <li>to an effective legal remedy.</li>
                        </ul>
                        <p>
                            If a user wishes to exercise any of these rights, they may email  privacy@ceu.edu or write
                            to us at University Data Protection Officer, Nádor utca 9, 1051 Budapest, Hungary.
                        </p>
                        <p>
                            The University will make every effort to fulfill their request to the extent allowed by law
                            and will respond in writing within 25 days of receiving your request.
                        </p>
                        <p>
                            Should a user need further information about the processing of personal data, please contact
                            us at <a href={'mailto:archivum@ceu.edu'}>archivum@ceu.edu.</a>
                        </p>
                        <p>
                            Should a user wish to request help from the relevant national authority, their details
                            are as follows:
                        </p>
                        <p>
                            <strong>Nemzeti Adatvédelmi és Információszabadság Hatóság</strong><br/><br/>

                            1363 Budapest, Pf.: 9.<br/>
                            Phone: +36-1-3911400<br/>
                            e-mail: <a href={'mailto:ugyfelszolgalat@naih.hu'}>ugyfelszolgalat@naih.hu</a><br/>
                            Web: <a href={'https://naih.hu'} target={'_blank'}>https://naih.hu</a>
                        </p>
                        <p>
                            In addition to the legal remedy, users have the right to apply to the court against the
                            activities of data controller. In Hungary, at the data subject’s request, the action may
                            be brought before the court that is competent based on the domicile or the place of
                            residence of the data subject.
                        </p>
                        <h2>10. Security of your information</h2>
                        <p>
                            We are committed to holding your data securely and treating it with sensitivity.
                            All data are held securely and in accordance with the relevant data privacy laws and our
                            internal policies. We do not sell to or trade your data with any other organizations.
                        </p>
                        <p>
                            If we modify this Privacy Notice at some time in the future, we will post the new version
                            on our website.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default PrivacyPolicy;
