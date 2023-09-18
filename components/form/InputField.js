import style from "./InputField.module.scss";
import {getIn} from "formik";

const InputField = ({ field, form, label, required, subLabel, ...props }) => {
    const {name} = field;
    const {disabled} = props;

    const errors = getIn(form.errors, name)
    const touched = getIn(form.touched, name)
    console.log(errors)

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
                !disabled && touched && errors &&
                <div className={style.Error}>{errors}</div>
            }
        </div>
    )
}

export default InputField;
