import React, {useState} from "react";
import style from "./Header.module.scss";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";

const NewMenu = dynamic(() => import('./NewMenu'), {
    ssr: false,
})

/**
 * Header of the page.
 */
const Header = () => {
    return (
        <div className={style.Header}>
            <div className={style.HeaderContent}>
                <a href={'/'}>
                    <div className={style.Logo}>
                        <img src={"/images/osa-logo-old-white.svg"} alt={"Blinken OSA Archivum"}/>
                    </div>
                </a>
                <div className={style.SearchBar}>
                    <SearchBar />
                </div>
                <div className={style.Menu}>
                    <NewMenu />
                </div>
            </div>
        </div>
    )
}

export default Header;
