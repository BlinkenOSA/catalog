import React from "react";
import style from "./Menu.module.scss";

const Menu = () => {
    return (
        <ul className={style.MenuList}>
            <li>
                <a href={'/collections'}>OSA Collection</a>
            </li>
            <li>
                <a href={'/cart'}>Cart</a>
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
