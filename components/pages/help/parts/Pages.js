import React from 'react';
import style from "./styles.module.scss"
import {FiInfo} from "react-icons/fi";
import {facetConfig} from "../../../../config/facetConfig";
import {AiOutlineClose, AiOutlineRight} from "react-icons/ai";

const Pages = () => {
    return (
        <React.Fragment>
            <div className={style.Title}>Archival collections</div>
            <div className={style.Text}>
                <p>

                </p>
            </div>
            <div className={style.Title}>Library special collections</div>
            <div className={style.Text}>
              <p>

              </p>
            </div>
            <div className={style.Title}>Digital image gallery</div>
            <div className={style.Text}>
              <p>

              </p>
            </div>
        </React.Fragment>
    )
}

export default Pages;