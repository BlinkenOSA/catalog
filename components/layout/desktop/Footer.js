import React from "react";
import style from "./Footer.module.scss";

/**
 * Footer of the page.
 */
const Footer = () => {
    return (
        <div className={style.Footer}>
            <div className={style.FooterContent}>
                <ul>
                    <li>Vera and Donald Blinken<br/>Open Society Archives</li>
                    <li>Address:<br/>H-1051 Budapest, Arany János u. 32.</li>
                    <li>Opening Hours:<br/>Monday-Friday 10AM-5:45PM</li>
                    <li>Telephone:<br/>+36-1-327-3250</li>
                    <li>E-mail:<br/>info@osaarchivum.org</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;
