import style from "./styles.module.scss"
import React from "react";

const Terminology = () => {
    return (
        <>
            <div className={style.Title}>Terms used in the catalog</div>
            <div className={style.Text}>
                <h2>Fonds</h2>
                <p>
                    The records created or accumulated by a person, family or organization in the course of their
                    activities, kept together as a whole.
                </p>
                <h2>Subfonds</h2>
                <p>
                    A subdivision of a fonds, distinguished by factors such as the part of an organization that
                    created the records, their arrangement or their content. Not every fonds has subfonds.
                </p>
                <h2>Series</h2>
                <p>
                    A group of related records within a fonds or subfonds, brought together because they result
                    from the same activity, share a format or follow the same filing system.
                </p>
                <h2>ISAD(G)</h2>
                <p>
                    The General International Standard Archival Description, published by the International Council
                    on Archives. It provides guidance for describing archival materials consistently, from a fonds
                    as a whole to its individual parts.
                </p>
                <h2>Finding aid</h2>
                <p>
                    A guide to archival materials that explains their contents, context and arrangement and helps
                    you identify materials relevant to your research.
                </p>
                <h2>Container</h2>
                <p>
                    A physical storage unit or carrier, such as an archival box or a videotape. Container numbers
                    help you locate folders or items within a series.
                </p>
                <h2>Folder</h2>
                <p>
                    A physical folder holds a group of documents. In the catalog, a folder description tells you
                    about the documents grouped together, rather than the enclosure itself.
                </p>
                <h2>Item</h2>
                <p>
                    An individual document, photograph or recording described as a single unit. An item may be
                    physical or digital.
                </p>
                <h2>Folder / item list</h2>
                <p>
                    A list of the folders and items within a series, arranged in archival order. It helps you
                    identify individual descriptions and locate materials within the series.
                </p>
                <h2>Subject</h2>
                <p>
                    A person, organization or topic that the material concerns. Subject entries in the catalog help
                    you find related materials.
                </p>
                <h2>Contributor</h2>
                <p>
                    A person or organization involved in creating the material, such as an author, crew member,
                    publisher or producer.
                </p>
                <h2>Geographical location</h2>
                <p>
                    A place associated with the material, such as a country or city. These entries appear under
                    ‘Geo Locations’ in the catalog filters.
                </p>
                <h2>Request</h2>
                <p>
                    A submission asking staff to prepare selected materials for consultation. A request can include
                    more than one item, subject to the applicable limits. See
                    {' '}<a href="#request-and-access">Request and access</a> for instructions.
                </p>
            </div>
        </>
    )
}

export default Terminology;
