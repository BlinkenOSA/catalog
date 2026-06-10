import style from "./NotFound.module.scss"

const NotFound = ({
    face = '(ノಠ益ಠ)ノ',
    mainText = 'No entries found',
    text = (
        <>
            Try to modifying your search: Use fewer keywords to start,<br/>
            then refine your search using the links on the left.
        </>
    )
}) => {
    return (
        <div className={style.NotFound}>
            <div className={style.NotFoundFace}>{face}</div>
            <div className={style.NotFoundMainText}>{mainText}</div>
            <div className={style.NotFoundText}>
                {text}
            </div>

        </div>
    )
}

export default NotFound;
