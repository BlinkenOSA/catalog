import React from "react";
import style from "./NewMenu.module.scss";
import { useCart } from "react-use-cart";
import Image from "next/image";
import {motion} from "framer-motion";

/**
 * Top right static menu
 */
const NewMenu = ({onMenuOpen}) => {
    const { totalUniqueItems } = useCart();

    return (
      <React.Fragment>
        <div className={style.MenuList}>
            <ul>
                <a href={'/archival-collections'} >
                    <li className={style.MenuItem}>
                        <div>Archival Collections</div>
                        <Image src="/icons/ArchivalUnitBlack.svg" height={20} width={20} />
                    </li>
                </a>
                <a href={'/library-special-collections'} >
                    <li className={style.MenuItem}>
                        <div>Library Special Collections</div>
                        <Image src="/icons/BookIconBlack.svg" height={20} width={20} />
                    </li>
                </a>
                <a href={'/image-gallery'} >
                    <li className={style.MenuItem}>
                        <div>Digital Image Gallery</div>
                        <Image src="/icons/TypeStillImage.svg" height={20} width={20} />
                    </li>
                </a>
                <a href={'/requests'} >
                    <li className={style.MenuItem}>
                        <div>Requests</div>
                        <Image src="/icons/Cart.svg" height={17} width={17} />
                    </li>
                </a>
            </ul>
        </div>
      </React.Fragment>
    )
}

export default NewMenu;
