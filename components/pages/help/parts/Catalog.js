import React from 'react';
import style from "./styles.module.scss"

const Catalog = () => {
    return (
        <React.Fragment>
            <div className={style.Title}>Blinken OSA Catalog</div>
            <div className={style.Text}>
                <p>
                    The Archivum’s catalog offers integrated search in cross-referenced archival, library and
                    film library records. Where available, digital content is presented along rich contextual
                    descriptions. While the primary language of the catalog is English, some of the
                    collections are described in their original language, including in Hungarian,
                    Russian, Polish and Italian.
                </p>
            </div>
            <div className={style.Title}>Archival descriptions</div>
            <div className={style.Text}>
                <p>
                    The Archivum’s textual and audiovisual materials come in analog and digital format and in
                    40+ languages. Altogether they comprise 10,000 linear meters, 17,000 hours of audiovisual,
                    and 15 TB of digital records, as well as 150,000 photographs on three main themes:
                </p>
                <h2>Communism, the Cold War, and their Afterlives</h2>
                <p>The largest collection on this topic is that of the Radio Free Europe/Radio Liberty (RFE/RL)
                    Research Institute and its successor, the Open Media Research Institute, consisting of
                    background and reference materials accumulated over 45 years of activity.
                    It is an essential source on the post-WWII political, social, economic, and cultural
                    history of the Central and Southeast European region, including, among others,
                    Radio Liberty broadcasts, Soviet television monitoring and unique Soviet,
                    Polish and Hungarian samizdat materials.</p>
                <h2>Human Rights and Social Justice</h2>
                <p>Collections comprise records from international and local agencies and non-governmental
                    organizations, as well as individuals active in documenting the history of human rights
                    movements and violations worldwide, including but not limited to genocide, war crimes,
                    torture, rape and crimes against humanity, as well as of the rights and representation of
                    marginalized, disadvantaged groups, such as refugees, the Roma, and other ethnic minorities,
                    the LGBTQI+ community or people with disabilities.</p>
                <h2>Central European University (CEU) and the Open Society Foundations (OSF) Network</h2>
                <p>The Archivum, the official repository and historical archives of the Central European University
                    (CEU) in Budapest and Vienna, as well as of the Open Society Foundations (OSF)
                    network globally, is responsible for the long-term preservation of the permanent records of
                    these entities.</p>
            </div>
            <div className={style.Title}>Library records</div>
            <div className={style.Text}>
                <p>
                    Blinken OSA Library houses a non-circulating reference library of books related to the Cold War,
                    Communism, international human rights, history of broadcasting and the archival profession
                    as well as a collection of more than 7.300 dailies and journals published from the 1950s
                    onwards in 40 languages. It also offers special thematic collections on microforms and
                    rare publications from the region including numerous titles of informal and regional
                    press and ephemera.
                </p>
            </div>
            <div className={style.Title}>Film library records</div>
            <div className={style.Text}>
                <p>
                    Blinken OSA’s non-circulating Film Library holds an unparalleled range of classic and rare fiction and
                    nonfiction works in almost 100 languages, among them documentary, propaganda, and educational
                    films related to Soviet and East European history and culture, focusing on the Cold War,
                    Communism, and totalitarianism, as well as international human rights abuses and war crimes.
                    The Library also contains all films submitted to the Verzio International Human Rights
                    Documentary Film Festival.<br/><br/>
                    Our films come from various sources, from individual donors, national film and television archives,
                    and public vendors. Some have English subtitles, while others are available only in their
                    original languages.
                </p>
            </div>
        </React.Fragment>
    )
}

export default Catalog;