import React, {useState} from "react";
import style from "./Header.module.scss";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import {Collapse} from "react-collapse";
import CollectionsMenu from "./CollectionsMenu";

const Menu = dynamic(() => import('./Menu'), {
    ssr: false,
})

/**
 * Header of the page.
 */
const Header = () => {
    const [collectionsMenuOpen, setCollectionsMenuOpen] = useState(false)

    const handleMenuOpen = (menu) => {
        setCollectionsMenuOpen(!collectionsMenuOpen)
    }

    return (
        <div className={style.Header}>
            <div className={style.HeaderContent}>
                <a href={'/'}>
                    <div className={style.Logo}>
                        <img src={"/images/osa-logo.png"} alt={"Vera and Donald Blinken Open Society Archives"}/>
                    </div>
                </a>
                <div className={style.SearchBar}>
                    <SearchBar />
                </div>
                <div className={style.Menu}>
                    <Menu onMenuOpen={handleMenuOpen}/>
                </div>
            </div>
            <Collapse isOpened={collectionsMenuOpen}>
                <CollectionsMenu />
            </Collapse>
        </div>
    )
}

export default Header;
