import style from "./parts.module.scss";

const Restrictions = () => {
    return (
        <div className={style.Part}>
            <p>
                The Archivum promotes equal and open access, however, access to certain records may be subject to
                restrictions. Besides general restrictions based on the nature of data records may contain, specific
                restrictions are established by the donor and apply to a particular collection or a portion thereof.
            </p>
            <ul>
                <li>Access to restricted materials is conditional on approval by the Access Review Committee.</li>
                <li>
                    When requesting access to restricted material, researchers need to submit the title and topic of
                    their research subjects, and a concise explanation describing how the restricted content will be
                    used.
                </li>
                <li>
                    If approved by the Access Review Committee, researchers are asked to sign a
                    Non Disclosure Agreement.
                </li>
                <li>
                    Restricted material can be accessed only on site in the Research Room.
                </li>
                <li>
                    Unless a specific permission allows, restricted material cannot be scanned, photocopied,
                    photographed, or otherwise duplicated.
                </li>
            </ul>
        </div>
    )
}

export default Restrictions;