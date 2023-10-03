import React from "react";
import style from "./FooterMobile.module.scss";

/**
 * Footer of the page.
 */
const FooterMobile = () => {
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
            </div>
        </div>
    )
}

export default FooterMobile;
