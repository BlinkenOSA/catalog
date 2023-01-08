import {useField, useFormikContext} from "formik";
import style from "./SelectField.module.scss";
import Select from 'rc-select';
import {useEffect, useState} from "react";
import useSWR from "swr";
import {fetcher} from "../../utils/fetcherFunctions";

const SelectField = ({label, subLabel, disabled, required, selectAPI, labelProperty, valueProperty, selectOptions, ...props }) => {
    const { setFieldValue, touched, errors } = useFormikContext();
    const [field] = useField(props);
    const [options, setOptions] = useState([])

    const { data, error } = useSWR(selectAPI, fetcher)

    useEffect(() => {
        if (!selectAPI) {
            if (labelProperty && valueProperty) {
                let newOptions = [];
                selectOptions.forEach(option => {
                    newOptions.push({
                        label: option[labelProperty],
                        value: option[valueProperty]
                    })
                })
                setOptions(newOptions);
            } else {
                setOptions(selectOptions);
            }
        }
    }, [])

    useEffect(() => {
        let newOptions = [];
        if (data) {
            data.forEach(option => {
                newOptions.push({
                    label: option[labelProperty],
                    value: option[valueProperty]
                })
            })
            setOptions(newOptions);
        }
    }, [data])

    const onSelect = (value, option) => {
        setFieldValue(field.name, value);
    }

    return (
        <div className={style.Field}>
            <div className={`${style.Label} ${disabled ? style.Disabled : ''}`}>
                {label}
                {
                    required &&
                    <span className={style.Required}>*</span>
                }
            </div>
            <Select
                name={field.name}
                {...props}
                allowClear={true}
                options={options}
                className={style.Select}
                dropdownClassName={style.DropDown}
                removeIcon={''}
                onSelect={onSelect}
            />
            {
                !disabled && touched[props['name']] && errors[props['name']] &&
                <div className={style.Error}>{errors[props['name']]}</div>
            }
        </div>
    );
};

export default SelectField;
