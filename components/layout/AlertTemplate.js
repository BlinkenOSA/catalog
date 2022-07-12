import alertStyle from "./AlertTemplate.module.scss";
import {AiOutlineClose, AiOutlineExclamationCircle} from 'react-icons/ai';
import React from "react";

const AlertTemplate = ({ style, options, message, close }) => (
    <div className={alertStyle.AlertWrapper} style={style}>
        <AiOutlineExclamationCircle />
        <span>{message}</span>
        <button onClick={close} className={alertStyle.Button} >
            <AiOutlineClose size={18} />
        </button>
    </div>
)

export default AlertTemplate;
