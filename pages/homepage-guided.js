import Head from "next/head";
import React from "react";
import {Buffer} from "buffer";
import ConceptHeader from "../components/pages/front-page-concepts/ConceptHeader";
import HierarchyGuide from "../components/pages/front-page-concepts/HierarchyGuide";
import HomeSearch from "../components/pages/front-page-concepts/HomeSearch";
import Button from "../components/pages/search/parts/Button";
import style from "../components/pages/front-page-concepts/FrontPageConcepts.module.scss";

const SOLR_API = process.env.NEXT_PUBLIC_SOLR;
const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER;
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS;

const formatCount = (count) => Number.isSafeInteger(count)
    ? new Intl.NumberFormat('en-US').format(count)
    : 'N/A';

export async function getServerSideProps(context) {
    const facets = {
        fonds: {type: 'query', q: 'description_level_facet:"Fonds"'},
        publications: {type: 'query', q: 'primary_type_facet:("Book" OR "Continuing Resource")'},
        films: {type: 'query', q: 'record_origin_facet:"Film Library"'},
    };

    try {
        const endpoint = new URL(SOLR_API);
        endpoint.searchParams.set('q', '*:*');
        endpoint.searchParams.set('rows', '0');
        endpoint.searchParams.set('wt', 'json');
        endpoint.searchParams.set('json.facet', JSON.stringify(facets));
        const response = await fetch(endpoint, {
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${SOLR_USER}:${SOLR_PASS}`).toString('base64'),
            },
        });

        if (!response.ok) {
            throw new Error(`SOLR request failed with status ${response.status}`);
        }

        const data = await response.json();
        context.res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=86400');

        return {
            props: {
                quickFacts: {
                    totalRecords: data.response.numFound,
                    fonds: data.facets.fonds.count,
                    publications: data.facets.publications.count,
                    films: data.facets.films.count,
                },
            },
        };
    } catch (error) {
        console.error('SOLR homepage statistics request failed:', error);
        return {props: {quickFacts: null}};
    }
}

const paths = [
    {
        href: '/?record_origin=Archives',
        icon: '/icons/ArchivalUnitBlack.svg',
        title: 'Archives',
        text: 'Records from people and organizations, described in context from fonds to individual files and items.',
        action: 'View all archival records',
        secondaryHref: '/archival-collections',
        secondaryAction: 'Browse Archival Collections',
    },
    {
        href: '/?record_origin=Library',
        icon: '/icons/BookIconBlack.svg',
        title: 'Library',
        text: 'A reference collection of books, newspapers, journals, gray literature, and ephemera, available for on-site use.',
        action: 'View all Library records',
        secondaryHref: '/library-special-collections',
        secondaryAction: 'Browse Library special collections',
    },
    {
        href: '/?record_origin=Film+Library',
        icon: '/icons/TypeMovingImage.svg',
        invertIcon: true,
        title: 'Film Library',
        text: 'Documentaries in almost 100 languages including Verzio Film Festival entries.',
        action: 'View all Film Library records',
    },
];

const GuidedHomepage = ({quickFacts}) => (
    <div className={style.ConceptPage}>
        <Head>
            <title>Front page concept 01 — Guided paths</title>
            <meta name="description" content="A guided, task-led front page concept for the Blinken OSA Archivum catalog." />
        </Head>
        <ConceptHeader />
        <main>
            <section className={style.GuidedHero} aria-labelledby="guided-title">
                <div className={style.GuidedIntro}>
                    <div>
                        <p className={style.Eyebrow}>Integrated archival, library, and film catalog</p>
                        <h1 id="guided-title" className={style.GuidedTitle}>
                            Start with what <em>you know.</em>
                        </h1>
                    </div>
                    <div>
                        <HomeSearch className={style.SearchForm} />
                        <p className={style.GuidedBrowse}>
                            <a href="/archival-collections">Browse the archival collections</a>
                            {' · Explore the collections as archivists arranged them.'}
                        </p>
                    </div>
                    <header className={style.BrowseHeader}>
                        <p className={style.Eyebrow}>Three collections, one search</p>
                        <h2 id="browse-heading">What&apos;s in this catalog?</h2>
                        <p className={style.BrowseIntro}>Explore records from the Archives, Library, and Film Library.</p>
                        <dl className={style.QuickFacts} aria-label="Catalog statistics">
                            <div>
                                <dt>Total records</dt>
                                <dd>{formatCount(quickFacts?.totalRecords)}</dd>
                            </div>
                            <div>
                                <dt>Fonds</dt>
                                <dd>{formatCount(quickFacts?.fonds)}</dd>
                            </div>
                            <div>
                                <dt>Books &amp; journals</dt>
                                <dd>{formatCount(quickFacts?.publications)}</dd>
                            </div>
                            <div>
                                <dt>Film Library records</dt>
                                <dd>{formatCount(quickFacts?.films)}</dd>
                            </div>
                        </dl>
                    </header>
                </div>
                <aside className={style.GuidedAside} aria-labelledby="hierarchy-title">
                    <p className={style.Eyebrow}>How an archive is organized</p>
                    <h2 id="hierarchy-title">From collection to file or item</h2>
                    <p>Archival arrangement is hierarchical. Start broad for context, then move down through the levels to find individual records.</p>
                    <HierarchyGuide />
                    <Button link="/researchers-guide" text="How to use the catalog" theme="dark"
                            linkClassName={`${style.GuideLink} ${style.ButtonLink}`} />
                </aside>
            </section>

            <section className={style.BrowseSection} aria-labelledby="browse-heading">
                <div className={style.PathGrid}>
                    {paths.map((path) => (
                        <article className={style.PathCard} key={path.title}>
                            <div className={style.PathCardHeader}>
                                <img
                                    src={path.icon}
                                    alt=""
                                    className={path.invertIcon ? style.InvertedIcon : undefined}
                                />
                            </div>
                            <h3>{path.title}</h3>
                            <p>{path.text}</p>
                            <div className={style.PathActions}>
                                <Button link={path.href} text={`${path.action} →`} theme="dark"
                                        linkClassName={style.ButtonLink} />
                                {path.secondaryHref && (
                                    <a className={style.PathSecondaryAction} href={path.secondaryHref}>
                                        {path.secondaryAction} ↗
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    </div>
);

export default GuidedHomepage;
