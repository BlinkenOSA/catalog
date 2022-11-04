import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import style from "./PDFViewer.module.scss"
import React, {useState} from "react";
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import getURL from '../../../../../../utils/digitalObjectFunctions';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';


const PDFViewer = ({archivalReferenceCode, id}) => {
    const [fullScreen, setFullScreen] = useState(false)

    const toolbarPluginInstance = toolbarPlugin({
        fullScreenPlugin: {
            getFullScreenTarget: (pagesContainer) => {
                return pagesContainer.closest(".pdf-viewer-wrapper");
            },
            renderExitFullScreenButton: (props) => <></>,
            onEnterFullScreen: (zoom) => {setFullScreen(true)},
            onExitFullScreen: (zoom) => {setFullScreen(false)}
        },
    })
    const { Toolbar } = toolbarPluginInstance;

    const renderToolBar = () => (
        <div className={style.ToolBar} >
            <Toolbar>
                {(props) => {
                    const {
                        CurrentPageInput,
                        CurrentScale,
                        EnterFullScreen,
                        GoToNextPage,
                        GoToPreviousPage,
                        NumberOfPages,
                        ZoomIn,
                        ZoomOut,
                    } = props;
                    return (
                        <>
                            <div style={{ padding: '0px 2px' }}>
                                <ZoomOut>
                                    {(props) => (
                                        <div
                                            className={`${style.Button} ${style.ZoomOut}`}
                                            onClick={props.onClick}
                                        />
                                    )}
                                </ZoomOut>
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <CurrentScale>
                                    {(props) => (
                                        <span>{`${Math.round(props.scale * 100)}%`}</span>
                                    )}
                                </CurrentScale>
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <ZoomIn>
                                    {(props) => (
                                        <div
                                            className={`${style.Button} ${style.ZoomIn}`}
                                            onClick={props.onClick}
                                        />
                                    )}
                                </ZoomIn>
                            </div>
                            <div className={style.Divider} />
                            <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                                <GoToPreviousPage>
                                    {(props) => (
                                        <div
                                            className={`${style.Button} ${style.Previous} ${props.isDisabled && style.Disabled}`}
                                            onClick={props.onClick}
                                        />
                                    )}
                                </GoToPreviousPage>
                            </div>
                            <div style={{ padding: '0px 2px'}}>
                                <div className={style.PageInputBox}>
                                    <CurrentPageInput className={style.PageInputBox} />
                                </div>
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                / <NumberOfPages />
                            </div>
                            <div style={{ padding: '0px 2px' }}>
                                <GoToNextPage>
                                    {(props) => (
                                        <div
                                            className={`${style.Button} ${style.Next} ${props.isDisabled && style.Disabled}`}
                                            onClick={props.onClick}
                                        />
                                    )}
                                </GoToNextPage>
                            </div>
                            <div className={style.Divider} />
                            <div style={{ padding: '0px 2px' }}>
                                <EnterFullScreen>
                                    {(props) => (
                                        <div
                                            className={`${style.Button} ${style.FullScreen} ${props.isDisabled && style.Disabled}`}
                                            onClick={props.onClick}
                                        >
                                            <span>
                                                {fullScreen ? <BiExitFullscreen/> : <BiFullscreen/>}
                                            </span>
                                        </div>
                                    )}
                                </EnterFullScreen>
                            </div>
                        </>
                    );
                }}
            </Toolbar>
        </div>
    )

    return (
        <div className={"pdf-viewer-wrapper"}>
            <div className={style.ToolBarWrapper}>
                {renderToolBar()}
            </div>
            <div className={fullScreen ? `${style.PDFViewerFullScreen}`: style.PDFViewer}>
                <Viewer
                    fileUrl={getURL(archivalReferenceCode, id, 'Textual')}
                    plugins={[
                        toolbarPluginInstance
                    ]}
                    theme={{
                        theme: 'dark',
                    }}
                    defaultScale={SpecialZoomLevel.PageFit}
                />
            </div>
        </div>
    )
}

export default PDFViewer;
