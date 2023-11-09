import style from "./ImageViewer.module.scss";
import {OpenSeadragonViewer} from "openseadragon-react-viewer";
import {FaExpand, FaCompress} from "react-icons/fa";
import Fullscreen from 'react-fullscreen-crossbrowser';
import {useEffect, useState} from "react";
import {useWindowSize} from 'react-use';
import useSWR from "swr";
import {fetcher} from "../../../../../../utils/fetcherFunctions";
import Loader from "../../../../../layout/Loader";

const ImageViewer = ({id, isGallery = false, isMobile, metadata}) => {
    const [manifestUrl, setManifestUrl] = useState('')

    const {data} = useSWR(manifestUrl, fetcher)

    useEffect(() => {
        setManifestUrl(`finding-aids-image-manifest/${id}/manifest.json`)
    }, [id])

    const {width, height} = useWindowSize();
    const [fullScreenEnabled, setFullScreenEnabled] = useState(false)

    const getHeight = () => {
        const realHeight = height - (57 + 42 + 73 + 73);
        return fullScreenEnabled ? height : realHeight;
    }

    const options = {
        showDropdown: false,
        showThumbnails: false,
        showToolbar: true,
        showTitle: false,
        deepLinking: false,
        height: getHeight(),
        containerId: `image-viewer-${id}-${isMobile ? 'mobile' : 'desktop'}`
    };

    const openSeadragonOptions = {
        gestureSettingsMouse: {
            scrollToZoom: true,
        },
    };

    const toolBarOptions = {
        showFullScreen: false,
        showDownload: false,
        showPreviousNext: false,
    };

    const fullScreenClick = () => {
        setFullScreenEnabled(!fullScreenEnabled)
    }

    const getClass = () => {
        if (isMobile) {
            if (isGallery) {
                return fullScreenEnabled ? `${style.IIIFViewer} ${style.Mobile} ${style.FullScreen}` : `${style.IIIFViewer} ${style.Mobile}`
            } else {
                return fullScreenEnabled ? `${style.IIIFViewer} ${style.Mobile} ${style.FullScreen}` : `${style.IIIFViewer} ${style.Mobile}`
            }
        } else {
            if (isGallery) {
                return fullScreenEnabled ? `${style.IIIFViewer} ${style.Gallery} ${style.FullScreen}` : `${style.IIIFViewer} ${style.Gallery}`
            } else {
                return fullScreenEnabled ? `${style.IIIFViewer} ${style.FullScreen}` : style.IIIFViewer
            }
        }
    }

        return (
            <Fullscreen enabled={fullScreenEnabled} onChange={(isFullscreenEnabled) => setFullScreenEnabled(isFullscreenEnabled)}>
                <div className={getClass()} style={{height: getHeight()}}>
                    <div className={style.FullScreenButton} onClick={() => fullScreenClick()}>
                        {fullScreenEnabled ? <FaCompress/> : <FaExpand/>}
                    </div>
                    {data ?
                    <OpenSeadragonViewer
                        manifest={data}
                        options={options}
                        openSeadragonOptions={openSeadragonOptions}
                        toolBarOptions={toolBarOptions}
                    /> : <Loader color='#000000'/>}
                </div>
            </Fullscreen>
        )
}

export default ImageViewer;
