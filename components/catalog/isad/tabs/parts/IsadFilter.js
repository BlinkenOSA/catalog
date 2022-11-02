import style from "./IsadFilter.module.scss"
import Select from "rc-select";
import {useEffect, useState} from "react";

const IsadFilter = ({facetName, facets, placeholder, onSelect, value}) => {
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
        <div className={style.SelectWrapper}>
            {
                facets.hasOwnProperty(`${facetName}_facet`) && facets[`${facetName}_facet`].length > 1 ?
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
                /> : ''
            }

        </div>
    )
}

export default IsadFilter;
