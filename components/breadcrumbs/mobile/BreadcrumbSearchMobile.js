import React, {useState} from "react";
import style from "./BreadcrumbSearchMobile.module.scss";
import {BiDownArrowAlt, BiRightArrowAlt, BiUpArrowAlt} from "react-icons/bi";
import {useRouter} from "next/router";
import { AiOutlineClose, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { BiSlider } from "react-icons/bi";
import {createParams, processParams} from "../../../utils/urlParamFunctions";
import {facetConfig} from "../../../config/facetConfig";
import {removeFacet} from "../../../utils/facetFunctions";
import DropDownMobile from "./parts/DropDownMobile";
import PaginationMobile from "./parts/PaginationMobile";
import {defaultLimit} from "../../../config/appConfig";
import dynamic from "next/dynamic";

const BackButton = dynamic(() => import("../parts/BackButton"), {
    ssr: false,
});


/**
 * Breadcrumb component.
 *
 * @param {Object} params
 * @param {string} params.module The name of the module. The display will depend on it. Either it's the front page, or the
 *                        detail one.
 * @param {boolean} params.inverse Define if the menu is in inverse (dark) display mode.
 */
const BreadcrumbSearchMobile = ({reference, module, inverse, total, onSelectFacetGroup}) => {
    const router = useRouter();
    const {query, limit, offset, selectedFacets, selectedFacetsDates} = processParams(router.query)

    const [selectedFacetsOpen, setSelectedFacetsOpen] = useState(true);

    /**
     * Removing the facet from the url and from the selectedFacets.
     *
     * @param {string} facetGroup The facet group which is affected by the remove.
     * @param {string} facetValue The actual facet value.
     */
    const onFacetRemove = (facetGroup, facetValue) => {
        const newFacets = removeFacet(selectedFacets, facetGroup, facetValue)

        router.replace({
            query: createParams(query, limit, 0, newFacets),
        }, undefined, {shallow: false})
    }

    /**
     * Rendering one selected facet button.
     *
     * @param {number} key Key for rendering multiple elements.
     * @param {string} facetGroup The group of the selected facet.
     * @param {string} facetValue The value of the selected facet.
     */
    const renderSelectedFacetButton = (key, facetGroup, facetValue) => (
        <div key={key} className={style.SelectedFacetButton}>
            <span>{facetConfig[facetGroup]['title']}</span>
            <AiOutlineRight size={14} />
            {facetValue}
            <div className={style.SelectedFacetRemove} onClick={() => onFacetRemove(facetGroup, facetValue)}>
                <AiOutlineClose size={14} />
            </div>
        </div>
    )

    /**
     * Rendering the selected facets buttons.
     */
    const renderSelectedFacets = (selection) => (
        Object.keys(selection).map((facetGroup, index) => {
            if (Array.isArray(selection[facetGroup])) {
                return (selection[facetGroup].map((facetValue, index) => (
                    renderSelectedFacetButton(index, facetGroup, facetValue)
                )))
            } else {
                return (
                    renderSelectedFacetButton(index, facetGroup, selection[facetGroup])
                )
            }
        })
    )

    /**
     * Event fires when query is removed.
     */
    const onQueryRemove = () => {
        router.replace({
            query: createParams('', limit, 0, selectedFacets),
        }, undefined, {shallow: true})
    }

    /**
     * Rendering the button for the query facet.
     */
    const renderQueryButton = () => {
        if (query && query !== '' && query !== '*') {
            return (
                <div className={style.SelectedFacetButton}>
                    <span>Search (All Fields)</span>
                    <AiOutlineRight size={14} />
                    {query}
                    <div className={style.SelectedFacetRemove} onClick={() => onQueryRemove()}>
                        <AiOutlineClose size={14} />
                    </div>
                </div>
            )
        }
    }

    const onPerPageChange = (limit) => {
        router.replace({
            query: createParams(query, limit, 0, selectedFacets),
        }, undefined, {shallow: true})
    };

    const onChangePage = (offset) => {
        router.replace({
            query: createParams(query, limit, offset, selectedFacets),
        }, undefined, {shallow: true})
    };

    const renderPerPageModifier = () => {
        const recordsPerPageOptions = [
            {value: 10, label: '10 per page'},
            {value: 20, label: '20 per page'},
            {value: 50, label: '50 per page'},
            {value: 100, label: '100 per page'}
        ];

        return <DropDownMobile onSelect={onPerPageChange} options={recordsPerPageOptions} defaultValue={limit ? Number(limit) : defaultLimit}/>;
    }

    /**
     * Rendering the right side content part of the breadcrumb.
     */
    const renderRightSideContent = () => {
        if (module === 'staticPage' || module === 'collections' || module === 'detail') {
            return ''
        }

        if (inverse) {
            return (
                <div className={style.FilterButtonInverse} onClick={() => onSelectFacetGroup('')}>
                    <BiSlider />
                </div>
            )
        } else {
            return (
                <div className={style.FilterButton} onClick={() => onSelectFacetGroup('record_origin')}>
                    <BiSlider />
                </div>
            )
        }
    }

    /**
     * Rendering the left side buttons.
     */
    const renderLeftSideContent = () => {
        if (module === 'staticPage' || module === 'collections' || module === 'detail') {
            return <BackButton />
        }

        if (inverse) {
            return (
                <div className={`${style.Navigation} ${style.Inverse}`}>

                </div>
            )
        } else {
            if (Object.keys(selectedFacets).length === 0 && query === '') {
                return (
                    <div className={style.Navigation}>
                        <span>Filter your search</span> <BiRightArrowAlt />
                    </div>
                )
            } else {
                return (
                    <React.Fragment>
                        <PaginationMobile
                            limit={limit}
                            offset={offset}
                            total={total}
                            onChangePage={onChangePage}
                        />
                        <div className={style.ResultModifiersWrapper}>
                            {renderPerPageModifier()}
                        </div>
                    </React.Fragment>
                )
            }
        }
    }

    const getSelectedFacetNumber = () => {
        let count = 0;
        Object.keys(selectedFacets).forEach(key => {
            count += Array.isArray(selectedFacets[key]) ? selectedFacets[key].length : 1
        })
        Object.keys(selectedFacetsDates).forEach(key => {
            count += Array.isArray(selectedFacetsDates[key]) ? selectedFacetsDates[key].length : 1
        })
        if (query !== '' && query !== '*') {
            count += 1;
        }
        return count;
    }

    const renderSelectedFacetsContent = () => {
        if (getSelectedFacetNumber() === 0 && (query === '' || query === '*')) {
            return ''
        } else {
            return (
                <div className={inverse ? `${style.SelectedFacetsWrapper} ${style.Inverse}` : `${style.SelectedFacetsWrapper}`}>
                    <div className={selectedFacetsOpen ? style.SelectedFacets : `${style.SelectedFacets} ${style.Closed}`}>
                        {renderQueryButton()}
                        {renderSelectedFacets(selectedFacetsDates)}
                        {renderSelectedFacets(selectedFacets)}
                        {
                            getSelectedFacetNumber() > 1 &&
                            <div className={style.Opener} onClick={() => setSelectedFacetsOpen(!selectedFacetsOpen)}>
                                <i className={selectedFacetsOpen ? style.UpArrow : style.DownArrow}/>
                            </div>
                        }
                    </div>
                </div>
            )
        }
    }

    /**
     * Render
     */
    return (
        <React.Fragment>
            <div
                ref={reference}
                className={inverse ? style.BreadcrumbInverseWrapper : style.BreadcrumbWrapper}>
                <div className={style.BreadcrumbContent}>
                    {renderLeftSideContent()}
                    {renderRightSideContent()}
                </div>
            </div>
            {renderSelectedFacetsContent()}
        </React.Fragment>
    )
}

export default BreadcrumbSearchMobile;
