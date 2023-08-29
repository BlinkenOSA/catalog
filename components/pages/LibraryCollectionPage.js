import React from 'react';
import style from "./LibraryCollectionPage.module.scss";
import {useState} from "react";
import {useRouter} from "next/router";
import {libraryCollections} from "./config/libraryCollections";
import LibraryCollectionDrawer from "./parts/libraryCollectionDrawer/LibraryCollectionDrawer";

/**
 * Page responsible for displaying the hierarchical list of archival collections.
 */
const LibraryCollectionPage = ({isMobile}) => {
    const router = useRouter();
    const [selectedLibraryCollection, setSelectedLibraryCollection] = useState(0)

    const renderCollectionItems = () => {
        return libraryCollections.map((col, index) => {
            return (
              <div key={index} className={style.Item}>
                <img alt="bookIcon" src={'/icons/BookIconBlack.svg'} className={style.ItemIcon}/>
                <div>{col['label']}</div>
              </div>
            )
        })
    }

    if (isMobile) {
        return (
            <div>
                <div className={`${style.Tree} ${style.Mobile}`}>
                    {renderCollectionItems()}
                </div>
                {
                    <LibraryCollectionDrawer
                        isMobile={true}
                        collectionID={selectedLibraryCollection}
                        open={selectedLibraryCollection !== 0}
                        onClose={() => setSelectedLibraryCollection(0)}
                    />
                }
            </div>
        )
    } else {
        return (
            <div style={{display: 'flex'}}>
                <div className={style.TreeOpen}>
                    {renderCollectionItems()}
                </div>
                {
                    <LibraryCollectionDrawer
                      collectionID={selectedLibraryCollection}
                      open={selectedLibraryCollection !== 0}
                      onClose={() => setSelectedLibraryCollection(0)}
                    />
                }
            </div>
        )
    }
}

export default LibraryCollectionPage
