import cssStyle from "./FacetValuesMobile.module.scss";
import FacetSearchMobile from "./FacetSearchMobile";
import {facetConfig} from "../../../config/facetConfig";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDeepCompareEffect, useWindowSize} from "react-use";
import { VariableSizeList as List } from 'react-window';
import { FiInfo } from 'react-icons/fi';

/**
 * Displays the selectable facet values belonging to the selected facet group.
 *
 * @param {Object} params
 * @param {Object} params.facetValues Facet results of the search query.
 * @param {string} params.selectedFacetGroup The name of the selected facet group.
 * @param {Object} params.selectedFacetValues The selected facet values.
 * @param {function} params.onFacetActionClick The handler of facet value change.
 */
const FacetValuesMobile = ({facetValues, selectedFacetGroup, selectedFacetValues,
                      onFacetActionClick, onFacetInfoClick, type}) => {
    const [facetValuesOriginal, setFacetValuesOriginal] = useState([])
    const [facetValuesDisplay, setFacetValuesDisplay] = useState([])
    const [facetValueClicked, setFacetValueClicked] = useState('')

    const listRef = useRef();
    const rowHeights = useRef({});

    const {width} = useWindowSize();

    useDeepCompareEffect(() => {
        const getWikiFacetValue = (value) => {
            return value.split('#')[0]
        }

        const getWikiFacetID = (value) => {
            return value.indexOf('#Q') !== -1 ? `Q${value.split('#Q')[1]}` : ''
        }

        let f = [];
        for (let i = 0; i < facetValues.length; i += 2) {
            f.push({
                value: type === 'list' ? facetValues[i] : getWikiFacetValue(facetValues[i]),
                wiki_id: getWikiFacetID(facetValues[i]),
                number: facetValues[i+1]
            })
        }
        setFacetValuesOriginal(f)
        setFacetValuesDisplay(f)
        setFacetValueClicked('')
    }, [facetValues, selectedFacetGroup]);

    /**
     * Handler of the click event on a facet value.
     *
     * @param {string} value The value of the clicked facet
     * @param {string} action The action of the click: can be "select" or "deselect"
     */
    const handleFacetClick = (value, action) => {
        if (action === 'select') {
            handleFacetSelect(value)
        } else {
            handleFacetDeselect(value)
        }
    }

    /**
     * Select (click) action.
     *
     * @param {string} value The value of the clicked facet.
     */
    const handleFacetSelect = (value) => {
        onFacetActionClick(value, 'add')
    }

    /**
     * Deselection (2nd click) action.
     *
     * @param {string} value The value of the clicked facet.
     */
    const handleFacetDeselect = (value) => {
        if (facetConfig[selectedFacetGroup].hasOwnProperty('info')) {
            if (facetConfig[selectedFacetGroup]['info']) {
                setFacetValueClicked('')
                onFacetActionClick(value, 'remove')
            }
        } else {
            onFacetActionClick(value, 'remove')
        }
    }

    /**
     * Handling searching facets.
     *
     * @param {string} value The value to search. Search will fire after 2 characters.
     */
    const handleSearch = (value) => {
        if (value.length > 2) {
            const matches = facetValuesOriginal.filter(f => f['value'].toLowerCase().includes(value.toLowerCase()));
            setFacetValuesDisplay(matches);
        } else {
            setFacetValuesDisplay(facetValuesOriginal)
        }
    }

    const setRowHeight = useCallback((index, size) => {
        rowHeights.current = { ...rowHeights.current, [index]: size };
        listRef.current.resetAfterIndex(0);
    }, []);

    const getRowHeight = (index) => {
        return rowHeights.current[index] + 14 || 40;
    }

    const Row = ({ index, style }) => {
        const rowRef = useRef({});
        const facet = facetValuesDisplay[index];

        useEffect(() => {
            if (rowRef.current) {
                setRowHeight(index, rowRef.current.clientHeight)
            }
        }, [rowRef]);

        return (
            <div className={`${cssStyle.ValueWrapper} ${selectedFacetValues.includes(facet['value']) ? cssStyle.Selected : ''}`}
                 style={style}>
                <div className={cssStyle.LinkWrapper}
                     onClick={() => {handleFacetClick(facet['value'], selectedFacetValues.includes(facet['value']) ? 'deselect' : 'select')}}>
                    <div
                        className={cssStyle.Value}
                        ref={rowRef}>
                        {facet['value']} <span className={cssStyle.Count}>({facet['number']})</span>
                    </div>
                </div>
                { facet['wiki_id'] !== '' &&
                    <div onClick={() => {onFacetInfoClick(facet)}}
                        className={cssStyle.InfoButton}>
                        <FiInfo />
                    </div>
                }
            </div>
        )
    };


    return (
        <div className={cssStyle.FacetValues}>
            {facetConfig[selectedFacetGroup]['search'] && <FacetSearchMobile onSearch={handleSearch}/>}
            <List
                ref={listRef}
                height={Math.min(400, 40 * facetValuesDisplay.length + 2)}
                itemCount={facetValuesDisplay.length}
                itemSize={getRowHeight}
                width={'100%'}
            >
                {Row}
            </List>
        </div>
    )

}

export default FacetValuesMobile;
