import React from "react";
import Header from "./Header";
import Footer from "./Footer";

/**
 * Layout component which wraps the child components and adds the header and the footer.
 *
 * @param {Object} params
 * @param {React.ReactChildren} params.children
 */
const Layout = ({children}) => {
    return (
        <React.Fragment>
            <Header />
            {children}
            <Footer />
        </React.Fragment>
    )
}

export default Layout;
