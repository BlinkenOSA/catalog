import style from "./InputField.module.scss";

const InputField = ({ field, form, label, required, subLabel, ...props }) => {
    const {name} = field;
    const {touched, errors} = form;
    const {disabled} = props;

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
            <input {...field} {...props} />
            {
                !disabled && touched[name] && errors[name] &&
                <div className={style.Error}>{errors[name]}</div>
            }
        </div>
    )
}

export default InputField;
