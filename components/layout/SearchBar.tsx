import React from "react";
import style from "./SearchBar.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
    return (
        <div className={style.SearchBox}>
            <input className={style.SearchInput}/>
            <button className={style.SearchButton}>
                <AiOutlineSearch/>
            </button>
        </div>
    )
}

export default SearchBar;
