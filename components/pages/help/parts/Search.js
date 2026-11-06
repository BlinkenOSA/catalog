import React from 'react';
import style from "./styles.module.scss"
import {FiInfo} from "react-icons/fi";
import {AiOutlineClose} from "react-icons/ai";

const Search = () => {
    return (
        <React.Fragment>
            <div className={style.Title}>Searching the catalog</div>
            <div className={style.Text}>
                <p>
                    A catalog search looks for your search terms in descriptions of archival, library and film library
                    materials. It searches the recorded descriptive information, also called metadata, rather than the
                    full text of digital documents or the contents of audio and video files. You can narrow your
                    results using filters, also known as facets.
                </p>
                <p>
                    The search engine uses language-specific rules for English, Hungarian, Russian and Polish.
                    Titles and summaries in other languages can also be searched where they are included in the
                    catalog description.
                </p>
                <p>
                    Searches cover the following information, where recorded:
                </p>
                <ul>
                    <li>Titles</li>
                    <li>Contents summaries</li>
                    <li>Reference codes and call numbers</li>
                    <li>Subjects</li>
                    <li>Contributors</li>
                    <li>Keywords and tags</li>
                    <li>Geographical locations</li>
                </ul>
                <p>
                    Results are ordered by relevance: how closely the recorded descriptions match your search terms.
                    Matches in titles, contents summaries, reference codes and call numbers receive greater emphasis
                    than matches in subjects, contributors, keywords and geographical locations.
                </p>
            </div>
            <div className={style.Title}>Filtering search results</div>
            <div className={style.Text}>
                <p>
                    Filters reflect the information recorded in catalog descriptions. Materials may discuss a person
                    or place even when no corresponding subject or location entry has been assigned. A record without
                    that entry will not appear when you apply the corresponding filter.
                </p>
                <p>
                    For example, a subject filter showing five records for a person means that five records in your
                    current results have that person assigned as a subject. Other materials in the results may also
                    mention the person.
                </p>
                <p>
                    The following filters can be selected:
                </p>
                <h2>Record Type</h2>
                <p>Filters by the type of material or level of archival description.</p>
                <h2>Creation Date</h2>
                <p>
                    Use the slider to select a range of creation years. The filter narrows your results to records
                    with recorded creation years within that range. Records without an indexed creation year are
                    excluded when this filter is applied. The accompanying graph shows the distribution of recorded
                    creation years.
                </p>
                <h2>Language</h2>
                <p>
                    Filters by the languages recorded for the material. For moving images, these may include the
                    languages of dubbing, voice-over and subtitles.
                </p>
                <h2>Subjects</h2>
                <p>
                    Filters by the people, organizations or topics that the material concerns, where these have been
                    assigned as subjects.
                </p>
                <h2>Contributors</h2>
                <p>
                    Filters by people or organizations involved in creating the material, such as authors, crew
                    members, publishers and producers.
                </p>
                <h2>Geo Locations</h2>
                <p>
                    Filters by places associated with the material, such as countries or cities.
                </p>
                <h2>Record Origin</h2>
                <p>
                    Filters by the source collection, such as Archives, Library or Film Library.
                </p>
                <h2>Availability</h2>
                <p>
                    Filters by how materials can be accessed. See <a href="#request-and-access">Request and access</a>
                    {' '}for an explanation of the access options.
                </p>
                <p>
                    Where an <FiInfo/> icon appears beside a filter value, you can open additional information from
                    Wikidata. Some filter lists also have a search box at the top to help you find a value.
                </p>
                <p>
                    After selecting your filters, click <span className={style.ShowButton}>Show</span> to close the
                    filter panel and return to your results. To remove a filter, click the
                    {' '}<AiOutlineClose size={14}/> icon beside it in the header.
                </p>
            </div>
        </React.Fragment>
    )
}

export default Search;
