import style from "./IsadFilter.module.scss"
import Select from "rc-select";
import {useEffect, useState} from "react";

const IsadFilter = ({facetName, facets, placeholder, onSelect, value, isMobile}) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (facets.hasOwnProperty(`${facetName}_facet`)) {
            let optArray = []
            facets[`${facetName}_facet`].forEach((facet, index) => {
                if (index % 2) {
                    optArray.push(
                        {
                            label: `${facets[`${facetName}_facet`][index-1]} (${facet})` ,
                            value: facets[`${facetName}_facet`][index-1]
                        }
                    )
                }
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
                facets.hasOwnProperty(`${facetName}_facet`) &&
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
