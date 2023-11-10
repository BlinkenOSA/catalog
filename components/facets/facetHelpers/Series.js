import React from "react";
import style from "./FacetHelper.module.scss";
import useSWR from "swr";
import {fetcher} from "../../../utils/fetcherFunctions";

/**
 * Description of the Record Origin facet.
 *
 * @param {Object} params
 * @param {Object} params.selectedFacetObject Selected facet object
 */
const Series = ({selectedFacetObject}) => {
    const {data, error} = useSWR(
      selectedFacetObject.hasOwnProperty('value') ? [`image-gallery/archival-unit/`,  {'full_title': selectedFacetObject['value']}] : undefined, fetcher
    );

    const renderData = () => {
        if (data) {
            return (
                <>
                    <h2>{data['title']}</h2>
                    <p>
                      {data['scope_and_content_abstract']}
                    </p>
                    <br/>
                    <p>
                      {data['scope_and_content_narrative']}
                    </p>
                    <br/>
                    <p>
                      {data['archival_history']}
                    </p>
                </>
            )
        }
    }

    return (
        <div className={style.FacetHelperText}>
            <div className={style.FacetGroup}>
                <h2>Collection</h2>
                <p>
                    These are the archival collections where digital images are existing.
                </p>
            </div>
            <div className={`${style.FacetExplanation} ${style.Gallery}`}>
              {renderData()}
            </div>
        </div>
    )
}

export default Series
