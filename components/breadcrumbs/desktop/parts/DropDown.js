import style from './DropDown.module.scss';
import Select, { Option } from 'rc-select';

/**
 *
 * @param {Object} params
 * @param {Array} options Array of options in the form of {value: value, level: level}
 * @param {string | number} defaultValue The default selection.
 */
const DropDown = ({options, defaultValue, onSelect}) => {
    return (
        <div className={style.DropDownWrapper}>
            <Select
                showSearch={false}
                className={style.Select}
                dropdownClassName={style.DropDown}
                defaultValue={defaultValue}
                options={options}
                onSelect={onSelect}
            />
        </div>
    )
}

export default DropDown;
