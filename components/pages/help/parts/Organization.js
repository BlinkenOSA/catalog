import React from 'react';
import Link from "next/link";
import style from "./styles.module.scss"
import PrimaryTypeButton from "../../search/parts/PrimaryTypeButton";
import {HiOutlineArrowNarrowRight, HiOutlineArrowNarrowDown} from 'react-icons/hi'


const Organization = ({isMobile}) => {
    const getUnitsDrawing = () => {
        return (
            <div className={isMobile ? `${style.UnitButtonsWrap} ${style.Mobile}` : style.UnitButtonsWrap}>
                <div className={style.UnitButton}>Fonds</div>
                <div className={style.Arrow}>{isMobile ? <HiOutlineArrowNarrowDown/> : <HiOutlineArrowNarrowRight/>}</div>
                <div className={style.UnitButton}>Subfonds (if present)</div>
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
                  Archival descriptions are arranged from the general to the specific, helping you understand
                  individual documents in the context of the collection they belong to. The diagram below shows
                  how descriptions and storage locations are organized in this catalog:
              </p>
              <figure style={{margin: '0 0 20px'}}>
                  {getUnitsDrawing()}
              </figure>
              <p>
                  Some fonds are divided into subfonds; others contain series directly. Containers appear in the
                  catalog to help you locate materials. They represent physical storage or carriers, rather than
                  a separate level of archival description.
              </p>
              <h2>Fonds</h2>
              <p>
                  The records created or accumulated by a person, family or organization in the course of their
                  activities, kept together as a whole.
              </p>
              <h2>Subfonds</h2>
              <p>
                  A subdivision of a fonds, distinguished by factors such as the part of an organization that
                  created the records, their arrangement or their content. Not every fonds has subfonds.
              </p>
              <h2>Series</h2>
              <p>
                  A group of related records within a fonds or subfonds, brought together because they result
                  from the same activity, share a format or follow the same filing system.
              </p>
              <h2>Container</h2>
              <p>
                  A physical storage unit or carrier, such as an archival box or a videotape. Container numbers
                  help you locate folders or items within a series.
              </p>
              <h2>Folder</h2>
              <p>
                  A physical folder holds a group of documents. In the catalog, a folder description tells you
                  about the documents grouped together, rather than the enclosure itself.
              </p>
              <h2>Item</h2>
              <p>
                  An individual document, photograph or recording described as a single unit. An item may be
                  physical or digital.
              </p>
          </div>
          <div className={style.Title}>Library and Film Library materials</div>
          <div className={style.Text}>
              <p>
                  Library and film library records come from our library system. Each record describes a
                  publication or film, with holdings information about the available copies and formats. These
                  materials are not organized into fonds, subfonds or series.
              </p>
              <p>
                  Their collection grouping is recorded through the ‘Library Special Collection’ facet. A special
                  collection brings together materials from a particular donation, source or thematic collection.
                  These groupings do not form a hierarchy. You can explore the library groupings on the
                  {' '}<Link href="/library-special-collections"><a>Library Special Collections</a></Link> page.
              </p>
          </div>
          <div className={style.Title}>Record types</div>
          <div className={style.Text}>
              <p>
                  The labels below identify either the level of an archival description or the type of material
                  described in a search result. A material’s type does not indicate whether a digital copy is
                  available; see <a href="#request-and-access">Request and access</a> for access options.
              </p>
              <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Archival Unit'} descriptionLevel={'Fonds'}/>
                  <p>A description of a fonds as a whole.</p>
              </div>
              <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Archival Unit'} descriptionLevel={'Subfonds'}/>
                  <p>A description of a subdivision within a fonds.</p>
              </div>
              <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Archival Unit'} descriptionLevel={'Series'}/>
                  <p>A description of a series. Open it to browse or search descriptions of its folders and items.</p>
              </div>
              <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Textual'}/>
                  <p>A record describing written material, such as correspondence, reports or notes, in physical
                      or digital form.</p>
              </div>
              <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Moving Image'}/>
                  <p>A record describing a film or video recording, with or without sound, on a physical carrier
                      or in a digital file.</p>
              </div>
              <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Still Image'}/>
                  <p>A record describing a photograph or other still image, in physical or digital form.</p>
              </div>
              <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Audio'}/>
                  <p>A record describing a sound recording, on a physical carrier or in a digital file.</p>
              </div>
              <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Book'}/>
                  <p>A library record describing a published book.</p>
              </div>
              <div className={isMobile ? `${style.ButtonWithText} ${style.Mobile}` : style.ButtonWithText}>
                  <PrimaryTypeButton primaryType={'Continuing Resource'}/>
                  <p>A library record describing an ongoing publication or resource with no planned end, such as
                      a newspaper or journal.</p>
              </div>
          </div>
      </React.Fragment>
    )
}

export default Organization;
