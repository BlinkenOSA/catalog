import style from "./ImageViewer.module.scss";
import {OpenSeadragonViewer} from "openseadragon-react-viewer";
import {FaExpand, FaCompress} from "react-icons/fa";
import Fullscreen from 'react-fullscreen-crossbrowser';
import {useState} from "react";
import {useWindowSize} from 'react-use';

const ImageViewer = ({id, isMobile}) => {
    const manifestUrl = `http://localhost:8000/api/catalog/finding-aids-image-manifest/${id}/manifest.json`;

    const {width, height} = useWindowSize();
    const [fullScreenEnabled, setFullScreenEnabled] = useState(false)

    const getHeight = () => {
        if (isMobile) {
            return fullScreenEnabled ? height : 300;
        } else {
            return fullScreenEnabled ? height : 500;
        }
    }

    const options = {
        showDropdown: false,
        showThumbnails: false,
        showToolbar: true,
        showTitle: false,
        deepLinking: false,
        height: getHeight(),
        containerId: `image-viewer-${isMobile ? 'mobile' : 'desktop'}`
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
            return fullScreenEnabled ? `${style.IIIFViewer} ${style.Mobile} ${style.FullScreen}` : `${style.IIIFViewer} ${style.Mobile}`
        } else {
            return fullScreenEnabled ? `${style.IIIFViewer} ${style.FullScreen}` : style.IIIFViewer
        }
    }

        return (
            <Fullscreen enabled={fullScreenEnabled} onChange={(isFullscreenEnabled) => setFullScreenEnabled(isFullscreenEnabled)}>
                <div className={getClass()} style={{height: getHeight()}}>
                    <div className={style.FullScreenButton} onClick={() => fullScreenClick()}>
                        {fullScreenEnabled ? <FaCompress/> : <FaExpand/>}
                    </div>
                    <OpenSeadragonViewer
                        manifestUrl={manifestUrl}
                        options={options}
                        openSeadragonOptions={openSeadragonOptions}
                        toolBarOptions={toolBarOptions}
                    />
                </div>
            </Fullscreen>
        )
}

export default ImageViewer;
