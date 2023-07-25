import style from "./IsadDigitalContent.module.scss";
import {OpenSeadragonViewer} from "openseadragon-react-viewer";

export const API = process.env.NEXT_PUBLIC_AMS_API;


const IsadDigitalContent = ({seriesID}) => {
    const manifestUrl = `${API}/archival-units-image-manifest/${seriesID}/manifest.json`;

    const options = {
        showDropdown: true,
        showThumbnails: true,
        showToolbar: true,
        showTitle: false,
        deepLinking: false,
        height: 500,
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
        showPreviousNext: true,
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

export default IsadDigitalContent;
