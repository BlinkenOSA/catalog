import style from "./IsadContentNotFound.module.scss"

const IsadContentNotFound = () => {
    return (
        <div className={style.NotFound}>
            <div className={style.NotFoundFace}>(ノಠ益ಠ)ノ</div>
            <div className={style.NotFoundMainText}>No entries in this series</div>
            <div className={style.NotFoundText}>
                It seems that this series is not processed yet, or the processed items are not
                visible for public due to copyright reasons.
            </div>

        </div>
    )
}

export default IsadContentNotFound;
