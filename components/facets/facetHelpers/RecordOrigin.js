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
            case 'Archives':
                return (
                    <React.Fragment>
                        <h2>
                            Archives
                        </h2>
                        <p>
                            Archival content which exists in it's physical form (Documents in boxes, VHS tapes,
                            Photos, etc.). Their organisation is hierarchical and their description is following the
                            ISAD(G) international standard.
                        </p>
                    </React.Fragment>
                )
            case 'Film Library':
                return (
                    <React.Fragment>
                        <h2>
                            Film Library
                        </h2>
                        <p>
                            OSA’s non-circulating Film Library holds an unparalleled range of classic and rare fiction and
                            nonfiction works in almost 100 languages, among them documentary, propaganda, and educational
                            films related to Soviet and East European history and culture, focusing on the Cold War,
                            Communism, and totalitarianism, as well as international human rights abuses and war crimes.
                            The Library also contains all films submitted to the Verzio International Human Rights Documentary
                            Film Festival.
                        </p>
                        <p>
                            Our films come from various sources, from individual donors, national film and television archives,
                            and public vendors. Some have English subtitles, while others are available only in their original
                            languages.
                        </p>
                    </React.Fragment>
                )
            case 'Library':
                return (
                    <React.Fragment>
                        <h2>
                            Library
                        </h2>
                        <p>
                            Blinken OSA Library houses a non-circulating reference library of books related to the Cold War,
                            Communism, international human rights, history of broadcasting and the archival profession as well as
                            a collection of more than 7.300 dailies and journals published from the 1950s onwards in 40 languages.
                            It also offers special thematic collections on microforms and rare publications from the region
                            including numerous titles of informal and regional press and ephemera.
                        </p>
                        <p>
                            Most of the library items originate from the Research Institute of RFE/RL, and from other
                            institutional and private donations.
                        </p>
                    </React.Fragment>
                )
        }
    }



    return (
        <div className={style.FacetHelperText}>
            <div className={style.FacetGroup}>
                <h2>Record Origin</h2>
                <p>
                    Shows you from where the listed record is originating from.
                </p>
            </div>
            <div className={style.FacetExplanation}>
                {renderFacet()}
            </div>
        </div>
    )
}

export default RecordOrigin
