import React from "react";
import dynamic from "next/dynamic";
import ImageViewer from "./viewers/ImageViewer";


const PDFViewer = dynamic(() => import("./viewers/PDFViewer"), {
    ssr: false
});

const VideoViewer = dynamic(() => import("./viewers/VideoViewer"), {
    ssr: false
});

const FindingAidsDigitalContentOld = ({id, data, isMobile}) => {
    switch (data['primary_type']) {
        case 'Still Image':
            return <ImageViewer id={id} isMobile={isMobile} />
        case 'Textual':
            return <PDFViewer
                archivalReferenceCode={data['archival_reference_code']}
                id={data['digital_version_identifier']}
                isMobile={isMobile} />
        case 'Video':
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

export default FindingAidsDigitalContentOld;
