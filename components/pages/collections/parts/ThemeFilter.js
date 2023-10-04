import style from "./ThemeFilter.module.scss";
import Select from "rc-select";

const ThemeFilter = ({onSelect, value, isMobile=false}) => {
    const themeOptions = [
        { value: 'Communism & Cold War', label: 'Communism, the Cold War, and their Afterlives'},
        { value: 'Human Rights', label: 'Human Rights and Social Justice'},
        { value: 'Civil Society', label: 'CEU and the Open Society Foundations Network'}
    ]

    const handleSelect = (value) => {
        onSelect(value);
    }

    const handleDeselect = () => {
        onSelect(undefined)
    }

    return (
        <div className={isMobile ? `${style.SelectWrapper} ${style.Mobile}` : style.SelectWrapper}>
            {
                <Select
                    placeholder={'Select Theme...'}
                    allowClear={true}
                    options={themeOptions}
                    className={style.Select}
                    dropdownClassName={style.DropDown}
                    removeIcon={''}
                    value={value}
                    onSelect={handleSelect}
                    onDeselect={handleDeselect}
                />
            }

        </div>
    )
}

export default ThemeFilter;