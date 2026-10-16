import React, {useState} from 'react';
import style from "./MenuMobile.module.scss";
import {useCart} from "react-use-cart";

const MenuMobile = ({buttonTheme = 'light'}) => {
    const { totalUniqueItems } = useCart();
    const [menuOpen, setMenuOpen] = useState(false)

    const onMenuButtonClick = () => {
        setMenuOpen(!menuOpen);
    }

    const menuButtonClassName = [
        style.MenuButton,
        menuOpen ? style.Opened : '',
        buttonTheme === 'dark' && !menuOpen ? style.Dark : '',
    ].filter(Boolean).join(' ');

    return (
        <React.Fragment>
            <button
                type="button"
                className={menuButtonClassName}
                onClick={onMenuButtonClick}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu-panel"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
                <span aria-hidden="true"> </span>
                <span aria-hidden="true"> </span>
                <span aria-hidden="true"> </span>
                <span aria-hidden="true"> </span>
            </button>
            <div
                id="mobile-menu-panel"
                className={menuOpen ? `${style.Menu} ${style.Opened}` : style.Menu}
                aria-hidden={!menuOpen}
            >
                <div style={{flex: 1}}></div>
                <div className={style.MenuList}>
                    <a href={'#'}>Collections</a>
                    <a className={style.Submenu} href={'/archival-collections'}>Archival Collections</a>
                    <a className={style.Submenu} href={'/library-special-collections'}>Library Special Collections</a>
                    <a className={style.Submenu} href={'/image-gallery'}>Digital Image Gallery</a>
                    <a href={'/registration'}>Researcher Registration</a>
                    <a href={'/requests'}>{totalUniqueItems > 0 ? `Requests (${totalUniqueItems})` : 'Requests'}</a>
                    <a href={'/privacy-policy'}>Privacy Policy</a>
                    <a href={'/researchers-guide'}>Researcher's Guide</a>
                </div>
                <div style={{flex: 1}}></div>
            </div>
        </React.Fragment>
    )
}

export default MenuMobile;
