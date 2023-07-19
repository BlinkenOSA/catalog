import React from "react";
import style from "./FacetHelper.module.scss";

/**
 * Description of the Record Origin facet.
 *
 * @param {Object} params
 * @param {string} params.selectedFacetValue Selected facet value
 */
const RecordOrigin = ({selectedFacetValue}) => {
    const renderFacet = () => {
        switch (selectedFacetValue) {
            case 'Digitally Anywhere / With Registration':
                return (
                    <React.Fragment>
                        <h2>
                            Digitally Anywhere / With Registration
                        </h2>
                        <p>
                          These materials are existing in a digital format, but because of access rights restrictions,
                          they can be only served through our Research Cloud system. To access these materials, please
                          register first, add them to your Request Cart and send the request to us.
                        </p>
                    </React.Fragment>
                )
            case 'Digitally Anywhere / Without Registration':
                return (
                    <React.Fragment>
                        <h2>
                            Digitally Anywhere / Without Registration
                        </h2>
                        <p>
                          These materials are directly available from our catalog. If you open the record you will see a
                          viewer based on the format of the material.
                        </p>
                    </React.Fragment>
                )
            case 'In the Research Room':
                return (
                    <React.Fragment>
                        <h2>
                            In the Research Room
                        </h2>
                        <p>
                            These materials are only available in an analog format (physical paper, photos, VHS tapes, etc.
                            and can only be accessed from our Research Room at the Blinken OSA Archivum building. (Budapest,
                            Arany Janos u. 32.)
                        </p>
                        <p>
                            Before visiting, don't forget to register and add the materials to your Request Cart and the request to us.
                        </p>
                    </React.Fragment>
                )
        }
    }

    return (
        <div className={style.FacetHelperText}>
            <div className={style.FacetGroup}>
                <h2>Availability</h2>
                <p>
                    Filter criteria on how to access the materials.
                </p>
            </div>
            <div className={style.FacetExplanation}>
                {renderFacet()}
            </div>
        </div>
    )
}

export default RecordOrigin
