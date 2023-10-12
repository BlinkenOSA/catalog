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
                <motion.a href={'/archival-collections'} style={{zIndex: 1}}>
                    <li className={style.MenuItem} style={{border: "none"}}>
                        <div className={style.Image}><Image src="/icons/ArchivalUnitBlack.svg" height={20} width={20} /></div>
                        <div className={style.Text}>Archival Collections</div>
                    </li>
                </motion.a>
                <motion.a href={'/library-special-collections'} style={{zIndex: 2}}>
                    <li className={style.MenuItem}>
                        <div className={style.Image}><Image src="/icons/BookIconBlack.svg" height={20} width={20} /></div>
                        <div className={style.Text}>Library Special Collections</div>
                    </li>
                </motion.a>
                <a href={'/image-gallery'} style={{zIndex: 3}}>
                    <li className={style.MenuItem}>
                        <div className={style.Image}><Image src="/icons/TypeStillImage.svg" height={25} width={25} /></div>
                        <div className={style.Text}>Digital Image Gallery</div>
                    </li>
                </a>
                <a href={'/requests'} style={{zIndex: 4}}>
                    <li className={style.MenuItem}>
                        <div className={style.Image}><Image src="/icons/Cart.svg" height={15} width={15} /></div>
                        <div className={style.Text}>Requests</div>
                    </li>
                </a>
            </ul>
        </div>
      </React.Fragment>
    )
}

export default NewMenu;
