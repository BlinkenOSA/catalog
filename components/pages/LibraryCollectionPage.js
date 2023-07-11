import React, {useEffect} from 'react';
import style from "./LibraryCollectionPage.module.scss";
import {useState} from "react";
import ArchivalUnitDrawer from "./parts/archivalUnitDrawer/ArchivalUnitDrawer";
import {useRouter} from "next/router";
import {libraryCollections} from "./config/libraryCollections";

/**
 * Page responsible for displaying the hierarchical list of archival collections.
 */
const LibraryCollectionPage = ({showArchiveUnitDrawer = false, isMobile}) => {
    const router = useRouter();
    const [selectedArchivalUnit, setSelectedArchivalUnit] = useState(0)

    const onSelectArchivalUnit = (key, catalogID = '') => {
        router.replace({
            pathname: `/catalog/${catalogID}`
        });
    }

    const renderCollectionItems = () => {
        return libraryCollections.map((col, index) => {
            return (
              <div key={index}>{col['label']}</div>
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
                showArchiveUnitDrawer &&
                <ArchivalUnitDrawer
                    isMobile={true}
                    archivalUnitID={selectedArchivalUnit}
                    open={selectedArchivalUnit !== 0}
                    onClose={() => setSelectedArchivalUnit(0)}
                />
            }
            </div>
        )
    } else {
        return (
            <div style={{display: 'flex'}}>
                <div className={showArchiveUnitDrawer ? style.TreeOpen : style.Tree}>
                    {renderCollectionItems()}
                </div>
                {
                    showArchiveUnitDrawer &&
                    <ArchivalUnitDrawer
                        archivalUnitID={selectedArchivalUnit}
                        open={selectedArchivalUnit !== 0}
                        onClose={onSelectArchivalUnit}
                    />
                }
            </div>
        )
    }
}

export default LibraryCollectionPage
