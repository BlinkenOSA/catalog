import {getURL, getVideoURL} from "../../../../../../../utils/digitalObjectFunctions";
import '@vime/core/themes/default.css';
import {
    Player,
    Hls,
    ViewType,
    PlaybackControl,
    Controls,
    Ui,
    VolumeControl,
    ControlGroup,
    ScrubberControl,
    ControlSpacer,
    FullscreenControl,
    PipControl,
    TimeProgress, Control
} from '@vime/react';
import style from "./VideoViewer.module.scss"

const VideoViewer = ({identifier, isMobile}) => {
    console.log(identifier)

    return (
        <div className={isMobile ? `${style.VideoViewer} ${style.Mobile}` : style.VideoViewer}>
            <div className={style.VideoPlayer}>
                <Player
                    viewType={ViewType.Video}
                    theme={'osa'}
                >
                    <Hls version="v1.4.14">
                        <source
                            data-src={getVideoURL(identifier)}
                            type="application/x-mpegURL"
                        />
                    </Hls>
                    <Ui>
                        <Controls>
                            <ControlGroup>
                                <ScrubberControl />
                            </ControlGroup>

                            <ControlGroup space="top">
                                <PlaybackControl tooltipDirection={'right'} />
                                <VolumeControl />

                                <ControlSpacer />

                                <TimeProgress separator="/" />
                                <PipControl />
                                <FullscreenControl tooltipDirection={'left'} />
                            </ControlGroup>
                        </Controls>
                    </Ui>
                </Player>
            </div>
        </div>
    )
}

export default VideoViewer;
