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
          <a href={'/archival-collections'}>
            <li>
              Archival Collections
            </li>
          </a>
          <a href={'/image-gallery'}>
            <li>
              Digital Image Gallery
            </li>
          </a>
          <a href={'/library-special-collections'}>
            <li>
              Library Special Collections
            </li>
          </a>
        </ul>
      </div>
    </div>
  )
}

export default CollectionsMenu;
