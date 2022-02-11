import React from "react";
import style from "./BreadcrumbSearch.module.scss";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";


const BreadcrumbSearch = ({module, inverse}: {
        module: string,
        inverse?: boolean
    }) => {
    return (
        <div className={inverse ? style.BreadcrumbInverseWrapper : style.BreadcrumbWrapper}>
            <div className={style.BreadcrumbContent}>
                <div className={style.Navigation}>
                    <span>Filter your search</span> <BiDownArrowAlt />
                </div>
                <div className={style.SearchText}>
                    <span>Search the catalog</span> <BiUpArrowAlt />
                    <span>or browse our most frequent queries</span> <BiDownArrowAlt/>
                </div>
            </div>
        </div>
    )
}

export default BreadcrumbSearch;
