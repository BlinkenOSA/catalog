import style from "./Pagination.module.scss";
import {useEffect, useState} from "react";
import {defaultLimit, defaultOffset} from "../../../../config/appConfig";

const Pagination = ({limit=defaultLimit, offset=defaultOffset, total, onChangePage, isMobile=false}) => {
    const [resultsTotal, setResultsTotal] = useState(0);

    const lim = Number(limit);
    const off = Number(offset);

    useEffect(() => {
        if (Number(total) !== 0) {
            setResultsTotal(Number(total))
        }
    }, [total])

    const handlePreviousClick = () => {
        if (off !== 0) {
            onChangePage(off - lim)
        }
    }

    const handleNextClick = () => {
        if (off + lim < resultsTotal) {
            onChangePage(off + lim)
        }
    }

    return (
        <div className={style.Pagination}>
            <div
                className={off === 0 ? style.PreviousDisabled : style.Previous}
                onClick={handlePreviousClick}
            >
                <span/> Previous
            </div>
            <div className={style.Counters}>
                {off + 1} - {(off + lim <= resultsTotal ? off + lim : resultsTotal)} of {resultsTotal}
            </div>
            <div
                className={off + lim >= resultsTotal ? style.NextDisabled : style.Next}
                onClick={handleNextClick}
            >
                Next <span/>
            </div>
        </div>
    )
}

export default Pagination;
