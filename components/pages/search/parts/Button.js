import style from "./Button.module.scss";

const Button = ({link, text, onClick=false, disabled}) => {
    if (link) {
        return (
            <a href={link} className={style.Link}>
                <div className={style.ButtonWithLink}>
                    <span>{text}</span>
                </div>
            </a>
        )
    } else {
        if (onClick) {
            return (
                <div className={disabled ? `${style.ButtonWithAction} ${style.Disabled}` : style.ButtonWithAction} onClick={onClick}>
                    <span>{text}</span>
                </div>
            )
        } else {
            return (
                <div className={style.Button}>
                    <span>{text}</span>
                </div>
            )
        }
    }

}

export default Button;
