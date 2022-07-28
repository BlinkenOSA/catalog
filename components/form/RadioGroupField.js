import style from "./RadioGroupField.module.scss";
import {Field, useField, useFormikContext} from 'formik';

const RadioGroupField = ({label, subLabel, required, disabled, options, ...props}) => {
    const [field] = useField(props);
    const { touched, errors } = useFormikContext();

    return (
        <div className={style.Field}>
            {
                label ?
                <div className={`${style.Label} ${disabled ? style.Disabled : ''}`}>
                    {label}
                    {subLabel &&
                        <span className={style.SubLabel}>{subLabel}</span>
                    }
                    {
                        required &&
                        <span className={style.Required}>*</span>
                    }
                </div> : <div className={style.Label} />
            }
            <div className={style.RadioWrapper}>
            {
                options &&
                options.map((option, key) => {
                    return (
                        <label key={key} className={style.RadioLabel}>
                            <Field type="radio" name={field.name} value={option['value']} className={style.Radio} />
                            {option['label']}
                        </label>
                    )
                })
            }
            </div>
            {
                touched[field.name] && errors[field.name] &&
                <div className={style.Error}>{errors[field.name]}</div>
            }
        </div>
    )
}

export default RadioGroupField;
