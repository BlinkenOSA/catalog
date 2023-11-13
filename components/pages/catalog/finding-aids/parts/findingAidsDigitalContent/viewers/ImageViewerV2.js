import dynamic from "next/dynamic";
import style from "./ImageViewerV2.module.scss"
import {useWindowSize} from "react-use";
import Loader from '../../../../../../layout/Loader'
import {useEffect} from "react";

const Viewer = dynamic(
    () => import("@samvera/clover-iiif").then((Clover) => Clover.Viewer),
    {
        ssr: false,
    },
);

const API = process.env.NEXT_PUBLIC_AMS_API;

const ImageViewerV2 = ({id, isGallery = false, isMobile=false}) => {
    const {width, height} = useWindowSize();

    // Disable canvas right click
    useEffect(() => {
        function handleContextMenu(e) {
            e.preventDefault(); // prevents the default right-click menu from appearing
        }

        // add the event listener to the component's root element
        let rootElements = [];
        let rootElement = document.getElementById(`imageviewer-${id}`);

        if (rootElement) {
            rootElements.push(rootElement)
        } else {
            rootElements = document.getElementsByTagName('canvas')
        }

        for (let i = 0; i < rootElements.length; i++) {
            rootElements[i].addEventListener('contextmenu', handleContextMenu);
        }

        // remove the event listener when the component is unmounted
        return () => {
            for (let i = 0; i < rootElements.length; i++) {
                rootElements[i].removeEventListener('contextmenu', handleContextMenu);
            }
        };
    }, []);

    const iiifContent = `${API}finding-aids-image-manifest/${id}/manifest.json`;

    const getCanvasHeight = () => {
        if (isGallery) {
            if (isMobile) {
                return height-200
            } else {
                return height-57-42-73-73
            }
        } else {
            return 500
        }
    }

    const options = {
        showIIIFBadge: false,
        showTitle: false,
        informationPanel: {
            open: false,
            renderToggle: false,
            renderAbout: false
        },
        openSeadragon: {
            gestureSettingsMouse: {
                scrollToZoom: true
            }
        },
        background: "#BFBFBF",
        canvasBackgroundColor: "#BFBFBF",
        canvasHeight: getCanvasHeight(),
    }

    return (
        <div id={`imageviewer-${id}`} className={isGallery ? `${style.ImageViewerWrapper} ${style.Gallery}` : style.ImageViewerWrapper}>
            <Viewer iiifContent={iiifContent} options={options} />
            <div className={style.Loader}><Loader /></div>
        </div>
    )

};

export default ImageViewerV2;