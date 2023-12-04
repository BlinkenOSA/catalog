import {getAudioURL} from "../../../../../../../utils/digitalObjectFunctions";
import '@vime/core/themes/default.css';
import {
    Player,
    Audio,
    ViewType,
    PlaybackControl,
    Controls,
    Ui,
    VolumeControl,
    ControlGroup,
    ScrubberControl,
    ControlSpacer,
    TimeProgress
} from '@vime/react';
import style from "./AudioPlayer.module.scss"

const AudioPlayer = ({identifier, data, isMobile}) => {
    return (
        <div className={isMobile ? `${style.AudioViewer} ${style.Mobile}` : style.AudioViewer}>
            <div className={style.Thumbnail}>
                <img
                    className={style.Thumbnail}
                    width={200}
                    alt={'thumbnail'}
                    src={getAudioURL(identifier, true)}
                />
            </div>
            <div className={style.PlayerWrapper}>
                <div className={style.PlayerTop}>
                    <div className={style.Title}>{data['title']}</div>
                    <div className={style.RefCode}>{data['archival_reference_code']}</div>
                </div>
                <div className={style.AudioPlayer}>
                    <Player
                        viewType={ViewType.Audio}
                        theme={'osa'}
                    >
                        <Audio>
                            <source
                                data-src={getAudioURL(identifier)}
                                type="audio/mp3"
                            />
                        </Audio>
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
                                </ControlGroup>
                            </Controls>
                        </Ui>
                    </Player>
                </div>
            </div>
        </div>
    )
}

export default AudioPlayer;
