import React from "react";
import style from "./Menu.module.scss";
import { useCart } from "react-use-cart";

/**
 * Top right static menu
 */
const Menu = () => {
    const { totalUniqueItems } = useCart();

    return (
        <ul className={style.MenuList}>
            <li>
                <a href={'/archival-collections'}>OSA Collection</a>
            </li>
            <li>
                <a href={'/cart'}>{totalUniqueItems > 0 ? `Cart (${totalUniqueItems})` : 'Cart'}</a>
            </li>
            <li>
                <a href={'/info'}>Infos</a>
            </li>
            <li>
                <a href={'/privacy-policy'}>Privacy Policy</a>
            </li>
        </ul>
    )
}

export default Menu;
