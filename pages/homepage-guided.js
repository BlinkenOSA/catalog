import Head from "next/head";
import React from "react";
import {Buffer} from "buffer";
import ConceptHeader from "../components/pages/front-page-concepts/ConceptHeader";
import HierarchyGuide from "../components/pages/front-page-concepts/HierarchyGuide";
import HomeSearch from "../components/pages/front-page-concepts/HomeSearch";
import style from "../components/pages/front-page-concepts/FrontPageConcepts.module.scss";

const suggestedSearches = ['Radio Free Europe', 'samizdat', 'human rights'];

const SOLR_API = process.env.NEXT_PUBLIC_SOLR;
const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER;
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS;

const formatCount = (count) => new Intl.NumberFormat('en-US').format(count);

const getSolrQueryEndpoint = () => {
    const endpoint = new URL(SOLR_API);
    endpoint.pathname = endpoint.pathname.replace(/\/(select|stats)\/?$/, '/query');
    endpoint.search = '';
    endpoint.hash = '';
    return endpoint.toString();
};

export async function getServerSideProps(context) {
    const requestBody = {
        query: '*:*',
        limit: 0,
        facet: {
            fonds: {type: 'query', q: 'description_level_facet:"Fonds"'},
            publications: {type: 'query', q: 'primary_type_facet:("Book" OR "Continuing Resource")'},
            films: {type: 'query', q: 'record_origin_facet:"Film Library"'},
        },
    };

    try {
        const response = await fetch(getSolrQueryEndpoint(), {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${SOLR_USER}:${SOLR_PASS}`).toString('base64'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
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
        text: 'Records created and accumulated by people and organizations, described in context from fonds and subfonds through series, containers, folders, and items.',
        action: 'View all archival records',
        secondaryHref: '/archival-collections',
        secondaryAction: 'Browse the archival hierarchy',
    },
    {
        href: '/?record_origin=Library',
        icon: '/icons/BookIconBlack.svg',
        title: 'Library',
        text: 'A non-circulating reference library of books—including long-discarded titles—plus 6,500+ dailies and journals, regional press, gray literature, ephemera, and donated collections.',
        action: 'View all Library records',
        secondaryHref: '/library-special-collections',
        secondaryAction: 'Browse Library special collections',
    },
    {
        href: '/?record_origin=Film+Library',
        icon: '/icons/TypeMovingImage.svg',
        invertIcon: true,
        title: 'Film Library',
        text: 'Classic and rare fiction and nonfiction films in almost 100 languages, including documentary, propaganda, and educational works, as well as every film submitted to the Verzio festival.',
        action: 'View all Film Library records',
        note: 'Some films have English subtitles; others are available only in their original languages.',
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
                        <p className={style.GuidedLead}>
                            Search a name, place, organization, or subject—or browse the collections as archivists have arranged them.
                        </p>
                    </div>
                    <div>
                        <HomeSearch className={style.SearchForm} />
                        <div className={style.SuggestedSearches} aria-label="Suggested searches">
                            <span>Try:</span>
                            {suggestedSearches.map((search) => (
                                <a href={`/?query=${encodeURIComponent(search)}`} key={search}>{search}</a>
                            ))}
                        </div>
                    </div>
                </div>
                <aside className={style.GuidedAside} aria-labelledby="hierarchy-title">
                    <p className={style.Eyebrow}>How an archive is organized</p>
                    <h2 id="hierarchy-title">From the whole collection to a single record</h2>
                    <p>Archival descriptions form a hierarchy. Start broad for context, then open each level to move toward individual material.</p>
                    <HierarchyGuide />
                    <a className={style.GuideLink} href="/researchers-guide">
                        Learn how to use the catalog <span aria-hidden="true">→</span>
                    </a>
                </aside>
            </section>

            <section className={style.BrowseSection} aria-labelledby="browse-heading">
                <header>
                    <p className={style.Eyebrow}>Three collections, one search</p>
                    <h2 id="browse-heading">What&apos;s in this catalog?</h2>
                    <p className={style.BrowseIntro}>The catalog provides a common search and discovery interface for records from the Archives, Library, and Film Library.</p>
                    {quickFacts && (
                        <dl className={style.QuickFacts} aria-label="Catalog statistics">
                            <div>
                                <dt>Total records</dt>
                                <dd>{formatCount(quickFacts.totalRecords)}</dd>
                            </div>
                            <div>
                                <dt>Fonds</dt>
                                <dd>{formatCount(quickFacts.fonds)}</dd>
                            </div>
                            <div>
                                <dt>Books &amp; journals</dt>
                                <dd>{formatCount(quickFacts.publications)}</dd>
                            </div>
                            <div>
                                <dt>Film Library records</dt>
                                <dd>{formatCount(quickFacts.films)}</dd>
                            </div>
                        </dl>
                    )}
                </header>
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
                            {path.note && <p className={style.PathNote}>{path.note}</p>}
                            <div className={style.PathActions}>
                                <a className={style.PathPrimaryAction} href={path.href}>{path.action} →</a>
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
