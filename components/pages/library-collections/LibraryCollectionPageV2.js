import React, {useState} from 'react';
import style from "./LibraryCollectionPageV2.module.scss";
import {useRouter} from "next/router";
import {createParams} from "../../../utils/urlParamFunctions";
import {libraryCollections} from "../../../config/libraryCollections";
import Button from "../search/parts/Button";

/**
 * Page responsible for displaying the hierarchical list of archival collections.
 */
const LibraryCollectionPageV2 = ({data, total, isMobile}) => {
    const router = useRouter();
    const selectedCollectionInitial = {title: data[0], number: data[1]}

    const [selectedCollection, setSelectedCollection] = useState(selectedCollectionInitial)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleClick = () => {
      router.replace({
        pathname: '/',
        query: createParams('', 0, 0, {library_collection: selectedCollection['title']}),
      }, undefined, {shallow: false})
    }

    const onCollectionClick = (collection) => {
        setSelectedCollection(collection)
        setDrawerOpen(true)
    }

    const renderCollections = () => {
        return data.map((d, idx) => {
            if (idx % 2 === 0) {
                return (
                    <li
                        key={idx}
                        onClick={() => onCollectionClick({title: d, number: data[idx+1]})}
                        className={d === selectedCollection['title'] ? style.Selected : ''}
                    >
                        <span>{d} ({data[idx+1]})</span>
                        <div className={style.Button}/>
                    </li>
                )
            }
        })
    }

    const renderInfo = () => {
        const selectedCollectionInfo = libraryCollections.filter(lc => lc['label'] === selectedCollection['title'])

        if (selectedCollectionInfo.length > 0) {
            const numberOfBooks = (selectedCollection['number'] / total) * 100
            const books = 1 + Math.round(numberOfBooks)

            return (
                <>
                <div className={style.InfoGraphHeader}>
                    <div className={style.TitleWrap}>
                        <div className={style.Title}>
                            {selectedCollection['title']}
                        </div>
                        <div className={style.NumberOfItems}>
                            {selectedCollection['number']} {selectedCollection['number'] > 1 ? 'items' : 'item'}
                        </div>
                    </div>
                    <div className={style.BookBackground}>
                        {
                            [...Array(17)].map((n, idx) => {
                                return (
                                    <div key={n} className={idx < books ? `${style.Book} ${style.Active}` : style.Book} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className={style.Description}>
                    {selectedCollectionInfo[0]['description']}
                    <div className={style.ButtonWrapper}>
                        <div className={style.Badge}>
                            See the collection
                        </div>
                    </div>
                </div>
                </>
            )
        }
    }

    const onClose = () => {
        setDrawerOpen(false)
    }

    return (
        isMobile ?
        <div className={style.ContentWrapper}>
            <div className={style.Collections}>
                <ul>{renderCollections()}</ul>
            </div>
            <div className={drawerOpen ? style.MobileInfoWrapper : `${style.MobileInfoWrapper} ${style.Closed}`}>
                <div className={style.CloseButton} onClick={onClose}>
                    <span> </span>
                    <span> </span>
                </div>
                <div className={`${style.Content} ${style.Mobile}`}>
                    {renderInfo()}
                </div>
            </div>
        </div> :
        <div className={style.ContentWrapper}>
            <div className={style.Collections}>
                <ul>{renderCollections()}</ul>
            </div>
            <div className={style.Content}>
                {renderInfo()}
            </div>
        </div>
    )
}

export default LibraryCollectionPageV2
