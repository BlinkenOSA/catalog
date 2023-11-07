import React, {useState} from "react";
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import {useDeepCompareEffect} from "react-use";
import style from './FacetWordCloud.module.scss';

/**
 * Description of the Record Origin facet.
 *
 * @param {Object} params
 * @param {Array} params.facetValues Facet values
 */
const FacetWordCloud = ({facetValues, onFacetActionClick}) => {
    const [words, setWords] = useState([])

    const options = {
        fontFamily: "Suisse Intl Mono",
        colors: ['#AAA', '#BBB', '#CCC', '#DDD', '#EEE', '#FFF'],
        scale: "sqrt",
        padding: 1,
        fontSizes: [12, 40],
        rotations: 3,
        rotationAngles: [0, 90]
    }

    useDeepCompareEffect(() => {
        const values = [];
        facetValues.forEach((fv, idx) => {
            if (idx % 2 === 0) {
                values.push({text: fv, value: facetValues[idx + 1]})
            }
        })
        setWords(values)
    }, [facetValues])

    const handleClick = (callback) => {
        onFacetActionClick(callback['text'], 'add')
    }

    const callbacks = {
        onWordClick: handleClick,
    }

    return (
        <div className={style.WordCloud}>
            <ReactWordcloud words={words} options={options} callbacks={callbacks} />
        </div>
    )
}

export default FacetWordCloud
