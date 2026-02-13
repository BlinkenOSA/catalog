import style from "./parts.module.scss";
import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className={style.Part}>
            <p>
                 I've read and accept Blinken OSA Archivum's <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy</a>.
            </p>
        </div>
    )
}

export default PrivacyPolicy;