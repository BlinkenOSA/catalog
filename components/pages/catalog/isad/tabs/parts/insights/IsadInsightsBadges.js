import style from "./IsadInsightsBadges.module.scss";
import React, {useState} from "react";
import {createParams} from "../../../../../../../utils/urlParamFunctions";
import Loader from "../../../../../../layout/Loader"
import {useRouter} from "next/router";
import {useDeepCompareEffect} from "react-use";


/**
 * Display badges based on the facets.
 */
const IsadInsgightsBadges = ({data, title, isMobile = false}) => {
    const router = useRouter();
    const [facetData, setFacetData] = useState([])

    useDeepCompareEffect(() => {
      const f = [];
      const max = data.length > 20 ? 20 : data.length
      for (let i = 0; i < max; i += 2) {
        f.push(`${data[i]} (${data[i+1]})`);
      }
      setFacetData(f)
    }, [data])

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

        return (
            <div
                style={{
                    fontSize: calculateFontSize(badgeText, isMobile)
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
          facetData ?
          <div className={style.BadgePageWrapper}>
            <h1>{title}</h1>
            <div className={style.BadgeWrapper}>
                {
                    facetData.map((d, index) => (
                        renderBadge(d, index)
                    ))
                }
            </div>
          </div> : <Loader/>
    )
}

export default IsadInsgightsBadges;
