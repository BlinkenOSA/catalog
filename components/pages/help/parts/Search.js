import React from 'react';
import style from "./styles.module.scss"
import {FiInfo} from "react-icons/fi";
import {AiOutlineClose, AiOutlineRight} from "react-icons/ai";

const Search = () => {
    return (
        <React.Fragment>
            <div className={style.Title}>Query search</div>
            <div className={style.Text}>
                <p>
                    When you search, the search term you enter is searched through all types of records in the catalog.
                    You have the option of filtering search results using predefined filters (also known as facets). Our
                    catalog currently only searches metadata fields, it DOES NOT include full text search in digital
                    records (documents, audio, and video files). The search engine is language-aware, that is, it
                    searches according to the language rules of the currently supported languages, which are English,
                    Hungarian, Russian, and Polish.
                </p>
                <p>
                    The results of a search are sorted according to the relevance score of the search engine. Each field
                    has a different weight when the search engine calculates relevance. When you search the archives,
                    the following metadata fields will be searched, with the weights in parentheses:
                    <ul>
                        <li>Title (in all supported language) [100]</li>
                        <li>Contents summary (in all supported language) [100]</li>
                        <li>Reference code and call number [100]</li>
                        <li>Subject entries [50]</li>
                        <li>Contributor entries [50]</li>
                        <li>Geographical locations [50]</li>
                    </ul>
                </p>
            </div>
            <div className={style.Title}>Filtering search results</div>
            <div className={style.Text}>
                <p>
                    Once your search is complete, you can filter results using pre-defined filter options. Please note
                    that filters will only show you filter values in records where such values have been assigned by the
                    cataloguer. Only a relatively small number of records has been described using all, or some, of this
                    additional metadata. However, we strive to describe document collections in as much detail as
                    possible and also enrich the metadata of already existent collections.
                </p>
                <p>
                    For example, if you see that there are only 5 records in your query result set that mention a
                    particular person as a subject, this simply means that of the results, 5 records have that person
                    record assigned as a subject.
                </p>
                <p>
                    The following filters can be selected:
                </p>
                <h2>Record Type</h2>
                <p>The type / physical nature of a record.</p>
                <h2>Creation Date</h2>
                <p>
                    A slider that allows you to select the date range of the creation date. As this data is mandatorily
                    recorded for each item or document folder, this filter covers all the records in the catalog. A
                    graph indicates the distribution of creation date values.
                </p>
                <h2>Language</h2>
                <p>
                    The original language of the material. For moving images this also includes dubbing, voice-over, and
                    subtitles.
                </p>
                <h2>Subject</h2>
                <p>
                    A person, corporation / institution or a term being discussed, described, or dealt with in a
                    described archival holding.
                </p>
                <h2>Contributors</h2>
                <p>
                    A person, corporation / institution who took part in creating the archival holding. Authors, crew
                    members, publishers, producers.
                </p>
                <h2>Geo Locations</h2>
                <p>
                    The spatial coverage of a record. It can be a country, a city or any other geographical location.
                </p>
                <h2>Record Origin</h2>
                <p>
                    Shows you where the listed record originates from. You can select one of the three major databases
                    of the catalog: archives, library, or film library.
                </p>
                <h2>Availability</h2>
                <p>
                    These values help you differentiate between various access methods. For further information please
                    refer to the ‘Request and access’ chapter in this guide.
                </p>
                <p>
                    A click on the <FiInfo/> icon icon next to the filter (where applicable) takes you to a short
                    explanatory datasheet fed from Wikidata. Some filters are existing as a large list, some of them can
                    also be searched with a quick search box displayed on the top of the filter list.
                </p>
                <p>
                    Once you have selected all the applicable filters, click on the <div
                    className={style.ShowButton}>Show</div> button in the top right corner or click again on the
                    selected filter to close the filter window and return to your results list.
                    Filters can be removed one at a time by clicking on the <AiOutlineClose size={14}/> icon shown next
                    to the selected filter(s) displayed in the header.
                </p>
            </div>
        </React.Fragment>
    )
}

export default Search;