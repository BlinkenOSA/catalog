import React, {useState} from "react";
import style from "./Header.module.scss";
import SearchBar from "./SearchBar";
import dynamic from "next/dynamic";
import {Collapse} from "react-collapse";
import CollectionsMenu from "./CollectionsMenu";

const NewMenu = dynamic(() => import('./NewMenu'), {
    ssr: false,
})

/**
 * Header of the page.
 */
const Header = () => {
    const [collectionsMenuOpen, setCollectionsMenuOpen] = useState(false)

    const handleMenuOpen = () => {
        console.log(collectionsMenuOpen)
        setCollectionsMenuOpen(!collectionsMenuOpen)
    }

    return (
        <div className={style.Header}>
            <div className={style.HeaderContent}>
                <a href={'/'}>
                    <div className={style.Logo}>
                        <img src={"/images/osa-logo-old-white.svg"} alt={"Blinken OSA Archivum"}/>
                    </div>
                </a>
                <div className={style.SearchBar}>
                    <SearchBar />
                </div>
                <div className={style.Menu}>
                    <NewMenu onMenuOpen={handleMenuOpen}/>
                </div>
            </div>
            <Collapse isOpened={collectionsMenuOpen}>
                <CollectionsMenu />
            </Collapse>
        </div>
    )
}

export default Header;
