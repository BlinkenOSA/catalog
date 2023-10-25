import React from 'react';
import style from "./styles.module.scss"
import PrimaryTypeButton from "../../search/parts/PrimaryTypeButton";
import {HiOutlineArrowNarrowRight} from 'react-icons/hi'


const Catalog = () => {
    return (
        <React.Fragment>
            <div className={style.Title}>Organization of the records in the archive</div>
            <div className={style.Text}>
              <p>
                  To better understand your findings, it's worth familiarising yourself with the principles of
                  organisation of Blinken OSA's archival material. In order to effectively manage and organise
                  large amounts of archival material, hierarchical description and grouping of the material is
                  used. Hierarchical description is a technique for writing contextual and structural
                  information about an archival resource by describing the collection from the general to the
                  specific, starting with the whole and then proceeding to the components. Blinken OSA Archivum
                  uses the following levels of description:
              </p>
              <p>
                <div className={style.UnitButtonsWrap}>
                  <div className={style.UnitButton}>Fonds</div>
                  <div className={style.Arrow}><HiOutlineArrowNarrowRight/></div>
                  <div className={style.UnitButton}>Subfonds</div>
                  <div className={style.Arrow}><HiOutlineArrowNarrowRight/></div>
                  <div className={style.UnitButton}>Series</div>
                  <div className={style.Arrow}><HiOutlineArrowNarrowRight/></div>
                  <div className={style.UnitButton}>Container</div>
                  <div className={style.Arrow}><HiOutlineArrowNarrowRight/></div>
                  <div className={style.UnitButton}>Folders / Items</div>
                </div>
              </p>
              <p>
                <h2>Fonds</h2>
                <p>
                  The entire body of records of an organization, family, or individual that have been created and
                  accumulated as the result of an organic process reflecting the functions of the creator
                </p>
                <h2>Subfonds</h2>
                <p>
                  A body of documents within a fond readily distinguished from the whole by filing arrangement,
                  type, form, or content. Subfonds are optional.
                </p>
                <h2>Series</h2>
                <p>
                  A group of similar records that are arranged according to a filing system and that are related as the
                  result of being created, received, or used in the same activity; a file group; a record series.
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
                  It's important to mention that library and film library materials are not part of this hierarchy,
                  because they are managed separately in an integrated library system.</p>
              </p>
            </div>
            <div className={style.Title}>Record types</div>
            <div className={style.Text}>
                <p>
                  As a result of your search a list of records will be visible in a list view.
                  To be able to easily identify the type of the record, there are visual indicators included, which can
                  be one of the following:
                </p>
                <div className={style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Archival Unit'} descriptionLevel={'Fonds'} />
                  <p>Archival description on fonds level.</p>
                </div>
                <div className={style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Archival Unit'} descriptionLevel={'Subfonds'} />
                  <p>Archival description on subfonds level.</p>
                </div>
                <div className={style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Archival Unit'} descriptionLevel={'Series'} />
                  <p>Archival description on series level. You may browse the underlying folder
                  and item level descriptions and perform search in them.</p>
                </div>
                <div className={style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Textual'} />
                  <p>Folder or item level record describing a material consisting primarily of written words on paper
                     or other hardcopy surfaces.</p>
                </div>
                <div className={style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Moving Image'} />
                  <p>Folder or item level record, or a film library entry, describing a visual work that has the
                     appearance of movement with or without sound.</p>
                </div>
                <div className={style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Still Image'} />
                  <p>Folder or item level record describing a still picture formed on a light-sensitive surface
                     using an optical system and fixed by a photochemical process.</p>
                </div>
                <div className={style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Audio'} />
                  <p>Folder or item level record describing sound, especially recorded sound.</p>
                </div>
                <div className={style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Book'} />
                  <p>A library record describing a published book.</p>
                </div>
                <div className={style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Continuing Resource'} />
                  <p>A library record describing a publication that intends to be issued with no
                    predetermined conclusion, and generally carries numbering, dates, or both. Serials and integrating
                    resources are types of continuing resources.</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Catalog;