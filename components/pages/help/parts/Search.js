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
                    By searching the search term you entered is going through all types of records in the catalog.
                    After searching you have the chance to filter the search results with the pre-defined filters (also
                    known as facets). It's important to mention, that currently our catalog is searching only in the
                    metadata fields, it DOES NOT include full-text search in digital objects (documents, audio and video files).
                    The search engine is language aware it tries to do search regarding the language rules of the currently
                    supported languages, which are: english, Hungarian,
                </p>
                <p>
                    The results of a search are sorted by the relevancy score of the search engine. Each field counts with
                    a different weight when the search engine calculates relevancy. When you search the archives,
                    the query term is searching through the following metadata fields with the weights displayed in brackets:
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
                    Following the search, you have the option to filter the resultset with the pre-defined filter options.
                    Please be aware that these filters are only showing you filter values from records, where these
                    values were assigned by the cataloguer. Despite our effort trying to describe materials as detailed
                    as we can, only a smaller amount of records are using these extra metadata fields.
                </p>
                <p>
                    Just as an example. If you see that in your query resultset there are only 5 records mentioning a
                    certain person as subject, it only means, that out of the results, 5 records has this person record
                    assigned as subject.
                </p>
                <p>
                    The following filters can be selected:
                </p>
                <h2>Record Type</h2>
                <p>The type / physical nature of a record. These are the same values that are explained in this chapter.</p>
                <h2>Creation Date</h2>
                <p>
                    A slider helping you to select the date range of creation date. Since this data is mandatory for each
                    record, this filter covers all the records in the catalog. A chart helps you visaulize the distribution
                    of creation date values.
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
                    As discussed in the 'Request and access rights' section, these values are helping you to differentiate
                    the various access methods for the records when you request them.
                </p>
                <p>
                    If you click the <FiInfo /> icon next to the filter (where applicable) a short explanatory
                    data sheet (fed from Wikidata) will appear. Some filters are exising as a large list, some of them
                    can also be searched with a quick search box displayed on the top of the filter list.
                </p>
                <p>
                    When you selected all the filters, click the button on the top right
                    corner: <div className={style.ShowButton}>Show</div> or once again to the selected filter to
                    close the filter window and get back the resultset. Filters can be removed one by one clicking on
                    the <AiOutlineClose size={14} /> icon in the header, where selected filters will displayed.
                </p>
            </div>
        </React.Fragment>
    )
}

export default Search;