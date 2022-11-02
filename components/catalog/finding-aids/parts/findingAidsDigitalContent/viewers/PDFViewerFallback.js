// import default react-pdf entry
import style from "./PDFViewer.module.scss";
import { Document, Page, pdfjs} from 'react-pdf/dist/esm/entry.webpack5';
import {useState} from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewerFallback = ({ id }) => {
    const [scale, setScale] = useState(1)

    const url = `https://storage.osaarchivum.org/catalog/textual/HU_OSA_386-2-2/HU_OSA_386-2-2_001-001.pdf`

    const zoomIn = () => {
        setScale(scale + 0.2)
    }

    return (
        <div className={style.PDFViewer}>
            <Document file={url}>
                <Page
                    pageNumber={1}
                    height={500}
                    scale={scale}
                />
            </Document>
            <div>
                <button onClick={() => zoomIn()}>Zoom In</button>
            </div>
        </div>
    )
};


export default PDFViewerFallback;
