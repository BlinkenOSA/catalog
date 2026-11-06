import React from 'react';
import Link from "next/link";
import style from "./styles.module.scss"

const Catalog = () => {
    return (
        <React.Fragment>
            <div className={style.Title}>Blinken OSA Archivum’s Catalog</div>
            <div className={style.Text}>
                <p>
                    Search archival, library and film library records together in Blinken OSA Archivum’s catalog.
                    Where available, digital content is presented alongside detailed contextual descriptions.
                    Most descriptions are in English, while some are also available in the original language of the
                    materials, including Hungarian, Russian, Polish and Italian.
                </p>
                <p>
                    You can also explore the holdings through the following pages:
                </p>
                <h2>Archival Collections</h2>
                <p>
                    Browse fonds, subfonds and series in a tree showing the archival hierarchy. Select a theme to
                    narrow the tree, then select an entry to read a summary and open its description page. Visit
                    {' '}<Link href="/archival-collections"><a>Archival Collections</a></Link> to begin.
                </p>
                <h2>Library Special Collections</h2>
                <p>
                    Browse library materials by theme, donation or provenance on the
                    {' '}<Link href="/library-special-collections"><a>Library Special Collections</a></Link> page.
                    Select a collection to see its materials in the catalog.
                </p>
                <h2>Digital Image Gallery</h2>
                <p>
                    Browse images available through the catalog in the
                    {' '}<Link href="/image-gallery"><a>Digital Image Gallery</a></Link>. Use its search box and
                    filters for collection, year of creation, tags and geographical locations to narrow the results.
                </p>
            </div>
            <div className={style.Title}>Archival records and descriptions</div>
            <div className={style.Text}>
                <p>
                    The Archivum preserves textual records, audiovisual recordings, photographs and digital materials
                    in many languages. Our <a href="https://www.archivum.org/external/catalog">published catalog overview</a>
                    {' '}provides figures for the extent of the holdings. The archival collections cover the following
                    main themes:
                </p>
                <h2>Communism, the Cold War, and their Afterlives</h2>
                <p>
                    The largest collection in this area contains the records of the Radio Free Europe/Radio Liberty
                    (RFE/RL) Research Institute and its successor, the Open Media Research Institute. Their background
                    and reference materials document the political, social, economic and cultural history of Central
                    and Southeastern Europe after the Second World War. The collections include Radio Liberty
                    broadcasts, Soviet television monitoring and Soviet, Polish and Hungarian samizdat materials.
                </p>
                <h2>Human Rights and Social Justice</h2>
                <p>
                    These collections document human rights movements, violations and social justice worldwide.
                    They include records from international and local agencies, nongovernmental organizations and
                    individuals. Topics include genocide, war crimes, torture, rape and crimes against humanity,
                    as well as the rights and representation of refugees, Roma and other ethnic minorities,
                    LGBTQI+ communities and people with disabilities.
                </p>
                <h2>Central European University (CEU) and the Open Society Foundations (OSF) Network</h2>
                <p>
                    The Archivum is the official repository and historical archive of Central European University
                    (CEU) in Budapest and Vienna and the Open Society Foundations (OSF) network worldwide.
                    It preserves their permanent records.
                </p>
            </div>
            <div className={style.Title}>Library records</div>
            <div className={style.Text}>
                <p>
                    Blinken OSA Library is a reference library whose materials are available for consultation and
                    are not lent out. Its books cover the Cold War, Communism, international human rights, the history
                    of broadcasting and the archival profession. The library also holds newspapers and journals in
                    many languages, microforms and rare publications, including informal and regional press and
                    ephemera.
                </p>
                <p>
                    Library records come from our library system. Use the ‘Library Special Collection’ grouping to
                    explore materials from a particular donation, source or thematic collection. See
                    {' '}<a href="#organization-of-records">Organization of Records</a> for more about how library
                    and film library materials are organized.
                </p>
            </div>
            <div className={style.Title}>Film library records</div>
            <div className={style.Text}>
                <p>
                    Blinken OSA’s Film Library holds fiction and nonfiction works, including documentary, propaganda
                    and educational films, in almost 100 languages. Its main subjects include Soviet and East European
                    history and culture, the Cold War, Communism, totalitarianism, human rights abuses and war crimes.
                    The collection also includes films submitted to the Verzió International Human Rights Documentary
                    Film Festival. Materials are available for consultation and are not lent out.
                </p>
                <p>
                    Films come from individual donors, national film and television archives, and commercial
                    suppliers. Some have English subtitles; others are available only in their original languages.
                </p>
            </div>
        </React.Fragment>
    )
}

export default Catalog;
