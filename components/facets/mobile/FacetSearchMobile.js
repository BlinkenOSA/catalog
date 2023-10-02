import {AiOutlineSearch, AiOutlineCloseCircle} from "react-icons/ai";
import React, {useState, useEffect} from "react";
import style from "./FacetSearchMobile.module.scss"

/**
 * Displays a search box on top of the FacetValues list.
 *
 * @param {Object} params
 * @param {func} params.onSearch Function to call when search is fired.
 */
const FacetSearchMobile = ({onSearch}) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        onSearch(value)
    }, [value]);

    return (
        <React.Fragment >
            <div className={style.SearchBox}>
                <input
                    className={style.SearchInput}
                    placeholder={'Search in filters'}
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
            </div>
        </React.Fragment>
    )
}

export default FacetSearchMobile;
