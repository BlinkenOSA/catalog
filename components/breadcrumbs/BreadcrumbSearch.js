import React from "react";
import style from "./BreadcrumbSearch.module.scss";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import {useRouter} from "next/router";
import { AiOutlineClose, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import createParams from "../../utils/createParams";

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
     * Removing the facet from the url and from the selectedFacets.
     *
     * @param {string} facetGroup The facet group which is affected by the remove.
     * @param {string} facetValue The actual facet value.
     */
    const onFacetRemove = (facetGroup, facetValue) => {
        let newFacets;

        if (selectedFacets.hasOwnProperty(facetGroup)) {
            if (Array.isArray(selectedFacets[facetGroup])) {
                newFacets = {...selectedFacets}
                newFacets[facetGroup] = selectedFacets[facetGroup].filter(facet => facet !== facetValue)
            } else {
                newFacets = {...selectedFacets}
                delete newFacets[facetGroup]
            }
        } else {
            newFacets = {...selectedFacets}
        }

        router.replace({
            pathname: '/search',
            query: createParams(query, limit, offset, newFacets),
        }, undefined, {shallow: true})
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
            <span>{facetGroup}</span>
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
     * Event fires when query is removed.
     */
    const onQueryRemove = () => {
        router.replace({
            pathname: '/search',
            query: createParams('', limit, offset, selectedFacets),
        }, undefined, {shallow: true})
    }

    /**
     * Rendering the button for the query facet.
     */
    const renderQueryButton = () => {
        if (query && query !== '') {
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

    /**
     * Rendering the right side content part of the breadcrumb.
     */
    const renderRightSideContent = () => {
        if (Object.keys(selectedFacets).length === 0 && query === '') {
            return (
                <div className={style.SearchText}>
                    <span>Search the catalog</span> <BiUpArrowAlt />
                    <span>or browse our most frequent queries</span> <BiDownArrowAlt/>
                </div>
            )
        } else {
            return (
                <div className={style.SelectedFacets}>
                    {renderQueryButton()}
                    {renderSelectedFacets()}
                </div>
            )
        }
    }

    /**
     * Rendering the left side buttons.
     */
    const renderLeftSideContent = () => {
        if (module === 'staticPage' || module === 'collections') {
            return (
                <div className={style.Navigation}>
                    <a href={'/search'}>
                        <AiOutlineLeft /> <span>Back to Catalog</span>
                    </a>
                </div>
            )
        }

        return (
            <div className={style.Navigation}>
                <span>Filter your search</span> <BiDownArrowAlt />
            </div>
        )
    }

    return (
        <div className={inverse ? style.BreadcrumbInverseWrapper : style.BreadcrumbWrapper}>
            <div className={style.BreadcrumbContent}>
                {renderLeftSideContent()}
                {renderRightSideContent()}
            </div>
        </div>
    )
}

export default BreadcrumbSearch;
