import React from "react";
import style from "./ResultCounter.module.scss";

/**
 * Displays the number of the results based on the selected facets.
 */
const ResultCounter = () => {
  /**
   * Displays a number separating thousands with a comma.
   *
   * @param {number} x The number to be displayed.
   * @returns {string} The number where thousands are separated with comma.
   */
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <React.Fragment>
            <div className={style.ResultCounter}>
                <div className={style.Count}>{numberWithCommas(12234)}</div>
                <div className={style.CountText}>records<br/>found</div>
            </div>
            <div className={style.FilterButtonWrapper}>
                <div className={style.FilterButton}>Filter</div>
            </div>
        </React.Fragment>
    )
}

export default ResultCounter;
