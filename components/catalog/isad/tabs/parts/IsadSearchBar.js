import React, {useEffect, useState} from "react";
import style from "./IsadSearchBar.module.scss";
import {AiOutlineSearch, AiOutlineClose} from "react-icons/ai";
import {BiSlider} from "react-icons/bi"

/**
 * Search bar in the header.
 */
const IsadSearchBar = ({onSearch, onFilter, seriesQuery, isMobile, filterOpen, ...props}) => {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        seriesQuery && setSearchValue(seriesQuery)
    }, [seriesQuery])

    const handleSearch = () => {
        onSearch(searchValue)
    }

    const handleFilter = () => {
        onFilter()
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
            <div className={isMobile ? `${style.SearchInputWrapper} ${style.Mobile}` : style.SearchInputWrapper}>
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
            {
                isMobile &&
                <button
                    onClick={() => handleFilter()}
                    className={filterOpen ? `${style.FilterButton} ${style.Open}`: style.FilterButton}
                >
                    <BiSlider/>
                </button>
            }
        </div>
    )
}

export default IsadSearchBar;
