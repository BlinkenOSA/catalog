import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <React.Fragment>
            <Header />
            {children}
            <Footer />
        </React.Fragment>
    )
}

export default Layout;
