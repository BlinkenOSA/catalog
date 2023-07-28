import React from "react";
import style from "./IndexPage.module.scss";
import FacetMenu from "../facets/desktop/FacetMenu";
import Badges from "./parts/indexPage/Badges";
import {Media} from "../../utils/media"
import Welcome from "./parts/indexPage/Welcome";
import StatisticsArchives from "./parts/indexPage/StatisticsArchives";

/**
 * Page responsible for displaying the search results
 *
 * @param {Object} params
 * @param {func} params.onSelectFacetGroup Handling of selecting a particular group.
 */
const IndexPage = ({badgeData, newIsadData, onSelectFacetGroup}) => {
    return (
        <React.Fragment>
            <Media lessThan="md">
                <div className={style.ContentMobile}>
                    <Welcome isMobile={true} />
                    <Badges data={badgeData} isMobile={true} />
                    <div className={style.LatestAdditions}>
                        <StatisticsArchives data={newIsadData} />
                    </div>
                </div>
            </Media>
            <Media greaterThanOrEqual="md">
                <div className={style.ContentIndex}>
                    <FacetMenu
                        onSelectFacetGroup={onSelectFacetGroup}
                    />
                    <div className={style.Content}>
                        <Welcome />
                        <Badges data={badgeData} />
                        <div className={style.LatestAdditions}>
                            <StatisticsArchives data={newIsadData} />
                        </div>
                    </div>
                </div>
            </Media>
        </React.Fragment>
    )
}

export default IndexPage;
