import React, {useEffect, useState} from "react";
import style from "./SearchBar.module.scss";
import {AiOutlineCloseCircle, AiOutlineSearch} from "react-icons/ai";
import {useRouter} from "next/router";
import createParams from "../../utils/createParams";

/**
 * Search bar in the header.
 */
const SearchBar = () => {
    const router = useRouter();
    const {query, limit, offset, ...selectedFacets} = router.query;

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (query !== '*') {
            setSearchValue(query)
        }
    }, [query])

    const handleSearch = () => {
        router.replace({
            query: createParams(searchValue, limit, offset, selectedFacets),
        }, undefined, {shallow: true});
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className={style.SearchBox}>
            <input
                className={style.SearchInput}
                value={searchValue || ''}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
                onClick={() => handleSearch()}
                className={style.SearchButton}
            >
                <AiOutlineSearch/>
            </button>
        </div>
    )
}

export default SearchBar;
