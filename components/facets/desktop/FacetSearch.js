import {AiOutlineSearch, AiOutlineCloseCircle} from "react-icons/ai";
import React, {useState, useEffect} from "react";
import style from "./FacetSearch.module.scss"
import {facetConfig} from "../../../config/facetConfig";

/**
 * Displays a search box on top of the FacetValues list.
 *
 * @param {Object} params
 * @param {func} params.onSearch Function to call when search is fired.
 */
const FacetSearch = ({selectedFacetGroup, onSearch}) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        onSearch(value)
    }, [value]);

    return (
        facetConfig[selectedFacetGroup]['search'] ?
            <div className={style.SearchBox}>
                <input
                    className={style.SearchInput}
                    placeholder={'Type something'}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {value === '' ?
                    <div className={style.SearchButton}>
                        <AiOutlineSearch/>
                    </div>
                    :
                    <div className={style.ClearButton} onClick={() => setValue('')}>
                        <AiOutlineCloseCircle/>
                    </div>
                }
            </div> : ''
    )
}

export default FacetSearch;
