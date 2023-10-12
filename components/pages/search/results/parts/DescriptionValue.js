import style from "./DescriptionValue.module.scss";

const DescriptionValue = ({label, value}) => {
    if (value && value !== '') {
        return (
            <div className={style.Description}>
                <div className={style.Label}>{label}:</div>
                <div className={style.Value}>
                    {value}
                </div>
            </div>
        )
    } else {
        return ''
    }
}

export default DescriptionValue;
