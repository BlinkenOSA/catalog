import React from 'react';
import style from "./styles.module.scss"
import {FiInfo} from "react-icons/fi";
import {facetConfig} from "../../../../config/facetConfig";
import {AiOutlineClose, AiOutlineRight} from "react-icons/ai";

const Record = () => {
    return (
        <React.Fragment>
            <div className={style.Title}>Interpreting your search results</div>
            <div className={style.Text}>
                <p>
                    Your search results may include the following:
                </p>
                <ul>
                    <li>Archival fonds, subfonds, or series description pages</li>
                    <li>Archival folder or item level record pages</li>
                    <li>Library record (books and periodicals) pages</li>
                    <li>Film library record pages</li>
                </ul>
                <p>
                    Clicking an item shown in your hit list will take you to a page that, depending on the type/format
                    of your record, typically contains the following building blocks:
                </p>
            </div>
            <div className={style.Title}>Fonds, subfonds or series description page</div>
            <div className={style.Text}>
                <h2>Header</h2>
                <p>Shows you the main title, the language selection switch (if applicable), and the primary type
                    indicator.</p>
                <h2>Context tab</h2>
                <p>The contextual information metadata. The descripion follows
                    the <a target='_blank'
                           href={'https://www.ica.org/en/isadg-general-international-standard-archival-description-second-edition'}>ISAD(G)</a>
                    format.</p>
                <h2>Hierarchy tab</h2>
                <p>Shows you the place of the selected description record in the archival hierarchy starting from the
                    top-level fonds description.</p>
                <h2>Statistics tab</h2>
                <p>Statistical information about the underlying folder or item records.</p>
                <h2>Folder / Items in this series tab</h2>
                <p>
                    Only visible on series level. List of the underlying folder or item level records, sorted by their
                    physical order. Here you can search among these records, or filter further by creation date,
                    subject, and/or geographic location.
                </p>
            </div>
            <div className={style.Title}>Folder or item level record page</div>
            <div className={style.Text}>
                <h2>Header</h2>
                <p>Shows you the main title, the request selector, the availability badge, a language selection switch
                    (if applicable), and the primary type indicator.</p>
                <h2>Citation</h2>
                <p>Suggests the citation format you should use in your publications. By clicking the button, you can
                    copy the citation text to the clipboard.</p>
                <h2>Metadata</h2>
                <p>Metadata of the record. If an <FiInfo/> is visible, clicking on it will open an
                    information box with data collected from Wikidata.</p>
                <h2>Hierarchy</h2>
                <p>Shows you the hierarchical placement of the currently shown folder or item level record. You can
                    navigate to the next and previous records in the hierarchy or jump up to the parent series, subfonds
                    or fonds level descriptions.</p>
            </div>
            <div className={style.Title}>Library record page</div>
            <div className={style.Text}>
                <h2>Header</h2>
                <p>Shows you the main title, the request selector, the availability badge,
                    and the primary type indicator.</p>
                <h2>Metadata</h2>
                <p>Library record metadata. In our library system we are using the
                    international <a href={'https://www.loc.gov/marc/bibliographic/'}
                                     target={'_blank'}>MARC21</a> standard
                    to describe library materials.</p>
                <h2>Holdings</h2>
                <p>Shows you the different physical (or digital) instances of a library record.
                </p>
            </div>
            <div className={style.Title}>Film library record page</div>
            <div className={style.Text}>
                <h2>Header</h2>
                <p>Shows you the main title, the request selector, the availability badge,
                    and the primary type indicator.</p>
                <h2>Metadata</h2>
                <p>Film library metadata part. In our library system we are using
                    the international <a href={'https://www.loc.gov/marc/bibliographic/'}
                                         target={'_blank'}>MARC21</a> standard to describe film library materials.</p>
                <h2>Holdings</h2>
                <p>Shows you the different physical (or digital) instances
                    of a film library record.
                </p>
            </div>
        </React.Fragment>
    )
}

export default Record;