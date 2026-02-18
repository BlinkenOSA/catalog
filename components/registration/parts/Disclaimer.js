import style from "./parts.module.scss";

const Disclaimer = () => {
    return (
        <div className={style.Part}>
            <p>
                Archives collect, preserve, and make accessible historical materials for learning and research.
                As the Blinken OSA Archivum preserves records related to Communism and the Cold War, as well as to
                human rights movements and violations, we recognize that some materials in our holdings may be difficult
                to view or read; their content may be violent, sexually explicit, or otherwise disturbing, may use offensive
                or derogatory language, and may include falsehoods or misleading allegations. The Archivum is
                responsible for the authenticity, integrity, reliability, and usability of archival records,
                and not their content.
            </p>
        </div>
    )
}

export default Disclaimer;