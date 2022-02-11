import React from "react";
import style from "./ContentSearch.module.scss";

const ContentView = ({children}: {children: React.ReactNode}) => {
    return (
        <div className={style.Content}>
            {children}
        </div>
    )
}

export default ContentView;
