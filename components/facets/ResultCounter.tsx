import React from "react";
import style from "./ResultCounter.module.scss";

const ResultCounter = () => {
    const numberWithCommas = (x: number) => {
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
