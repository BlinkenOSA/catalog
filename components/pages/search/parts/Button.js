import style from "./Button.module.scss";

const Button = ({link, text, onClick=false, active=false, disabled}) => {
    if (link) {
        return (
            <a href={link} className={active ? `${style.Link} ${style.Active}` : style.Link}>
                <div className={style.ButtonWithLink}>
                    <span>{text}</span>
                </div>
            </a>
        )
    } else {
        if (onClick) {
            const getClassName = () => {
              if (disabled) {
                return `${style.ButtonWithAction} ${style.Disabled}`
              } else {
                return active ? `${style.ButtonWithAction} ${style.Active}` : style.ButtonWithAction
              }
            }

            return (
                <div className={getClassName()} onClick={onClick}>
                    <span>{text}</span>
                </div>
            )
        } else {
            return (
                <div className={active ? `${style.Button} ${style.Active}` : style.Button}>
                    <span>{text}</span>
                </div>
            )
        }
    }

}

export default Button;
