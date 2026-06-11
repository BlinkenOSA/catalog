import React, {useEffect, useState} from "react";
import style from "./SearchBarMobile.module.scss";
import {AiOutlineSearch} from "react-icons/ai";
import {useRouter} from "next/router";
import {createParams} from "../../../utils/urlParamFunctions";
import {useWindowSize} from "react-use";

/**
 * Search bar in the header.
 */
const SearchBarMobile = ({type}) => {
    const {width, height} = useWindowSize();

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
        const trimmedSearchValue = searchValue?.trim();
        const currentQuery = Array.isArray(query) ? query[0] : query;
        const isNewSearchTerm = trimmedSearchValue !== currentQuery;

        if (trimmedSearchValue) {
            router.replace({
                pathname: type === 'gallery' ? '/image-gallery' : '/',
                query: createParams(
                    trimmedSearchValue,
                    isNewSearchTerm ? undefined : limit,
                    isNewSearchTerm ? undefined : offset,
                    isNewSearchTerm ? {} : selectedFacets
                ),
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
                className={style.SearchInput}
                value={searchValue || ''}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
                onClick={() => handleSearch()}
                className={style.SearchButton}
            >
                <AiOutlineSearch size={25}/>
            </button>
        </div>
    )
}

export default SearchBarMobile;
