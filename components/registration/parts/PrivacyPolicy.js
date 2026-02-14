import style from "./parts.module.scss";
import React from "react";

const PrivacyPolicy = () => {
    return (
        <div className={style.Part}>
            <p>
                I have read and understood the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">privacy
                notice</a> relating to the use of the Catalog.
            </p>
        </div>
    )
}

export default PrivacyPolicy;