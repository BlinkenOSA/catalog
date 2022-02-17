import React from "react";
import style from "./ContentSearch.module.scss";

/**
 * Content component
 *
 * @param {React.ReactChildren} children Children components
 */
const ContentView = ({children}) => {
    return (
        <div className={style.Content}>
            {children}
        </div>
    )
}

export default ContentView;
