import ImageViewer from "./viewers/ImageViewer";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./viewers/PDFViewer"), {
    ssr: false
});

const FindingAidsDigitalContentOld = ({id, data}) => {
    switch (data['primary_type']) {
        case 'Still Image':
            return <ImageViewer id={id} />
        case 'Textual':
            return <PDFViewer id={data['archival_reference_code']} />
    }
}

export default FindingAidsDigitalContentOld;
