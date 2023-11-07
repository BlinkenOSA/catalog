import React, {useState} from "react";
import style from "./Layout.module.scss";
import { Media } from "../../utils/media";

import Header from "./desktop/Header";
import Footer from "./desktop/Footer";
import FooterMobile from "./mobile/FooterMobile";
import dynamic from "next/dynamic";

const HeaderMobile = dynamic(() => import("./mobile/HeaderMobile"), {
    ssr: false,
});

/**
 * Layout component which wraps the child components and adds the header and the footer.
 *
 * @param {Object} params
 * @param {React.ReactChildren} params.children
 */
const Layout = ({module, children}) => {
    return (
        <React.Fragment>
            <Media lessThan="md">
                <HeaderMobile />
                <div className={style.ContentWrapMobile}>
                    {children}
                </div>
                <FooterMobile />
            </Media>
            <Media greaterThanOrEqual="md">
                <Header />
                <div className={style.ContentWrap}>
                    {children}
                </div>
                <Footer />
            </Media>
        </React.Fragment>
    )
}

export default Layout;
