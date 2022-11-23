import React from "react";
import dynamic from "next/dynamic";
import {Media} from "../../../../../utils/media";
import ImageViewer from "./viewers/ImageViewer";

const PDFViewer = dynamic(() => import("./viewers/PDFViewer"), {
    ssr: false
});

const VideoViewer = dynamic(() => import("./viewers/VideoViewer"), {
    ssr: false
});

const FindingAidsDigitalContentOld = ({id, data}) => {
    switch (data['primary_type']) {
        case 'Still Image':
            return (
                <React.Fragment>
                    <Media lessThan="md">
                        <ImageViewer id={id} device={'mobile'}/>
                    </Media>
                    <Media greaterThanOrEqual="md">
                        <ImageViewer id={id} device={'desktop'}/>
                    </Media>
                </React.Fragment>
            )
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
