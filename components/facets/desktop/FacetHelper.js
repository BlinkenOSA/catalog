import React from "react";
import style from "./FacetHelper.module.scss";
import RecordOrigin from "../../../config/facetHelpers/RecordOrigin";
import RecordType from "../../../config/facetHelpers/RecordType";
import DateCreated from "../../../config/facetHelpers/DateCreated";
import Availability from "../../../config/facetHelpers/Availability";

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
const FacetHelper = ({facetValues, selectedFacetGroup, selectedFacetObject, selectedFacetValues, onFacetActionClick}) => {
    const getContent = () => {
        switch (selectedFacetGroup) {
            case 'record_origin':
                return <RecordOrigin selectedFacetValue={selectedFacetObject['value']} />
            case 'primary_type':
                return <RecordType selectedFacetValue={selectedFacetObject['value']} />
            case 'availability':
                return <Availability selectedFacetValue={selectedFacetObject['value']} />
            case 'subject_wikidata':
                break;
            case 'geo_wikidata':
                return <RecordType selectedFacetValue={selectedFacetObject['value']} />
            case 'year_created':
                return <DateCreated facetValues={facetValues} />
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

    const truncate = (input) => input.length > 20 ? `${input.substring(0, 20)}...` : input;

    const renderButton = () => (
        selectedFacetObject['value'] &&
        <div className={style.ButtonWrapper}>
            <span className={style.Button} onClick={() => handleClick()}>
                {selectedFacetValues.includes(selectedFacetObject['value']) ? 'Remove ' : 'Add '}
                '{truncate(selectedFacetObject['value'])}' Filter
            </span>
        </div>
    )

    const getButton = () => {
        switch (selectedFacetGroup) {
            case 'record_origin':
                return renderButton()
            case 'primary_type':
                return renderButton()
            case 'availability':
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

export default FacetHelper;
