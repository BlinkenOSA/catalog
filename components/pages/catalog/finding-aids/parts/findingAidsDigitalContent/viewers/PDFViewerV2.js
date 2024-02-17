import { Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import style from "./PDFViewerV2.module.scss"
import React, {useState} from "react";
import {BiFullscreen, BiExitFullscreen, BiSearch} from 'react-icons/bi';
import {getPdfURL, getURL} from '../../../../../../../utils/digitalObjectFunctions';
import {defaultLayoutPlugin} from "@react-pdf-viewer/default-layout";

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import "@react-pdf-viewer/default-layout/lib/styles/index.css"



const PDFViewer = ({identifier, fileNames}) => {
    const transform = (slot) => {
        const { GoToPreviousPage, GoToNextPage, CurrentPageInput, NumberOfPages, ShowSearchPopover, ZoomIn, ZoomOut } = slot;

        return Object.assign({}, slot, {
            Download: () => <></>,
            SwitchTheme: () => <></>,
            Print: () => <></>,
            Open: () => <></>,
            MoreActionsPopover: () => <></>,
            ShowSearchPopover: () => (
                <ShowSearchPopover>
                    {(props) => (
                        <div style={{display: 'flex'}}>
                            <div
                                className={`${style.Button} ${style.Search}`}
                                onClick={props.onClick}
                            >
                                <span>
                                  <BiSearch size={17} />
                                </span>
                            </div>
                            <div className={style.Divider}/>
                        </div>
                    )}
                </ShowSearchPopover>
            ),
            GoToPreviousPage: () => (
                <GoToPreviousPage>
                    {(props) => (
                        <div
                            className={`${style.Button} ${style.Previous} ${props.isDisabled && style.Disabled}`}
                            onClick={props.onClick}
                        />
                    )}
                </GoToPreviousPage>
            ),
            CurrentPageInput: () => (
                <div className={style.CurrentPageInput}>Page <CurrentPageInput /> of&nbsp;</div>
            ),
            GoToNextPage: () => (
                <GoToNextPage>
                    {(props) => (
                        <div
                            className={`${style.Button} ${style.Next} ${props.isDisabled && style.Disabled}`}
                            onClick={props.onClick}
                        />
                    )}
                </GoToNextPage>
            ),
            ZoomIn: () => (
                <ZoomIn>
                    {(props) => (
                        <div
                            className={`${style.Button} ${style.ZoomIn}`}
                            onClick={props.onClick}
                        />
                    )}
                </ZoomIn>
            ),
            ZoomOut: () => (
                <ZoomOut>
                    {(props) => (
                        <div
                            className={`${style.Button} ${style.ZoomOut}`}
                            onClick={props.onClick}
                        />
                    )}
                </ZoomOut>
            ),
        });
    }

    const renderToolbar = Toolbar => (
        <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
    )

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        renderToolbar,
        sidebarTabs: (defaultTabs) => [],
        toolbarPlugin: {
            fullScreenPlugin: {
                getFullScreenTarget: pagesContainer =>
                    pagesContainer.closest('[data-testid="default-layout__body"]'),
                renderExitFullScreenButton: props => <></>
            }
        }
    })

    const { renderDefaultToolbar } = defaultLayoutPluginInstance.toolbarPluginInstance

    return (
        <div className={"pdf-viewer-wrapper"}>
            <div className={style.PDFViewer}>
                <Viewer
                    fileUrl={getPdfURL(identifier, fileNames[0])}
                    plugins={[defaultLayoutPluginInstance]}
                    renderLoader={(percentages) => (
                      <div className={style.Loader}>
                        Loading {Math.round(percentages)}% ...
                      </div>
                    )}
                    theme={{
                        theme: 'light',
                    }}
                    defaultScale={1.3}
                />
            </div>
        </div>
    )
}

export default PDFViewer;
