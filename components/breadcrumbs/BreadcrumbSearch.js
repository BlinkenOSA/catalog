import React from "react";
import style from "./BreadcrumbSearch.module.scss";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import {useRouter} from "next/router";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";

/**
 * Breadcrumb component.
 *
 * @param {Object} params
 * @param {string} params.module The name of the module. The display will depend on it. Either it's the front page, or the
 *                        detail one.
 * @param {boolean} params.inverse Define if the menu is in inverse (dark) display mode.
 */
const BreadcrumbSearch = ({module, inverse}) => {

    const router = useRouter();
    const {query, limit, offset, ...selectedFacets} = router.query;

    /**
     * Rendering one selected facet button.
     *
     * @param {number} key Key for rendering multiple elements.
     * @param {string} facetGroup The group of the selected facet.
     * @param {string} facetValue The value of the selected facet.
     */
    const renderSelectedFacetButton = (key, facetGroup, facetValue) => (
        <div key={key} className={style.SelectedFacetButton}>
            <span>{facetGroup}</span>
            <AiOutlineRight size={14} />
            {facetValue}
            <div className={style.SelectedFacetRemove} onClick={() => onFacetRemove()}>
                <AiOutlineClose size={14} />
            </div>
        </div>
    )

    /**
     * Rendering the selected facets buttons.
     */
    const renderSelectedFacets = () => (
        Object.keys(selectedFacets).map((facetGroup, index) => {
            if (Array.isArray(selectedFacets[facetGroup])) {
                return (selectedFacets[facetGroup].map((facetValue, index) => (
                    renderSelectedFacetButton(index, facetGroup, facetValue)
                )))
            } else {
                return (
                    renderSelectedFacetButton(index, facetGroup,selectedFacets[facetGroup])
                )
            }
        })
    )

    /**
     * Rendering the right side content part of the breadcrumb.
     */
    const renderRightSideContent = () => {
        if (Object.keys(selectedFacets).length > 0) {
            return (
                <div className={style.SelectedFacets}>
                    {renderSelectedFacets()}
                </div>
            )
        } else {
            return (
                <div className={style.SearchText}>
                    <span>Search the catalog</span> <BiUpArrowAlt />
                    <span>or browse our most frequent queries</span> <BiDownArrowAlt/>
                </div>
            )
        }
    }

    return (
        <div className={inverse ? style.BreadcrumbInverseWrapper : style.BreadcrumbWrapper}>
            <div className={style.BreadcrumbContent}>
                <div className={style.Navigation}>
                    <span>Filter your search</span> <BiDownArrowAlt />
                </div>
                {renderRightSideContent()}
            </div>
        </div>
    )
}

export default BreadcrumbSearch;
