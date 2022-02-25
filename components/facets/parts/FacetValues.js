import style from "./FacetValues.module.scss";
import FacetSearch from "./FacetSearch";
import {facetValues} from "../../../utils/facetValues";
import {facetConfig} from "../../../config/facetConfig";
import {useRouter} from "next/router";
import createParams from "../../../utils/createParams";
import {useState} from "react";

/**
 * Displays the selectable facet values belonging to the selected facet group.
 *
 * @param {Object} params
 * @param {string} params.selectedFacetGroup The name of the selected facet group.
 */
const FacetValues = ({selectedFacetGroup}) => {
    const [facets, setFacets] = useState(facetValues[selectedFacetGroup])

    const router = useRouter();
    const {query, limit, offset, ...selectedFacets} = router.query;

    /**
     * Handler of adding the facetValue.
     *
     * @param value The value to be added to the selectedFacets. It will be added to the page URL params.
     */
    const addFacetValue = (value) => {
        if (selectedFacets.hasOwnProperty(selectedFacetGroup)) {
            if (Array.isArray(selectedFacets[selectedFacetGroup])) {
                selectedFacets[selectedFacetGroup].push(value)
            } else {
                selectedFacets[selectedFacetGroup] = [selectedFacets[selectedFacetGroup], value]
            }
        } else {
            selectedFacets[selectedFacetGroup] = value
        }

        router.replace({
            pathname: '/search',
            query: createParams(query, limit, offset, selectedFacets),
        }, undefined, {shallow: true});
    };

    /**
     * Rendering the selected facet buttons.
     */
    const renderFacetButtons = () => {
        return (
            facets.map((facet, index) => (
                <li
                    key={index}
                    onClick={() => {addFacetValue(facet['value'])}}
                >
                    <span>{facet['value']}</span>
                    <span className={style.Count}>({facet['count']})</span>
                    <div className={style.Button} />
                </li>
            ))
        )
    }

    const handleSearch = (value) => {
        if (value.length > 2) {
            const matches = facetValues[selectedFacetGroup].filter(f => f['value'].toLowerCase().includes(value.toLowerCase()));
            setFacets(matches);
        } else {
            setFacets(facetValues[selectedFacetGroup])
        }
    }

    if (facetValues.hasOwnProperty(selectedFacetGroup)) {
        return (
            <div className={style.FacetValues}>
                {facetConfig[selectedFacetGroup]['search'] && <FacetSearch onSearch={handleSearch}/>}
                <ul>
                    {renderFacetButtons()}
                </ul>
            </div>
        )
    } else {
        return (<span/>)
    }
}

export default FacetValues;
