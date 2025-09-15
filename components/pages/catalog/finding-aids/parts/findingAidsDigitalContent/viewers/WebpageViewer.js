import Button from "../../../../../search/parts/Button";
import React from "react";
import styles from "./WebpageViewer.module.scss"
import Image from "next/image";

const WebpageViewer = ({ identifier, url }) => {
    const constructedUrl = `https://storage.osaarchivum.org/catalog/webarchive/${identifier}.jpg`;

    return (
        <div className={styles.WebViewer}>
            <Image
                src={constructedUrl}
                alt="Archived webpage preview"
                layout={'fill'}
                className={styles.Image}
            />
            <div className={styles.Overlay}>
                <Button
                    text="View Archived Webpage"
                    link={url}
                    target="_blank"
                    theme={'dark'}
                />
            </div>
        </div>
    )
}

export default WebpageViewer;