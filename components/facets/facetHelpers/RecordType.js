import React from "react";
import style from "./FacetHelper.module.scss";

/**
 * Description of the Record Origin facet.
 *
 * @param {Object} params
 * @param {string} params.selectedFacetValue Selected facet value
 */
const RecordType = ({selectedFacetValue}) => {
    const renderFacet = () => {
        switch (selectedFacetValue) {
            case 'Archival Unit':
                return (
                    <React.Fragment>
                        <h2>
                            Archival Unit
                        </h2>
                        <p>
                            Descriptive records of the organizing units of the archives.
                        </p>
                    </React.Fragment>
                )
            case 'Audio':
                return (
                    <React.Fragment>
                        <h2>
                            Audio
                        </h2>
                        <p>
                            Any medium capable of capturing and reproducing an audible signal. Voice recordings, audio cassettes,
                            everything sound related.
                        </p>
                    </React.Fragment>
                )
            case 'Book':
                return (
                    <React.Fragment>
                        <h2>
                            Book
                        </h2>
                        <p>
                            Printed and published books.
                        </p>
                    </React.Fragment>
                )
            case 'Continuing Resource':
                return (
                    <React.Fragment>
                        <h2>
                            Continuing Resource
                        </h2>
                        <p>
                            A continuing resource is a publication that intends to be issued with no predetermined conclusion,
                            and generally carries numbering, dates, or both.
                        </p>
                    </React.Fragment>
                )
            case 'Electronic Record':
                return (
                    <React.Fragment>
                        <h2>
                            Electronic Record
                        </h2>
                        <p>
                            Born digital materials, computer hard disks, files, content originating from computers.
                        </p>
                    </React.Fragment>
                )
            case 'Moving Image':
                return (
                    <React.Fragment>
                        <h2>
                            Moving Image
                        </h2>
                        <p>
                            Visual work that has the appearance of movement. Motion pictures, videos, and other theatrical releases,
                            shorts, news footage (including television newscasts and theatrical newsreels), trailers, out-takes,
                            screen tests, training films, educational material, commercials, spot announcements, home movies,
                            amateur footage, television broadcasts, and unedited footage. These may be in electronic form.
                        </p>
                    </React.Fragment>
                )
            case 'Still Image':
                return (
                    <React.Fragment>
                        <h2>
                            Still Image
                        </h2>
                        <p>
                            A photograph, drawing, painting. A still image is a single static image, as distinguished from a
                            moving image (i.e. a movie). This phrase is used in photography, visual media and the computer industry
                            to emphasize that one is not talking about movies, or in very precise or pedantic technical writing such
                            as a standard.
                        </p>
                    </React.Fragment>
                )
            case 'Textual':
                return (
                    <React.Fragment>
                        <h2>
                            Textual
                        </h2>
                        <p>
                            Pages of printed, typed or handwritten text.
                        </p>
                    </React.Fragment>
                )
        }
    }

    return (
        <div className={style.FacetHelperText}>
            <div className={style.FacetGroup}>
                <h2>Record Type</h2>
                <p>
                    Shows you the type / physical nature of a record.
                </p>
            </div>
            <div className={style.FacetExplanation}>
                {renderFacet()}
            </div>
        </div>
    )
}

export default RecordType
