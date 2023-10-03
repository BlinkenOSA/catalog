import React, {useState} from "react";
import style from "./HeaderMobile.module.scss";
import SearchBarMobile from "./SearchBarMobile";
import Image from "next/image";
import {useCart} from "react-use-cart";
import MenuMobile from "./MenuMobile";

/**
 * Header of the page.
 */
const HeaderMobile = () => {
    const { totalUniqueItems } = useCart();

    return (
        <React.Fragment>
            <MenuMobile />
            <div className={style.Header}>
                <div className={style.HeaderContent}>
                    <a href={'/'}>
                        <div className={style.Logo}>
                            <img src={"/images/osa-logo-old-white.svg"} alt={"Blinken OSA Archivum"}/>
                        </div>
                    </a>
                    <div className={style.Menu}>
                        <a href={'/requests'} >
                            <Image src="/icons/Cart.svg" height={20} width={20} />
                            <div className={style.RequestItems}>{totalUniqueItems}</div>
                        </a>
                    </div>
                </div>
                <div className={style.SearchBar}>
                    <SearchBarMobile />
                </div>
            </div>
        </React.Fragment>
    )

}

export default HeaderMobile;
