import style from "./parts.module.scss";

const Disclaimer = () => {
    return (
        <div className={style.Part}>
            <p>
                Archives collect, preserve, and make accessible unique historical materials for learning and research.
                As the Blinken OSA Archivum preserves several archives related to the history of the Cold War and
                human rights violations, we recognize that some materials in our collections are difficult to view
                or read; their content may be violent, sexually explicit, or otherwise disturbing, may use offensive
                or derogatory language, and may include falsehoods or misleading allegations. The Archivum is
                responsible for the reliability, integrity, usability, and authenticity of archival records,
                and not their content.
            </p>
        </div>
    )
}

export default Disclaimer;