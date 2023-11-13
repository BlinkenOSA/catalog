import React, {useEffect, useState} from "react";
import style from "./SearchBar.module.scss";
import {AiOutlineSearch} from "react-icons/ai";
import {useRouter} from "next/router";
import {createParams} from "../../../utils/urlParamFunctions";

/**
 * Search bar in the header.
 */
const SearchBar = ({type}) => {
    const router = useRouter();
    const {query, limit, offset, ...selectedFacets} = router.query;

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (query !== '*') {
            setSearchValue(query)
        } else {
            setSearchValue('')
        }
    }, [query])

    const handleSearch = () => {
        if (searchValue && searchValue.trim() !== '') {
            router.replace({
                pathname: type === 'gallery' ? '/image-gallery' : '/',
                query: createParams(searchValue, limit, offset, selectedFacets),
            }, undefined, {shallow: false});
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className={style.SearchBox}>
            <input
                placeholder={type === 'gallery' ? 'Search the images...' : 'Search the catalog...'}
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
