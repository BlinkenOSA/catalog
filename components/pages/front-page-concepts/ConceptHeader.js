import React from "react";
import MenuMobile from "../../layout/mobile/MenuMobile";
import style from "./FrontPageConcepts.module.scss";

const ConceptHeader = () => (
    <header className={style.Header}>
        <a className={style.Brand} href="/" aria-label="Blinken OSA Archivum catalog home">
            <img src="/images/osa-logo.svg" alt="Blinken OSA Archivum" />
            <span>Catalog</span>
        </a>
        <nav aria-label="Main navigation">
            <a href="/archival-collections">Browse collections</a>
            <a href="/researchers-guide">Researcher&apos;s Guide</a>
            <a href="/registration">Register</a>
        </nav>
        <div className={style.MobileMenu}>
            <MenuMobile buttonTheme="dark" />
        </div>
    </header>
);

export default ConceptHeader;
