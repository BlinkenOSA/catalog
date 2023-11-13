import React from "react";
import style from "./GalleryFooter.module.scss";

/**
 * Footer of the page.
 */
const GalleryFooter = () => {
    return (
        <div className={style.Footer}>
            <div className={style.FooterInstiution}>
                Blinken OSA Archivum
            </div>
            <div className={style.FooterContent}>
                <ul>
                    <li>Opening Hours:<br/>Monday-Friday 10AM-5:45PM</li>
                    <li>Telephone:<br/>+36-1-327-3250</li>
                </ul>
                <ul>
                    <li>Address:<br/>H-1051 Budapest, Arany János u. 32.</li>
                    <li>E-mail:<br/>info@osaarchivum.org</li>
                </ul>
                <div className={style.Menu}>
                    <ul>
                        <a href={'/registration'}>
                            <li className={style.Badge}>
                                Researcher Registration
                            </li>
                        </a>
                        <a href={'/privacy-policy'}>
                            <li className={style.Badge}>
                                Privacy Policy
                            </li>
                        </a>
                        <a href={'/researchers-guide'}>
                            <li className={style.Badge}>
                                Researcher's Guide
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default GalleryFooter;
