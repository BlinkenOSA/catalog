import style from "./FacetDateRange.module.scss";
import {useState} from "react";
import {useDeepCompareEffect} from "react-use";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

/**
 * Displays the selectable facet values belonging to the selected facet group.
 *
 * @param {Object} params
 * @param {Object} params.facetValues Facet results of the search query.
 * @param {string} params.selectedFacetGroup The name of the selected facet group.
 * @param {function} params.onFacetActionClick The handler of facet value change.
 * @param {Object} params.selectedFacetValues The selected facet values.
 */
const FacetDateRange = ({facetValues, selectedFacetGroup, selectedFacetValues, onFacetActionClick}) => {
    const [values, setValues] = useState([1900, 1990])
    const [limits, setLimits] = useState([1950, 2000])

    console.log(selectedFacetValues);

    useDeepCompareEffect(() => {
        setLimits([facetValues[0] === '0' ? Number(facetValues[2]) : Number(facetValues[0]), Number(facetValues[facetValues.length-2])])
    }, [facetValues, selectedFacetGroup]);

    const getMarks = () => {
        let marks = {};
        for (let i = limits[0]; i <= limits[1]; i++) {
            if (i % 50 === 0) {
                marks[i] = i;
            }
        }
        return marks;
    }

    const handleClick = (action) => {
        const val = `${values[0]}-${values[1]}`
        onFacetActionClick(val, action)
    }

    const getAction = () => {
        if (selectedFacetValues.length > 0) {
            return 'remove'
        } else {
            return 'add'
        }
    }

    return (
        <div className={style.FacetDateRange}>
            <div className={style.Title}>
                Creation Date
            </div>
            <div className={style.Values}>
                <div className={style.FromValue}>
                    From: {values[0]}
                </div>
                <div className={style.ToValue}>
                    To: {values[1]}
                </div>
            </div>
            <div className={style.Wrapper}>
                <Slider
                    range
                    className={style.Slider}
                    allowCross={false}
                    step={1}
                    min={limits[0]}
                    max={limits[1]}
                    marks={getMarks()}
                    onChange={setValues}
                    defaultValue={values}
                />
            </div>
            <div className={style.ButtonWrapper}>
                <span className={style.Button} onClick={() => handleClick(getAction())}>
                    {getAction().toUpperCase()} Date Filter
                </span>
            </div>
        </div>
    )
}

export default FacetDateRange;
