import React from "react";
import style from "./Menu.module.scss";

/**
 * Top right static menu
 */
const CollectionsMenu = () => {
  return (
    <div className={style.Content}>
      <div className={style.SubMenuWrapper}>
        <ul className={style.SubMenuList}>
          <li>
            <a href={'/archival-collections'}>Archival Collections</a>
          </li>
          <li>
            <a href={'/library-special-collections'}>Library Special Collections</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default CollectionsMenu;
