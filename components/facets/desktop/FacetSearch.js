import {AiOutlineSearch, AiOutlineCloseCircle} from "react-icons/ai";
import React, {useState, useEffect} from "react";
import style from "./FacetSearch.module.scss"
import {facetConfig} from "../../../config/facetConfig";
import {galleryFacetConfig} from "../../../config/galleryFacetConfig";

/**
 * Displays a search box on top of the FacetValues list.
 *
 * @param {Object} params
 * @param {func} params.onSearch Function to call when search is fired.
 */
const FacetSearch = ({selectedFacetGroup, onSearch, type, breadcrumbHeight}) => {
    const [value, setValue] = useState('');
    const fc = type === 'gallery' ? galleryFacetConfig : facetConfig

    useEffect(() => {
        onSearch(value)
    }, [value]);

    return (
        fc[selectedFacetGroup]['search'] ?
            <div
              className={type === 'gallery' ? `${style.SearchBox} ${style.Gallery}` : style.SearchBox}
              style={type === 'gallery' ? {top: 59 + breadcrumbHeight + 36} : {top: 59 + breadcrumbHeight}}
            >
                <input
                    className={style.SearchInput}
                    placeholder={`Search in filters`}
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
