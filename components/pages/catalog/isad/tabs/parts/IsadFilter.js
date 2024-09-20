import style from "./IsadFilter.module.scss"
import Select from "rc-select";
import {useEffect, useState} from "react";

const IsadFilter = ({facetName, facets, placeholder, onSelect, value, isMobile}) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (facets.hasOwnProperty(`${facetName}`)) {
            let optArray = []
            Object.keys(facets[facetName]).forEach((facetKey, index) => {
                optArray.push(
                    {
                        label: `${facetKey} (${facets[facetName][facetKey]})`,
                        value: facetKey
                    }
                )
            })
            setOptions(optArray)
        }
    }, [facets])

    const handleSelect = (value) => {
        onSelect(facetName, value)
    }

    const handleDeselect = (value) => {
        onSelect(facetName, '')
    }

    return (
        <div className={isMobile ? `${style.SelectWrapper} ${style.Mobile}` : style.SelectWrapper}>
            {
                <Select
                    placeholder={placeholder}
                    allowClear={true}
                    options={value ? [] : options}
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

export default IsadFilter;
