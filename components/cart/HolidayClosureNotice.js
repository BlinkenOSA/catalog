import {useState} from "react";
import dayjs from "dayjs";
import style from "./HolidayClosureNotice.module.scss";

const HolidayClosureNotice = ({from, to}) => {
    const [isVisible, setIsVisible] = useState(true);
    const fromDate = dayjs(from);
    const toDate = dayjs(to);
    const reopenDate = toDate.add(1, "day");

    const fromLabel = fromDate.format("MMMM D");
    const reopenLabel = reopenDate.format("MMMM D");
    const reopenMonthLabel = reopenDate.format("MMMM");

    if (!isVisible) {
        return null;
    }

    return (
        <div className={style.ClosureNotice}>
            <button
                type="button"
                className={style.CloseButton}
                aria-label="Close closure notice"
                onClick={() => setIsVisible(false)}
            >
                X
            </button>
            <p>
                The Research Room is <strong>fully closed from {fromLabel}</strong>, and will reopen on {reopenLabel}; in this period, <strong>online services are also unavailable</strong>.
            </p>
            <p>
                When the Research Room is closed and online services are unavailable, explore
                our <a href="https://archivum.org/collections/online-collections" target="_blank" rel="noreferrer">
                    online collections</a>, or select the "Digitally Anywhere / Without Registration" filter when
                searching the <a href="https://catalog.archivum.org/" target="_blank" rel="noreferrer">Catalog</a>.
                If you need help with the latter, consult our <a href="https://catalog.archivum.org/researchers-guide" target="_blank" rel="noreferrer">Researcher's Guide</a>.
            </p>
            <p>
                You will get a notification email once the Archivum reopens in {reopenMonthLabel} and your
                items are prepared in our Research Room.
            </p>
        </div>
    )
}

export default HolidayClosureNotice;
