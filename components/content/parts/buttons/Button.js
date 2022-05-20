import style from "./Button.module.scss";

const Button = ({link, text}) => {
    if (link) {
        return (
            <a href={link} className={style.Link}>
                <div className={style.Button}>
                    <span>{text}</span>
                </div>
            </a>
        )
    } else {
        return (
            <div className={style.Button}>
                <span>{text}</span>
            </div>
        )
    }

}

export default Button;
