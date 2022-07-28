import style from "./CheckboxField.module.scss";
import {Field, useField, useFormikContext} from 'formik';

const CheckboxField = ({label, value, fontSize, ...props}) => {
    const [field] = useField(props);
    const { touched, errors } = useFormikContext();

    return (
        <div className={style.Field}>
            <label className={style.CheckboxLabel} style={{fontSize: `${fontSize}px`, lineHeight: `${fontSize+4}px`}}>
                <Field type="checkbox" name={field.name} className={style.Checkbox} />
                {props.children}
            </label>
            {
                touched[field.name] && errors[field.name] &&
                <div className={style.Error}>{errors[field.name]}</div>
            }
        </div>
    )
}

export default CheckboxField;
