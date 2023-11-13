import React from 'react';
import style from "./styles.module.scss"


const Identifiers = ({isMobile}) => {
    return (
        <React.Fragment>
            <div className={style.Title}>Identifiying archival records</div>
            <div className={style.Text}>
              <p>
                Each record in an archive has a unique identifier that helps to uniquely identify the material.
                These identifiers are called 'call number' or 'reference code'. Blinken OSA Archivum uses
                the following scheme for archival material:
              </p>
              <p>
                Take for example the following archival record:
              </p>
              <p style={{textAlign: 'center'}}>
                <a href={'/catalog/KxYz0dP9'}>
                  <span className={style.Identifier}>HU OSA 331-0-2:7/2</span> - The Degovtsev Family
                </a>
              </p>
              <p>
                  The reference code <span className={style.Identifier}>HU OSA 331-0-2:7/2 </span>
                  consists of the following parts:
              </p>
              <p>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA</div>
                  <div style={{flex: 1}}>Identifier suffix consisting of the country code of Hungary (HU) and the institutional abbreviation
                    of Blinken OSA Archivum.</div>
                </div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA 331</div>
                  <div style={{flex: 1}}>Fonds number. The name of the fonds: Interviews Relating to Chernobyl</div>
                </div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA 331-0</div>
                  <div style={{flex: 1}}>Subfonds number.</div>
                </div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA 331-0-2</div>
                  <div style={{flex: 1}}>Series number. The name of the series: Interviews with Chernobyl Survivors</div>
                </div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA 331-0-2:7</div>
                  <div style={{flex: 1}}>Container number. The 7th container of the series. In this case the original containers were VHS tapes.</div>
                </div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA 331-0-2:7/2</div>
                  <div style={{flex: 1}}>Folder or item number. These are the smallest archival units. In this case, since these are programs
                  on VHS tape, this refers to the 2nd recording on that particular tape.</div>
                </div>
              </p>
            </div>
            <div className={style.Title}>Identifiying library records</div>
            <div className={style.Text}>
              <p>
                Library records (books and periodicals) are identified with call number, which is a unique combination of
                letters and numbers used to identify an item and to facilitate storage and retrieval.
              </p>
              <p>
                See, for example, the book record:
              </p>
              <p style={{textAlign: 'center'}}>
                <a href={'/catalog/PYJaKbXD'}>Lenin : a biography [1948] by Shub, David</a><br/>
                with call number <span className={style.Identifier}>947.084/1/092 SHU</span>
              </p>
            </div>
            <div className={style.Title}>Identifiying film library records</div>
            <div className={style.Text}>
              <p>
                Film Library records are identified with their own call number, which is a combination of
                the suffix 'FL Record' and a unique number.
              </p>
              <p>
                For example, see the documentary film:
              </p>
              <p style={{textAlign: 'center'}}>
                <a href={'/catalog/yovKPWX7'}>100 Flowers Hidden Deep</a><br/>
                with call number <span className={style.Identifier}>FL Record 2114</span>
              </p>
            </div>

        </React.Fragment>
    )
}

export default Identifiers;