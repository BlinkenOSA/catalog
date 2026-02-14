import style from "./parts.module.scss";

const ReproductionAndReUse = () => {
    return (
        <div className={style.Part}>
            <ul>
                <li>
                    Unless otherwise noted, researchers in the Research Room may scan or photograph non-restricted
                    archival documents solely for non-commercial research and educational purposes in low-resolution
                    format.
                </li>
                <li>
                    Unless otherwise noted, the Archivum does not hold the copyrights of archival documents in
                    its holdings.
                </li>
                <li>
                    It is the responsibility of the researcher to clear intellectual property and personal rights,
                    and manage royalties. If a researcher obtained publication rights to archival documents
                    preserved at the Archivum, they are asked to follow the Citation Guideline available on
                    the institutional website.
                </li>
                <li>
                    There may be further legal or donor-defined restrictions on specific materials.
                </li>
            </ul>
        </div>
    )
}

export default ReproductionAndReUse;