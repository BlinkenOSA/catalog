import style from "./styles.module.scss"

const Terminology = () => {
    return (
        <>
            <div className={style.Text}>
                <h2>Fonds</h2>
                <p>
                    The entire body of records of an organization, family, or individual that have been created and
                    accumulated as the result of an organic process reflecting the functions of the creator
                </p>
                <h2>Subfonds</h2>
                <p>
                    A body of documents within a fond readily distinguished from the whole by filing arrangement,
                    type, form, or content.
                </p>
                <h2>Series</h2>
                <p>
                    A group of similar records that are arranged according to a filing system and that are related as the
                    result of being created, received, or used in the same activity; a file group; a record series.
                </p>
                <h2>ISAD(G)</h2>
                <p>
                    A standard published by the International Council on Archives that establishes general rules for
                    the description of archival materials, regardless of format, to promote consistent and sufficient
                    descriptions, and to facilitate exchange and integration of those descriptions.
                </p>
                <h2>Finding Aids</h2>
                <p>
                    A description that typically consists of contextual and structural information about an
                    archival resource.
                </p>
                <h2>Container</h2>
                <p>
                    A package or housing used to hold materials; a receptacle.
                </p>
                <h2>Folder</h2>
                <p>A sheet of heavy paper stock or cardboard, scored near the middle, its halves bent so they rest
                    side by side, and used as a loose cover to keep documents and other flat materials together,
                    especially for purposes of filing</p>
                <h2>Item</h2>
                <p>A thing that can be distinguished from a group and that is complete in itself.</p>
                <h2>Folder / Item list</h2>
                <p>
                    That part of a completed finding aid or a rudimentary finding aid that lists the folder titles
                    in a collection.
                </p>
            </div>
        </>
    )
}

export default Terminology;