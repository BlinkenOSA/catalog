import React from 'react';
import style from "./styles.module.scss"


const Identifiers = ({isMobile}) => {
    return (
        <React.Fragment>
            <div className={style.Title}>Identifying archival records</div>
            <div className={style.Text}>
              <p>
                Each archival description has a reference code that identifies the material and its place in the
                archival hierarchy. Blinken OSA Archivum uses the following scheme for archival materials:
              </p>
              <p>
                For example, the following item belongs to the series ‘Interviews with Chernobyl Survivors’ in
                the fonds ‘Interviews Relating to Chernobyl’:
              </p>
              <p style={{textAlign: 'center'}}>
                Item title: <a href={'/catalog/KxYz0dP9'}>The Degovtsev Family</a><br/>
                Reference code: <span className={style.Identifier}>HU OSA 331-0-2:7/2</span>
              </p>
              <p>
                  The reference code <span className={style.Identifier}>HU OSA 331-0-2:7/2 </span>
                  consists of the following parts:
              </p>
              <div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA</div>
                  <div style={{flex: 1}}>Reference code prefix: the country code for Hungary (HU) and the institutional
                    abbreviation for Blinken OSA Archivum (OSA).</div>
                </div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA 331</div>
                  <div style={{flex: 1}}>Fonds 331: Interviews Relating to Chernobyl.</div>
                </div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA 331-0</div>
                  <div style={{flex: 1}}>Subfonds component: 0. In this example, the series belongs directly to the
                    fonds, without a separate subfonds.</div>
                </div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA 331-0-2</div>
                  <div style={{flex: 1}}>Series 2: Interviews with Chernobyl Survivors.</div>
                </div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA 331-0-2:7</div>
                  <div style={{flex: 1}}>Container 7 in this series. In this example, the container is a VHS PAL tape.</div>
                </div>
                <div className={isMobile ? `${style.IdentifierParts} ${style.Mobile}` : style.IdentifierParts}>
                  <div className={style.Identifier}>HU OSA 331-0-2:7/2</div>
                  <div style={{flex: 1}}>Folder or item 2 within container 7. Here it identifies the recording
                    ‘The Degovtsev Family’.</div>
                </div>
              </div>
            </div>
            <div className={style.Title}>Identifying library records</div>
            <div className={style.Text}>
              <p>
                Library materials, including books and periodicals, are identified by a call number. This combination
                of letters and numbers identifies the material and helps staff locate it.
              </p>
              <p>
                See, for example, the book record:
              </p>
              <p style={{textAlign: 'center'}}>
                <a href={'/catalog/PYJaKbXD'}>Lenin : a biography [1948] by Shub, David</a><br/>
                with call number <span className={style.Identifier}>947.084/1/092 SHU</span>
              </p>
            </div>
            <div className={style.Title}>Identifying film library records</div>
            <div className={style.Text}>
              <p>
                Film library materials are identified by a call number made up of the prefix ‘FL Record’ and a
                unique number.
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
