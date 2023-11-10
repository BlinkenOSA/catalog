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
    switch (data['primary_type']) {
        case 'Still Image':
            return <ImageViewer id={id} isMobile={isMobile} />
        case 'Textual':
            return <PDFViewer
                archivalReferenceCode={data['archival_reference_code']}
                id={data['digital_version_identifier']}
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
