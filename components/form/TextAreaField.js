import style from "./TextAreaField.module.scss";

const TextAreaField = ({ field, form, label, subLabel, ...props }) => {
    const {name} = field;
    const {touched, errors} = form;
    const {required, disabled} = props;

    return (
        <div className={style.Field}>
            <div className={`${style.Label} ${disabled ? style.Disabled : ''}`}>
                {label}
                {   subLabel &&
                    <span className={style.SubLabel}>{subLabel}</span>
                }
                {
                    required &&
                    <span className={style.Required}>*</span>
                }
            </div>
            <textarea {...field} {...props} />
            {
                !disabled && touched[name] && errors[name] &&
                <div className={style.Error}>{errors[name]}</div>
            }
        </div>
    )
}

export default TextAreaField;
