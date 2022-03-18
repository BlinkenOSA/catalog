import React from "react";
import style from "./Header.module.scss";
import SearchBar from "./SearchBar";
import Menu from "./Menu";

/**
 * Header of the page.
 */
const Header = () => {


    return (
        <div className={style.Header}>
            <div className={style.HeaderContent}>
                <a href={'/'}>
                    <div className={style.Logo}>
                        <img src={"/images/osa-logo.png"} alt={"Vera and Donald Blinken Open Society Archives"}/>
                    </div>
                </a>
                <div className={style.SearchBar}>
                    <SearchBar />
                </div>
                <div className={style.Menu}>
                    <Menu />
                </div>
            </div>
        </div>
    )
}

export default Header;
