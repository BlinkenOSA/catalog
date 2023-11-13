import React from "react";
import style from "./FacetHelperMobile.module.scss";
import RecordOrigin from "../facetHelpers/RecordOrigin";
import RecordType from "../facetHelpers/RecordType";
import DateCreated from "../facetHelpers/DateCreated";
import Availability from "../facetHelpers/Availability";
import WikiFacet from "../facetHelpers/WikiFacet";
import Series from "../facetHelpers/Series";
import {truncate} from "../../../utils/truncate";


/**
 * Displaying the helper text upon facet selection
 *
 * @param {Object} params
 * @param {Object} params.facetValues Facet results of the search query.
 * @param {string} params.selectedFacetGroup Selected facet group
 * @param {Object} params.selectedFacetObject Selected facet object
 * @param {Object} params.selectedFacetValues The selected facet values.
 * @param {function} params.onFacetActionClick The handler of facet value change.
 */
const FacetHelperMobile = ({facetValues, selectedFacetGroup, selectedFacetObject,
                               selectedFacetValues, onFacetActionClick}) => {
    const getContent = () => {
        switch (selectedFacetGroup) {
            case 'record_origin':
                return <RecordOrigin selectedFacetValue={selectedFacetObject['value']} />
            case 'primary_type':
                return <RecordType selectedFacetValue={selectedFacetObject['value']} />
            case 'availability':
                return <Availability selectedFacetValue={selectedFacetObject['value']} />
            case 'subject_wikidata':
                return <WikiFacet selectedFacetObject={selectedFacetObject} type={'subject'} />
            case 'contributor_wikidata':
                return <WikiFacet selectedFacetObject={selectedFacetObject} type={'contributor'} />
            case 'geo_wikidata':
                return <WikiFacet selectedFacetObject={selectedFacetObject} type={'geo'} />
            case 'year_created':
                return <DateCreated facetValues={facetValues} />
            case 'series':
                return <Series selectedFacetObject={selectedFacetObject} isMobile={true} />
            default:
                break;
        }
    }

    const handleClick = () => {
        if (selectedFacetValues.includes(selectedFacetObject['value'])) {
            onFacetActionClick(selectedFacetObject['value'], "remove")
        } else {
            onFacetActionClick(selectedFacetObject['value'], "add")
        }
    }

    const renderButton = () => (
        selectedFacetObject['value'] &&
        <div className={style.ButtonWrapper}>
            <span className={style.Button} onClick={() => handleClick()}>
                {selectedFacetValues.includes(selectedFacetObject['value']) ? 'Remove ' : 'Add '}
                '{truncate(selectedFacetObject['value'], 20)}' Filter
            </span>
        </div>
    )

    const getButton = () => {
        switch (selectedFacetGroup) {
            case 'record_origin':
            case 'primary_type':
            case 'availability':
            case 'geo_wikidata':
            case 'subject_wikidata':
            case 'contributor_wikidata':
            case 'language_wikidata':
                return renderButton()
            default:
                break;
        }
    }

    return (
        <div className={style.FacetHelper}>
            {getContent()}
            {getButton()}
        </div>
    )
}

export default FacetHelperMobile;
