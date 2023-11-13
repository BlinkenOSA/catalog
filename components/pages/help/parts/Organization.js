import React from 'react';
import style from "./styles.module.scss"
import PrimaryTypeButton from "../../search/parts/PrimaryTypeButton";
import {HiOutlineArrowNarrowRight, HiOutlineArrowNarrowDown} from 'react-icons/hi'


const Organization = ({isMobile}) => {
    const getUnitsDrawing = () => {
        return (
            <div className={isMobile ? `${style.UnitButtonsWrap} ${style.Mobile}` : style.UnitButtonsWrap}>
                <div className={style.UnitButton}>Fonds</div>
                <div className={style.Arrow}>{isMobile ? <HiOutlineArrowNarrowDown/> : <HiOutlineArrowNarrowRight/>}</div>
                <div className={style.UnitButton}>Subfonds</div>
                <div className={style.Arrow}>{isMobile ? <HiOutlineArrowNarrowDown/> : <HiOutlineArrowNarrowRight/>}</div>
                <div className={style.UnitButton}>Series</div>
                <div className={style.Arrow}>{isMobile ? <HiOutlineArrowNarrowDown/> : <HiOutlineArrowNarrowRight/>}</div>
                <div className={style.UnitButton}>Container</div>
                <div className={style.Arrow}>{isMobile ? <HiOutlineArrowNarrowDown/> : <HiOutlineArrowNarrowRight/>}</div>
                <div className={style.UnitButton}>Folders / Items</div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <div className={style.Title}>Organization of records in the archive</div>
            <div className={style.Text}>
                <p>
                    To effectively manage and organize large archival collections, a hierarchical description and
                    grouping of materials is used. Hierarchical description is a technique for writing contextual and
                    structural information about an archival resource by describing the collection from the general to
                    the specific, starting with the whole and then proceeding to the components. Blinken OSA Archivum
                    uses the following levels of description:
                </p>
                <p>
                    {getUnitsDrawing()}
                </p>
                <p>
                    <h2>Fonds</h2>
                    <p>
                        The entire body of records of an organization, family, or individual created and accumulated as
                        the result of an organic process reflecting the creator's functions.
                    </p>
                    <h2>Subfonds</h2>
                    <p>
                        A body of documents within a fonds readily distinguished from the whole by filing arrangement,
                        type, form, or content. Subfonds are optional.
                    </p>
                    <h2>Series</h2>
                    <p>
                        A group of similar records that are arranged according to a filing system and that are related
                        as the result of being created, received, or used in the same activity; a file group; a record
                        series.
                    </p>
                    <h2>Container</h2>
                    <p>
                        A package or housing used to hold materials; a receptacle.
                    </p>
                    <h2>Folder</h2>
                    <p>A sheet of heavy paper stock or cardboard, scored near the middle, its halves bent so they rest
                        side by side, and used as a loose cover to keep documents and other flat materials together,
                        especially for purposes of filing</p>
                    <h2>Item</h2>
                    <p>
                        A thing that can be distinguished from a group and that is complete in itself.
                    </p>
                    <p>
                        Library and film library materials are not part of this hierarchy. They are managed separately
                        in an integrated library system.</p>
                </p>
            </div>
            <div className={style.Title}>Record types</div>
            <div className={style.Text}>
                <p>
                    The following visual indicators are meant to help you identify the type of records (or the level of
                    archival descriptions) listed among your search results:
                </p>
                <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                    <PrimaryTypeButton primaryType={'Archival Unit'} descriptionLevel={'Fonds'}/>
                    <p>Archival description on fonds level.</p>
                </div>
                <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                    <PrimaryTypeButton primaryType={'Archival Unit'} descriptionLevel={'Subfonds'}/>
                    <p>Archival description on subfonds level.</p>
                </div>
                <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                    <PrimaryTypeButton primaryType={'Archival Unit'} descriptionLevel={'Series'}/>
                    <p>Archival description on series level. You may browse the underlying folder
                        and item level descriptions and perform searches in them.</p>
                </div>
                <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                    <PrimaryTypeButton primaryType={'Textual'}/>
                    <p>Folder or item level record describing a material consisting primarily of written words on paper
                        or other hardcopy surfaces.</p>
                </div>
                <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                    <PrimaryTypeButton primaryType={'Moving Image'}/>
                    <p>Folder or item level record, or a film library entry, describing a visual work that has the
                        appearance of movement with or without sound.</p>
                </div>
                <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                    <PrimaryTypeButton primaryType={'Still Image'}/>
                    <p>Folder or item level record describing a still picture formed on a light-sensitive surface
                        using an optical system and fixed by a photochemical process.</p>
                </div>
                <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                    <PrimaryTypeButton primaryType={'Audio'}/>
                    <p>Folder or item level record describing sound, especially recorded sound.</p>
                </div>
                <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                    <PrimaryTypeButton primaryType={'Book'}/>
                    <p>A library record describing a published book.</p>
                </div>
                <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                    <PrimaryTypeButton primaryType={'Continuing Resource'}/>
                    <p>A library record describing a publication issued with no predetermined conclusion, and which
                        generally carries numbering, dates, or both. Serials and integrating resources are types of
                        continuing resources.</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Organization;