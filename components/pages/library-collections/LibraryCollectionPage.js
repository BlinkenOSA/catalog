import React from 'react';
import style from "./LibraryCollectionPage.module.scss";
import {useState} from "react";
import {useRouter} from "next/router";
import {libraryCollections} from "./libraryCollections";
import LibraryCollectionDrawer from "./parts/LibraryCollectionDrawer";

/**
 * Page responsible for displaying the hierarchical list of archival collections.
 */
const LibraryCollectionPage = ({data, isMobile}) => {
    const renderStuff = () => {
        return data.map((d, idx) => {
            return (<div>{idx % 2 === 0 ? `${d} (${data[idx+1]})` : '' }</div>)
        })
    }

    return (
        <div>{ renderStuff() }</div>
    )
}

export default LibraryCollectionPage
