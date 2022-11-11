import React from "react";
import style from "./IndexPage.module.scss";
import FacetMenu from "../facets/desktop/FacetMenu";
import Badges from "./parts/indexPage/Badges";
import {Media} from "../../utils/media"

/**
 * Page responsible for displaying the search results
 *
 * @param {Object} params
 * @param {func} params.onSelectFacetGroup Handling of selecting a particular group.
 */
const IndexPage = ({onSelectFacetGroup}) => {
    return (
        <React.Fragment>
            <Media lessThan="md">
                <div className={style.ContentMobile}>
                    <Badges isMobile={true} />
                </div>
            </Media>
            <Media greaterThanOrEqual="md">
                <div className={style.ContentIndex}>
                    <FacetMenu
                        onSelectFacetGroup={onSelectFacetGroup}
                    />
                    <div className={style.Content}>
                        <Badges />
                    </div>
                </div>
            </Media>
        </React.Fragment>
    )
}

export default IndexPage;
