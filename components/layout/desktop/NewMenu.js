import React from "react";
import style from "./NewMenu.module.scss";
import { useCart } from "react-use-cart";
import Image from "next/image";
import {} from "react-icons"

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
                        <span>Archival Collections</span>
                        <Image src="/icons/Cart.svg" height={20} width={20} />
                    </li>
                </a>
                <a href={'/library-special-collections'} >
                    <li className={style.MenuItem}>
                        <Image src="/icons/BookIconBlack.svg" height={25} width={25} />
                    </li>
                </a>
                <a href={'/image-gallery'} >
                    <li className={style.MenuItem}>
                        <Image src="/icons/TypeStillImage.svg" height={25} width={25} />
                    </li>
                </a>
                <a href={'/requests'} >
                    <li className={style.MenuItem}>
                        <Image src="/icons/Cart.svg" height={20} width={20} />
                    </li>
                </a>
            </ul>
        </div>
      </React.Fragment>
    )
}

export default NewMenu;
