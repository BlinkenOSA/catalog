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
                    A special page which aims to show you the full tree-like structure of the hierarhical
                    description levels (fonds, subfonds, series) of the archives. If you click on the main themes,
                    on the top level, you can filter the tree with the selected value. Clicking on one element of
                    the tree will show you a shorter description of the selected record, with the chance of navigating
                    to the full fonds, subfonds or series description page.
                </p>
            </div>
            <div className={style.Title}>Library special collections</div>
            <div className={style.Text}>
                <p>
                    To make research easier and to track back the origin of the library documents, most of the
                    publications are organized into browsable special thematic collections, which is displayed
                    in this page.
                </p>
            </div>
            <div className={style.Title}>Digital image gallery</div>
            <div className={style.Text}>
              <p>
                  To be able to see all our digitized image files more like an image gallery instead of
                  going through the whole archival context, a digital image gallery section was created.
                  Here you can find the same content that is shown in the regular catalog. You can search
                  amongst the images with the searchbox on the top, or you can use the filters the same way
                  as in the catalog.
              </p>
            </div>
        </React.Fragment>
    )
}

export default Pages;