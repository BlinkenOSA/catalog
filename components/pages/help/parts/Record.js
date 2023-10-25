import React from 'react';
import style from "./styles.module.scss"
import {FiInfo} from "react-icons/fi";
import {facetConfig} from "../../../../config/facetConfig";
import {AiOutlineClose, AiOutlineRight} from "react-icons/ai";

const Record = () => {
    return (
        <React.Fragment>
            <div className={style.Title}>Opening a record</div>
            <div className={style.Text}>
                <p>
                  By clicking an item on the search hitlist, or clicking to a link leading to a page in the catalog,
                  most probably you will end up on a record page. A record page can show you a record, which can be:
                </p>
                <ul>
                    <li>An archival fonds, subfonds, or series description page</li>
                    <li>An archival folder or item level record page</li>
                    <li>A library record (book or periodical) page</li>
                    <li>A film library record page</li>
                </ul>
                <p>
                    Each page have parts which are similar to each other, but there are special sections
                    only typical for a specific record type. Let's see what are the main building blocks of
                    a record page.
                </p>
            </div>
            <div className={style.Title}>Fonds, subfonds or series description page</div>
            <div className={style.Text}>
                <h2>Header</h2>
                <p>Showing you the main title, the language selection switch (if applicable)
                    and the primary type indicator.</p>
                <h2>Context tab</h2>
                <p>The contextual information metadata. The descripion follows the ISAD(G) format.</p>
                <h2>Hierarchy tab</h2>
                <p>Showing the place of the selected description record in the archival hierarchy
                    starting from the top-level fonds description record.</p>
                <h2>Statistics tab</h2>
                <p>Statistical information about the underlying folder or item records.</p>
                <h2>Folder / Items in this series tab</h2>
                <p>
                    Only visible on series level. List of the underlying
                    folder or item level records, sorted by their physical order. In this page, you can
                    search amongst these records or filter further by creation date, subject or
                    geographic location.
                </p>
            </div>
          <div className={style.Title}>Folder or item level record page</div>
          <div className={style.Text}>
              <h2>Header</h2>
              <p>Showing you the main title, the request selector, the availability badge,
                  language selection switch (if applicable) and the primary type indicator.</p>
              <h2>Citation</h2>
              <p>Suggesting you the citation format you should use in your publications.
                  By clicking the button you can copy the citation text to the clipboard.</p>
              <h2>Metadata</h2>
              <p>Metadata of the record. If an <FiInfo /> is visible, clicking on it will open an
                  information box with data collected from Wikidata.</p>
              <h2>Hierarchy</h2>
              <p>Shows you the hierarchical placement of the currently shown folder or item level
                  record. You can navigate to the next and previous records in the hierarchy or jump up to
                  the parent series, subfonds or fonds level descriptions.</p>
          </div>
          <div className={style.Title}>Library record page</div>
          <div className={style.Text}>
              <h2>Header</h2>
              <p>Showing you the main title, the request selector, the availability badge,
                  and the primary type indicator.</p>
              <h2>Metadata</h2>
              <p>Library metadata part. In our library system we are using
                  the international MARC21 standard to describe library materials.</p>
              <h2>Holdings</h2>
              <p>Showing you the different physical (or digital) instances
                  of a library record.
              </p>
          </div>
          <div className={style.Title}>Film library record page</div>
          <div className={style.Text}>
              <h2>Header</h2>
              <p>Showing you the main title, the request selector, the availability badge,
                  and the primary type indicator.</p>
              <h2>Metadata</h2>
              <p>Film library metadata part. In our library system we are using
                  the international MARC21 standard to describe film library materials.</p>
              <h2>Holdings</h2>
              <p>Showing you the different physical (or digital) instances
                  of a film library record.
              </p>
          </div>
        </React.Fragment>
    )
}

export default Record;