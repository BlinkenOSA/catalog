import React from "react";
import style from "./Menu.module.scss";
import { useCart } from "react-use-cart";

/**
 * Top right static menu
 */
const Menu = ({onMenuOpen}) => {
    const { totalUniqueItems } = useCart();

    return (
      <React.Fragment>
        <div className={style.MenuList}>
            <li>
                <a onClick={() => onMenuOpen('collections')}>Collections</a>
            </li>
            <li>
                <a href={'/requests'}>{totalUniqueItems > 0 ? `Requests (${totalUniqueItems})` : 'Requests'}</a>
            </li>
        </div>
      </React.Fragment>
    )
}

export default Menu;
