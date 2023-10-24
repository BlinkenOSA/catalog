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
                  <ul>
                    <li>An archival fonds, subfonds, or series description page</li>
                    <li>An archival folder or item level record page</li>
                    <li>A library record (book or periodical) page</li>
                    <li>A film library record page</li>
                  </ul>
                </p>
            </div>
            <div className={style.Title}>Fonds, subfonds or series description page</div>
            <div className={style.Text}>
              <p>
                <ul>
                  <li>
                    A header showing you the main title, the request selector, language selection switch and
                    the primary type indicator.
                  </li>
                </ul>
              </p>
            </div>
          <div className={style.Title}>Folder or item level record page</div>
          <div className={style.Text}>
            <p>
              <ul>
                <li>
                  A header showing you the main title, the request selector, language selection switch and
                  the primary type indicator.
                </li>
              </ul>
            </p>
          </div>
          <div className={style.Title}>Library record page</div>
          <div className={style.Text}>
            <p>
              <ul>
                <li>
                  A header showing you the main title, the request selector, language selection switch and
                  the primary type indicator.
                </li>
              </ul>
            </p>
          </div>
          <div className={style.Title}>Film library record page</div>
          <div className={style.Text}>
            <p>
              <ul>
                <li>
                  A header showing you the main title, the request selector, language selection switch and
                  the primary type indicator.
                </li>
              </ul>
            </p>
          </div>
        </React.Fragment>
    )
}

export default Record;