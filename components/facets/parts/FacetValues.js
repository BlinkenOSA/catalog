import style from "./FacetValues.module.scss";
import FacetSearch from "./FacetSearch";
import {facetValues} from "../../../utils/facetValues";
import {facetConfig} from "../../../config/facetConfig";
import {useRouter} from "next/router";

/**
 * Displays the selectable facet values belonging to the selected facet group.
 *
 * @param {Object} params
 * @param {string} params.selectedFacetGroup The name of the selected facet group.
 */
const FacetValues = ({selectedFacetGroup}) => {

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

        const params = {...query, ...limit, ...offset, ...selectedFacets}

        router.replace({
            pathname: '/search',
            query: params
        }, undefined, {shallow: true});
    };

    /**
     * Rendering the selected facet buttons.
     */
    const renderFacetButtons = () => {
        const facets = facetValues[selectedFacetGroup];

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

    if (facetValues.hasOwnProperty(selectedFacetGroup)) {
        return (
            <div className={style.FacetValues}>
                {facetConfig[selectedFacetGroup]['search'] && <FacetSearch/>}
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
