import React, {useEffect, useState} from "react";
import style from "./ResultCounter.module.scss";

/**
 * Displays the number of the results based on the selected facets.
 *
 * @param {Object} params
 * @param {number} params.total Total number of results.
 * @param {func} params.onShowButtonClick Handling clicking the Filter button.
 */
const ResultCounter = ({total, onShowButtonClick, breadcrumbHeight}) => {
    const [count, setCount] = useState('')

    useEffect(() => {
        if (total !== 0) {
            setCount(total)
        }
    }, [total])

    /**
    * Displays a number separating thousands with a comma.
    *
    * @param {number} x The number to be displayed.
    * @returns {string} The number where thousands are separated with comma.
    */
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const handleShowButtonClick = () => {
        onShowButtonClick()
    }

    return (
        <div className={style.ResultCounterWrapper} style={{top: 61 + breadcrumbHeight}}>
            <div className={style.ResultCounter}>
                <div className={style.Count}>{numberWithCommas(count)}</div>
                <div className={style.CountText}>records<br/>found</div>
            </div>
            <div className={style.FilterButtonWrapper}>
                <div className={style.FilterButton} onClick={() => handleShowButtonClick()}>Show</div>
            </div>
        </div>
    )
}

export default ResultCounter;
