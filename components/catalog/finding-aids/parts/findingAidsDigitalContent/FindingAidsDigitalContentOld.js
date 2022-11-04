import ImageViewer from "./viewers/ImageViewer";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./viewers/PDFViewer"), {
    ssr: false
});

const VideoViewer = dynamic(() => import("./viewers/VideoViewer"), {
    ssr: false
});

const FindingAidsDigitalContentOld = ({id, data}) => {
    switch (data['primary_type']) {
        case 'Still Image':
            return <ImageViewer id={id} />
        case 'Textual':
            return <PDFViewer
                archivalReferenceCode={data['archival_reference_code']}
                id={data['digital_version_identifier']} />
        case 'Video':
            return <VideoViewer
                archivalReferenceCode={data['archival_reference_code']}
                id={data['digital_version_identifier']} />
        case 'Audio':
            return <VideoViewer
                archivalReferenceCode={data['archival_reference_code']}
                id={data['digital_version_identifier']} />
    }
}

export default FindingAidsDigitalContentOld;
