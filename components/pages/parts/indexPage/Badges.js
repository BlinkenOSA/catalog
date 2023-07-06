import style from "./Badges.module.scss";
import useSWR from "swr";
import {fetcher} from "../../../../utils/fetcherFunctions";
import Loader from "../loader/Loader";

const badgeText = [
    'CPG', 'Lenin', 'Szabad Európa Rádió', 'Srebrenica', 'EU',
    'Emigré', 'Bős-nagymarosi vízlépcső', 'Перестройка',
    'USSR', 'CIA'
]

/**
 * Display badges on the front page.
 */
const Badges = ({isMobile = false}) => {
    const { data, error } = useSWR(`collection-specific-tags/`, fetcher)

    /**
     *
     * @param {string} badgeText The text that should be displayed
     * @param {string} key Key string
     */
    const renderBadge = (badgeText, key) => {
        return (
            <div
                style={{
                    fontSize: isMobile ? 60 - (badgeText.length * 1.5) : 120 - (badgeText.length * 2.5)
                }}
                key={key}
                className={style.Badge}
            >
                <span>
                    {badgeText}
                </span>
            </div>
        )
    }

    return (
        data ?
        <div className={style.BadgeWrapper}>
            {
                data.map((d, index) => (
                    renderBadge(d['keyword'], index)
                ))
            }
        </div> : <Loader/>
    )
}

export default Badges;
