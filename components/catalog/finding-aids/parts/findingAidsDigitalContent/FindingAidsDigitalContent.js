import dynamic from "next/dynamic";
import style from "./FindingAidsDigitalContent.module.scss";

const CloverIIIF = dynamic(() => import("@samvera/clover-iiif"), {
    ssr: false,
});

const FindingAidsDigitalContent = ({id, data}) => {
    switch (data['primary_type']) {
        case 'Still Image':
            const manifestUrl = `http://localhost:8000/api/catalog/finding-aids-image-manifest/${id}/manifest.json`;

            const options = {
                canvasBackgroundColor: '#808080',
                canvasHeight: '500px',
                showIIIFBadge: false,
                showInformationToggle: false,
                showTitle: false,
                renderAbout: false,
                openSeadragon: {
                    gestureSettingsMouse: {
                        scrollToZoom: true
                    }
                }
            }

            return (
                <div className={style.IIIFViewer}>
                    <CloverIIIF manifestId={manifestUrl} options={options} />
                </div>
            )
    }
}

export default FindingAidsDigitalContent;
