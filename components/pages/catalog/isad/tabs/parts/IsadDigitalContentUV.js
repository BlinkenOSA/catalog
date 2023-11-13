import {UniversalViewer} from "../../../../universalViewer/UniversalViewerLazy";

const IsadDigitalContent = ({seriesID}) => {
    const manifestUrl = `http://localhost:8000/api/catalog/archival-units-image-manifest/${seriesID}/manifest.json`;

    return (
        <UniversalViewer
            manifestId={manifestUrl}
            canvasIndex={0}
            config={{
                options: {
                    headerPanelEnabled: false,
                    rightPanelEnabled: false
                },
                modules: {
                    footerPanel: {
                        options: {
                            downloadEnabled: false,
                            embedEnabled: false
                        }
                    },
                    headerPanel: {
                        options: {
                            settingsButtonEnabled: false
                        }
                    }
                }
            }}
        />
    )
}

export default IsadDigitalContent;
