import style from "./Badges.module.scss";
import useSWR from "swr";
import {fetcher} from "../../../../utils/fetcherFunctions";
import Loader from "../loader/Loader";
import React from "react";
import {createParams} from "../../../../utils/urlParamFunctions";
import {useRouter} from "next/router";

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

    const router = useRouter();

    /**
     *
     * @param {string} badgeText The text that should be displayed
     * @param {string} key Key string
     */
    const renderBadge = (badgeText, key) => {
        const calculateFontSize = (badgeText, isMobile) => {
            if (badgeText.length > 40) {
                return 10
            } else {
                return isMobile ? 30 - (badgeText.length * 0.75) : 60 - (badgeText.length * 1.25)
            }
        }

        const handleClick = (value) => {
          router.replace({
            query: createParams(undefined, 20, 0, {keyword: value}),
          }, undefined, {shallow: true});
        }

        return (
            <div
                style={{
                    fontSize: calculateFontSize(badgeText, isMobile)
                }}
                key={key}
                className={style.Badge}
                onClick={() => handleClick(badgeText)}
            >
                <span>
                    {badgeText}
                </span>
            </div>
        )
    }

    return (
        data ?
          <div className={style.BadgePageWrapper}>
            <h1>Random selection from our keywords</h1>
            <div className={style.BadgeWrapper}>
                {
                    data.map((d, index) => (
                        renderBadge(d, index)
                    ))
                }
            </div>
          </div> : <Loader/>
    )
}

export default Badges;
