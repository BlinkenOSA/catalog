import React, {useState} from 'react';
import style from "./LibraryCollectionPage.module.scss";
import {useRouter} from "next/router";
import {createParams} from "../../../utils/urlParamFunctions";

/**
 * Page responsible for displaying the hierarchical list of archival collections.
 */
const LibraryCollectionPage = ({data, total, isMobile}) => {
    const router = useRouter();

    const handleClick = (data) => {
      router.replace({
        pathname: '/',
        query: createParams('', 0, 0, {library_collection: data}),
      }, undefined, {shallow: false})
    }

    const renderStuff = () => {
        return data.map((d, idx) => {
            if (idx % 2 === 0) {
                const numberOfBooks = (data[idx+1] / total) * 100
                const books = 1 + Math.round(numberOfBooks)

                return (
                  <div onClick={() => handleClick(d)} className={isMobile ? `${style.GridItem} ${style.Mobile}`: style.GridItem}>
                      <div className={style.BookBackground}>
                          {
                            [...Array(books)].map((n) => {
                              return (
                                <div key={n} className={style.Book} />
                              )
                            })
                          }
                      </div>
                      <div className={style.Title} >
                        <div>
                          <div>{`${d}`}</div>
                          <div className={style.Number}>{`${data[idx+1]}`} {data[idx+1] > 1 ? 'items' : 'item'}</div>
                        </div>
                      </div>
                  </div>
                )
            }
        })
    }

    return (
        <div className={isMobile ? `${style.Grid} ${style.Mobile}`: style.Grid}>
            { renderStuff() }
        </div>
    )
}

export default LibraryCollectionPage
