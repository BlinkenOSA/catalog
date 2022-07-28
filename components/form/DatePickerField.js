import {useField, useFormikContext} from "formik";
import DatePicker from "react-datepicker";
import style from "./DatePickerField.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerField = ({label, disabled, required, ...props }) => {
    const { setFieldValue, touched, errors } = useFormikContext();
    const [field] = useField(props);

    return (
        <div className={style.Field}>
            <div className={`${style.Label} ${disabled ? style.Disabled : ''}`}>
                {label}
                {
                    required &&
                    <span className={style.Required}>*</span>
                }
            </div>
            <DatePicker
                {...field}
                {...props}
                disabled={disabled}
                wrapperClassName={style.DatePickerField}
                popperClassName={style.DatePickerCalendar}
                dateFormat="yyyy-MM-dd"
                selected={(field.value && new Date(field.value)) || null}
                onChange={val => {
                    setFieldValue(field.name, val);
                }}
            />
            {
                !disabled && touched[props['name']] && errors[props['name']] &&
                <div className={style.Error}>{errors[props['name']]}</div>
            }
        </div>
    );
};

export default DatePickerField;
