import style from "./NotFound.module.scss"

const NotFound = () => {
    return (
        <div className={style.NotFound}>
            <div className={style.NotFoundFace}>(ノಠ益ಠ)ノ</div>
            <div className={style.NotFoundMainText}>No entries found</div>
            <div className={style.NotFoundText}>
                Try to modifying your search: Use fewer keywords to start,<br/>
                then refine your search using the links on the left.
            </div>

        </div>
    )
}

export default NotFound;
