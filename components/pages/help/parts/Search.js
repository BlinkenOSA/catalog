import React from 'react';
import style from "./styles.module.scss"
import {FiInfo} from "react-icons/fi";
import {facetConfig} from "../../../../config/facetConfig";
import {AiOutlineClose, AiOutlineRight} from "react-icons/ai";

const Search = () => {
    return (
        <React.Fragment>
            <div className={style.Title}>Query search</div>
            <div className={style.Text}>
                <p>
                    When you search, the search term you enter is searched through all types of records in the catalogue.
                    After the search, you have the option of filtering the search results using the predefined
                    filters (also known as facets). It's important to note that our catalog currently only
                    searches metadata fields, it DOES NOT include full text search in digital objects
                    (documents, audio and video files). The search engine is language-aware, it tries to search
                    according to the language rules of the currently supported languages, which are: English,
                    Hungarian, Russian, Polish
                </p>
                <p>

                    The results of a search are sorted according to the relevance score of the search engine.
                    Each field has a different weight when the search engine calculates relevance.
                    When you search the archives, the query term will search the following metadata fields,
                    with the weights in parentheses:
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
            <div className={style.Title}>Filtering the results</div>
            <div className={style.Text}>
                <p>
                    Once your search is complete, you can filter the results using the pre-defined filter options.
                    Please note that these filters will only show you filter values from records where these values
                    have been assigned by the cataloguer. Despite our efforts to describe materials in as much detail
                    as possible, only a small number of records use these additional metadata fields.
                </p>
                <p>
                    Just an example. If you see that there are only 5 records in your query result set that mention
                    a particular person as a subject, this simply means that of the results, 5 records have that
                    person record assigned as a subject.
                </p>
                <p>
                    The following filters can be selected:
                </p>
                <h2>Record Type</h2>
                <p>The type / physical nature of a record. These are the same values that are explained in this chapter.</p>
                <h2>Creation Date</h2>
                <p>
                    A slider that allows you to select the date range of the creation date. As this data is mandatory
                    for each record, this filter covers all records in the catalogue. A graph helps you to visualise
                    the distribution of the creation date values.
                </p>
                <h2>Language</h2>
                <p>
                    The original language of the material. In case of moving images, all the additional dubbings,
                    voice-overs and subtitles.
                </p>
                <h2>Subject</h2>
                <p>
                    A person, corporation / institution or a term is being discussed, described, or dealt with in a
                    described archival holding.
                </p>
                <h2>Contributors</h2>
                <p>
                    A person, corporation / institution who took part in creating the archival holding.
                    Authors, crew members, publishers, producers.
                </p>
                <h2>Geo Locations</h2>
                <p>
                    The spatial coverage of a record. It can be a country, a city or any other geographical location.
                </p>
                <h2>Record Origin</h2>
                <p>
                    Shows you from where the listed record is originating from. The value is one of the three major
                    databases of the catalog: archives, library or film library.
                </p>
                <h2>Availability</h2>
                <p>
                    As discussed in the 'Request and access rights' section, these values help you to differentiate
                    between the various access methods to the records when you request them.
                </p>
                <p>
                    If you click on the <FiInfo /> icon next to the filter (where applicable) a short explanatory
                    datasheet (fed from Wikidata) will appear. Some filters are exising as a large list, some of them
                    can also be searched with a quick searchbox displayed on the top of the filter list.
                </p>
                <p>
                    When you have selected all the filters, click on the button at the top right
                    corner: <div className={style.ShowButton}>Show</div> or click again on the selected filter to
                    close the filter window and return to the results list. Filters can be removed one at a time
                    by clicking on the <AiOutlineClose size={14} /> icon in the header, where selected filters are displayed.
                </p>
            </div>
        </React.Fragment>
    )
}

export default Search;