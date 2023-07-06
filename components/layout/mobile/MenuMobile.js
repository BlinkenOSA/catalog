import React, {useState} from 'react';
import style from "./MenuMobile.module.scss";
import {useCart} from "react-use-cart";

const MenuMobile = () => {
    const { totalUniqueItems } = useCart();
    const [menuOpen, setMenuOpen] = useState(false)

    const onMenuButtonClick = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <React.Fragment>
            <div className={menuOpen ? `${style.MenuButton} ${style.Opened}` : style.MenuButton} onClick={onMenuButtonClick}>
                <span> </span>
                <span> </span>
                <span> </span>
                <span> </span>
            </div>
            <div className={menuOpen ? `${style.Menu} ${style.Opened}` : style.Menu}>
                <div className={style.MenuList}>
                    <a href={'#'}>Collections</a>
                    <a className={style.Submenu} href={'/archival-collections'}>Archival Collections</a>
                    <a className={style.Submenu} href={'/library-special-collections'}>Library Sepcial Collections</a>
                    <a className={style.Submenu} href={'/special-collections-in-film-library'}>Special Collections in Film Library</a>
                    <a href={'/requests'}>{totalUniqueItems > 0 ? `Requests (${totalUniqueItems})` : 'Requests'}</a>
                    <a href={'/info'}>Infos</a>
                    <a href={'/privacy-policy'}>Privacy Policy</a>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MenuMobile;
