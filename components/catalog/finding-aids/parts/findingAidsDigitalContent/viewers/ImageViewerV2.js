import dynamic from "next/dynamic";

const Viewer = dynamic(
    () => import("@samvera/clover-iiif").then((Clover) => Clover.Viewer),
    {
        ssr: false,
    },
);

const API = process.env.NEXT_PUBLIC_AMS_API;

const ImageViewerV2 = ({id, isGallery = false, isMobile, metadata}) => {
    const iiifContent = `${API}finding-aids-image-manifest/${id}/manifest.json`;

    const options = {
        showIIIFBadge: false,
        showTitle: false,
        informationPanel: {
            open: false,
            renderToggle: false,
            renderAbout: false
        },
        background: "#BFBFBF",
        canvasBackgroundColor: "#BFBFBF",
        canvasHeight: `calc(100vh - 57px - 42px)`,
    }

    return <Viewer iiifContent={iiifContent} options={options} />;
};

export default ImageViewerV2;