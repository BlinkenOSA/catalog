import React, {useEffect, useState} from "react";
import style from "./IsadSearchBar.module.scss";
import {AiOutlineSearch, AiOutlineClose} from "react-icons/ai";

/**
 * Search bar in the header.
 */
const IsadSearchBar = ({onSearch, seriesQuery, ...props}) => {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        seriesQuery && setSearchValue(seriesQuery)
    }, [seriesQuery])

    const handleSearch = () => {
        onSearch(searchValue)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    const handleClear = () => {
        setSearchValue('')
        onSearch('')
    }

    return (
        <div className={style.SearchBox}>
            <div className={style.SearchInputWrapper}>
                <input
                    className={style.SearchInput}
                    value={searchValue || ''}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setSearchValue(e.target.value)}
                    {...props}
                />
                {
                    searchValue &&
                    <span
                        className={style.ClearButton}
                        onClick={() => handleClear()}
                    >
                        <AiOutlineClose />
                    </span>
                }
            </div>
            <button
                onClick={() => handleSearch()}
                className={style.SearchButton}
            >
                <AiOutlineSearch/>
            </button>
        </div>
    )
}

export default IsadSearchBar;
