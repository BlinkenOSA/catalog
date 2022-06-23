import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import style from "./Layout.module.scss";

/**
 * Layout component which wraps the child components and adds the header and the footer.
 *
 * @param {Object} params
 * @param {React.ReactChildren} params.children
 */
const LayoutWithFacet = ({children}) => {
    return (
        <React.Fragment>
            <Header />
            <div className={style.ContentWrap}>
                {children}
            </div>
        </React.Fragment>
    )
}

export default LayoutWithFacet;
