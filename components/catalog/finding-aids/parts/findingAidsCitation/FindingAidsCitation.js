import style from "./FindingAidsCitation.module.scss";
import React, {useState} from "react";
import Button from "../../../../pages/parts/buttons/Button";

const FindingAidsCitation = ({citation}) => {
    const [copied, setCopied] = useState(false);

    const onClick = () => {
        setCopied(true)
        navigator.clipboard.writeText(citation)
        setTimeout(() => {
            setCopied(false);
        },5000);
    }

    return (
        <div className={style.Citation}>
            <div className={style.Category}>Citation</div>
            <div className={style.Label}>
                <Button
                    text={copied ? `Citation copied` : `Copy citation to clipboard`}
                    disabled={copied}
                    onClick={onClick}
                />
            </div>
            <div className={style.Value}>{citation}</div>
        </div>
    )
}

export default FindingAidsCitation;
