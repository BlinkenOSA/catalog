import React from "react";
import style from "./FacetHelper.module.scss";
import RecordOrigin from "../../../config/facetHelpers/RecordOrigin";
import RecordType from "../../../config/facetHelpers/RecordType";
import DateCreated from "../../../config/facetHelpers/DateCreated";

/**
 * Displaying the helper text upon facet selection
 *
 * @param {Object} params
 * @param {Object} params.facetValues Facet results of the search query.
 * @param {string} params.selectedFacetGroup Selected facet group
 * @param {string} params.selectedFacetValue Selected facet value
 * @param {Object} params.selectedFacetValues The selected facet values.
 * @param {function} params.onFacetActionClick The handler of facet value change.
 */
const FacetHelper = ({facetValues, selectedFacetGroup, selectedFacetValue, selectedFacetValues, onFacetActionClick}) => {
    const getContent = () => {
        switch (selectedFacetGroup) {
            case 'record_origin':
                return <RecordOrigin selectedFacetValue={selectedFacetValue} />
            case 'primary_type':
                return <RecordType selectedFacetValue={selectedFacetValue} />
            case 'subject_person':
                break;
            case 'date_created':
                return <DateCreated facetValues={facetValues} />
            default:
                break;
        }
    }

    const handleClick = () => {
        if (selectedFacetValues.includes(selectedFacetValue)) {
            onFacetActionClick(selectedFacetValue, "remove")
        } else {
            onFacetActionClick(selectedFacetValue, "add")
        }
    }

    const renderButton = () => (
        selectedFacetValue &&
        <div className={style.ButtonWrapper}>
            <span className={style.Button} onClick={() => handleClick()}>
                {selectedFacetValues.includes(selectedFacetValue) ? 'Remove' : 'Add'} '{selectedFacetValue}' Filter
            </span>
        </div>
    )

    const getButton = () => {
        switch (selectedFacetGroup) {
            case 'record_origin':
                return renderButton()
            case 'primary_type':
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
