import React from "react";
import style from "./SearchPage.module.scss";
import FacetMenu from "../../facets/desktop/FacetMenu";
import Loader from "../../layout/Loader";
import ResultItem from "../../results/ResultItem";
import {useRouter} from "next/router";
import NotFound from "../../results/NotFound";
import {defaultLimit, defaultOffset} from "../../../config/appConfig";
import {Media} from "../../../utils/media"

/**
 * Page responsible for displaying the search results
 *
 * @param {Object} params
 * @param {func} params.onSelectFacetGroup Handling of selecting a particular group.
 */
const SearchPage = ({data, onSelectFacetGroup}) => {
    const router = useRouter();
    const {limit, offset} = router.query;

    const renderResults = (isMobile=false) => {
        const results = data['response']['docs']
        const highlights = data['highlighting']

        if (results.length > 0) {
            return results.map((result, index) => (
                <ResultItem
                    key={result['id']}
                    isMobile={isMobile}
                    result={result}
                    highlights={highlights}
                    limit={limit ? Number(limit) : defaultLimit}
                    offset={offset ? Number(offset) : defaultOffset}
                    index={index}
                />
            ))
        } else {
            return <NotFound />
        }
    }

    return (
        <React.Fragment>
            <Media lessThan="md">
                <div className={style.ContentMobile}>
                    {data ? renderResults(true) : <Loader/>}
                </div>
            </Media>
            <Media greaterThanOrEqual="md">
                <div className={style.ContentSearch}>
                    <FacetMenu
                        onSelectFacetGroup={onSelectFacetGroup}
                    />
                    <div className={style.Content}>
                        {data ? renderResults() : <Loader/>}
                    </div>
                </div>
            </Media>
        </React.Fragment>
    )
}

export default SearchPage;
