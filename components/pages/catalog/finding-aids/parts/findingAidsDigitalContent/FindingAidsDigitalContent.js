import React from "react";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./viewers/PDFViewer"), {
    ssr: false
});

const ImageViewer = dynamic(() => import("./viewers/ImageViewerV2"), {
    ssr: false
});

const VideoViewer = dynamic(() => import("./viewers/VideoViewer"), {
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
                archivalReferenceCode={data['archival_reference_code']}
                id={data['digital_version_identifier']}
                isMobile={isMobile} />
        case 'Audio':
            return <VideoViewer
                archivalReferenceCode={data['archival_reference_code']}
                id={data['digital_version_identifier']}
                isMobile={isMobile} />
    }
}

export default FindingAidsDigitalContent;
