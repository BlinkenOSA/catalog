import style from "./FindingAidsCitation.module.scss";
import React, {useState} from "react";
import Button from "../../../../pages/parts/buttons/Button";

const FindingAidsCitation = ({citation, language, isMobile}) => {
    const [copied, setCopied] = useState(false);

    const label = {
      'EN': 'Citation',
      'HU': 'Hivatkozás'
    }

    const labelClipboard = {
      'EN': 'Copy citation to clipboard',
      'HU': 'Hivatkozás másolása vágólapra'
    }

    const onClick = () => {
        setCopied(true)
        navigator.clipboard.writeText(citation)
        setTimeout(() => {
            setCopied(false);
        },5000);
    }

    if (isMobile) {
        return (
            <div className={isMobile ? `${style.Citation} ${style.Mobile}` : style.Citation}>
                <div className={style.Category}>{label[language]}</div>
                <div className={style.ValueWrapper}>
                    <div className={style.Label}>
                        <Button
                            text={copied ? `Citation copied` : `${labelClipboard[language]}`}
                            disabled={copied}
                            onClick={onClick}
                        />
                    </div>
                    <div className={style.Value}>{citation}</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={style.Citation}>
                <div className={style.Category}>{label[language]}</div>
                <div className={style.Label}>
                    <Button
                        text={copied ? `Citation copied` : `${labelClipboard[language]}`}
                        disabled={copied}
                        onClick={onClick}
                    />
                </div>
                <div className={style.Value}>{citation}</div>
            </div>
        )
    }

}

export default FindingAidsCitation;
