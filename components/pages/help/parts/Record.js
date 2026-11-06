import React from 'react';
import style from "./styles.module.scss"
import {FiInfo} from "react-icons/fi";

const Record = () => {
    return (
        <React.Fragment>
            <div className={style.Title}>Interpreting your search results</div>
            <div className={style.Text}>
                <p>
                    Your search results may include the following:
                </p>
                <ul>
                    <li>Descriptions of archival fonds, subfonds and series</li>
                    <li>Descriptions of archival folders and items</li>
                    <li>Library records for books and periodicals</li>
                    <li>Film library records</li>
                </ul>
                <p>
                    Select a search result to open its description page. The sections you see depend on the type of
                    material and the information available. The following guide explains the main sections for each
                    type of record.
                </p>
            </div>
            <div className={style.Title}>Fonds, subfonds or series description page</div>
            <div className={style.Text}>
                <h2>Header</h2>
                <p>
                    Shows the reference code, title and description level. A language selector appears when a
                    description is available in another language.
                </p>
                <h2>Context tab</h2>
                <p>
                    Explains what the records contain, who created them and their archival context. It also provides
                    information about their arrangement and access conditions, where recorded. The description follows
                    the <a target="_blank" rel="noopener noreferrer"
                           href="https://www.ica.org/app/uploads/2024/01/CBPS_2000_Guidelines_ISADG_Second-edition_EN.pdf">ISAD(G)</a>
                    {' '}standard for archival description.
                </p>
                <h2>Hierarchy tab</h2>
                <p>
                    Shows where the records belong in the archival hierarchy, starting with the fonds. Use the tree
                    to explore related descriptions.
                </p>
                <h2>Statistics tab</h2>
                <p>
                    Summarizes information recorded for the folders and items within the selected fonds, subfonds or
                    series, such as creation dates, material types and availability.
                </p>
                <h2>Folders / Items in this series tab</h2>
                <p>
                    Appears on series pages and lists the folders and items in their archival order. Search within
                    the series or narrow the list by creation year, subject or geographical location. On mobile, the
                    tab is labelled ‘Folders / Items’.
                </p>
            </div>
            <div className={style.Title}>Folder or item description page</div>
            <div className={style.Text}>
                <h2>Header</h2>
                <p>
                    Shows the reference code, title and material type, along with an availability label. A request
                    selector and language selector appear where applicable.
                </p>
                <h2>Citation</h2>
                <p>
                    Provides a suggested citation for the material. Click ‘Copy citation to clipboard’ to copy it
                    for use in your research or publications.
                </p>
                <h2>Metadata</h2>
                <p>
                    Describes the material, including its dates, contents and other recorded details. Where an
                    {' '}<FiInfo/> icon appears, select it to open additional information from Wikidata.
                </p>
                <h2>Hierarchy</h2>
                <p>
                    Shows the folder or item in its archival context. Use it to explore nearby records and open the
                    descriptions of the series, subfonds or fonds it belongs to.
                </p>
            </div>
            <div className={style.Title}>Library record page</div>
            <div className={style.Text}>
                <h2>Header</h2>
                <p>Shows the title, request selector, availability label and material type.</p>
                <h2>Metadata</h2>
                <p>
                    Provides bibliographic information, such as the author, publication details and subjects.
                    These records come from our library system, which uses the
                    {' '}<a href="https://www.loc.gov/marc/bibliographic/index.html" target="_blank"
                            rel="noopener noreferrer">MARC 21</a> format for bibliographic data.
                </p>
                <h2>Holdings</h2>
                <p>
                    Lists the available copies and formats of the material, with call numbers, locations, volume
                    information and notes, where recorded.
                </p>
            </div>
            <div className={style.Title}>Film library record page</div>
            <div className={style.Text}>
                <h2>Header</h2>
                <p>Shows the title, request selector, availability label and material type.</p>
                <h2>Metadata</h2>
                <p>
                    Describes the film, including its creators, production details, languages and contents, where
                    recorded. Film library records also come from our library system and use the
                    {' '}<a href="https://www.loc.gov/marc/bibliographic/index.html" target="_blank"
                            rel="noopener noreferrer">MARC 21</a> format.
                </p>
                <h2>Holdings</h2>
                <p>
                    Lists the available physical and digital copies of the film, with their formats, call numbers,
                    barcodes, locations and notes, where recorded.
                </p>
            </div>
        </React.Fragment>
    )
}

export default Record;
