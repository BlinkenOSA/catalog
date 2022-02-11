import {AiOutlineSearch, AiOutlineCloseCircle} from "react-icons/ai";
import React, {useState} from "react";
import style from "./FacetSearch.module.scss"

const FacetSearch = () => {
    const [value, setValue] = useState('');

    return (
        <React.Fragment >
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
                    <div className={style.ClearButton}>
                        <AiOutlineCloseCircle/>
                    </div>
                }
            </div>
        </React.Fragment>
    )
}

export default FacetSearch;
