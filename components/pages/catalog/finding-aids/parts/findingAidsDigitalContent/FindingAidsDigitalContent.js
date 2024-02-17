import React from "react";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./viewers/PDFViewerV2"), {
    ssr: false
});

const ImageViewer = dynamic(() => import("./viewers/ImageViewerV2"), {
    ssr: false
});

const VideoViewer = dynamic(() => import("./viewers/VideoViewer"), {
    ssr: false
});

const AudioPlayer = dynamic(() => import("./viewers/AudioPlayer"), {
    ssr: false
});

const FindingAidsDigitalContent = ({id, data, isMobile}) => {
    const identifier = data['access_copies'].map(ac => ac['identifier'])[0]
    const fileNames = data['access_copies'].map(ac => ac['filename'])

    switch (data['primary_type']) {
        case 'Still Image':
            return <ImageViewer id={id} isMobile={isMobile} />
        case 'Textual':
            return <PDFViewer
                identifier={identifier}
                fileNames={fileNames}
                isMobile={isMobile} />
        case 'Moving Image':
            return <VideoViewer
                identifier={identifier}
                isMobile={isMobile} />
        case 'Audio':
            return <AudioPlayer
                data={data}
                identifier={identifier}
                isMobile={isMobile} />
    }
}

export default FindingAidsDigitalContent;
