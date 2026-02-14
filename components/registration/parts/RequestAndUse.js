import style from "./parts.module.scss";

const RequestAndUse = () => {
    return (
        <div className={style.Part}>
            <p>
                The procedures described below are designed to protect the safety and integrity of the documents.
            </p>
            <h2>Archival boxes and library books/periodicals</h2>
            <ul>
                <li>
                You may request up to 10 boxes/books/periodicals at a time.
                </li>
                <li>
                    Use only one box at a time, and remove only one folder at a time. Make sure the order of documents
                    within the folder, as well as the order of folders within the box, is preserved when putting them back.
                </li>
                <li>
                    Preserve the existing order of unbound library material (periodicals, magazines, etc.).
                </li>
                <li>
                    In the case of manuscripts, leave all materials flat on the table. Gloves are required when
                    handling photographs, slides, and objects. Gloves are provided by the Reference Service.
                </li>
                <li>
                    Do not use paper clips, sticky notes, etc. on any document or book.
                </li>
                <li>
                    Do not place books or other objects on archival documents, or apply pressure to them. Be careful
                    when (un)folding the documents.
                </li>
                <li>
                    Do not use a pen or a pencil as a pointer or make marks of any kind on the documents.
                </li>
                <li>
                    Return records to their archival box when you leave the Research Room.
                </li>
                <li>
                    If you have finished working with a box, place it on the reshelve trolley.
                </li>
            </ul>
            <p>
                Specific materials may be subject to additional rules of use.
            </p>
            <h2>Microforms</h2>
            <ul>
                <li>You may have up to 10 microfiches or 10 microfilm reels at a time.</li>
                <li>After using a microfilm, rewind it.</li>
                <li>Remember to switch off the microform reader after use.</li>
                <li>
                    If you have finished working with the microform, place it on the reshelve trolley.
                </li>
            </ul>
            <h2>Audiovisual materials</h2>
            <ul>
                <li>We provide only digital viewing copies.</li>
                <li>You may request up to 10 files at a time.</li>
            </ul>
            <p>
                Further files/items/boxes will be served when you have returned some or all from your previous batch—in
                case of digital materials, notify the Reference Service that your files can be deleted.
            </p>
        </div>
    )
}

export default RequestAndUse;