import style from "./ImageViewer.module.scss";
import {OpenSeadragonViewer} from "openseadragon-react-viewer";

const ImageViewer = ({id, device}) => {
    const manifestUrl = `http://localhost:8000/api/catalog/finding-aids-image-manifest/${id}/manifest.json`;

    const options = {
        showDropdown: false,
        showThumbnails: false,
        showToolbar: true,
        showTitle: false,
        deepLinking: false,
        height: 500,
        containerId: `image-viewer-${device}`
    };

    const openSeadragonOptions = {
        gestureSettingsMouse: {
            scrollToZoom: true,
        },
    };

    const toolBarOptions = {
        showZoom: true,
        showFullScreen: true,
        showDownload: false,
        showPreviousNext: false,
    };

    return (
        <div className={style.IIIFViewer}>
            <OpenSeadragonViewer
                manifestUrl={manifestUrl}
                options={options}
                openSeadragonOptions={openSeadragonOptions}
                toolBarOptions={toolBarOptions}
            />
        </div>
    )
}

export default ImageViewer;
