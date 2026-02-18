import style from "./Steps.module.scss";
import {Collapse} from "react-collapse";
import React, {useState} from "react";
import RequestAndUse from "./RequestAndUse";
import Restrictions from "./Restrictions";
import ReproductionAndReUse from "./ReproductionAndReUse";
import Disclaimer from "./Disclaimer";
import PrivacyPolicy from "./PrivacyPolicy";

const Steps = ({addStep, hasStep}) => {
    const [openStep, setOpenStep] = useState('disclaimer');

    const helpMenuItems = [
        {key: 'disclaimer', label: 'Disclaimer', content: <Disclaimer />},
        {key: 'request_and_use', label: 'Request and Use of Materials in the Research Room', content: <RequestAndUse/>},
        {key: 'restrictions', label: 'Restrictions', content: <Restrictions />},
        {key: 'reproduction', label: 'Reproduction and Re-Use', content: <ReproductionAndReUse />},
        {key: 'privacy_notice', label: 'Privacy Policy for the Blinken OSA Archivum’s Catalog', content: <PrivacyPolicy />},
    ]

    const getListClass = (key) => {
        if (openStep === key) {
            return `${style.ListElement} ${style.Selected}`
        } else {
            return hasStep(key) ? `${style.ListElement} ${style.Accepted}` : style.ListElement
        }
    }

    return helpMenuItems.map((item, index) => {
        return (
            <div key={item['key']} className={style.ListElementWrapper}>
                <li
                    className={getListClass(item['key'])}
                    onClick={() => {
                        window.scrollTo({top: 0, behavior: "smooth"})
                        setOpenStep(item['key'])}
                    }
                >
                        <span>
                            {item['label']}{hasStep(item['key']) ? ' - Accepted' : ''}
                        </span>
                    <div className={style.Button}/>
                </li>
                <Collapse isOpened={openStep === item['key']}>
                    {item['content']}
                    <div className={style.AcceptButton}>
                        {
                            hasStep(item['key']) ?
                                <div className={`${style.Button} ${style.Disabled}`}>
                                    Accepted
                                </div>
                                :
                                <div className={style.Button} onClick={
                                    () => {
                                        index < 4 ? setOpenStep(helpMenuItems[index + 1]['key']) : setOpenStep();
                                        window.scrollTo({top: 0, behavior: "smooth"})
                                        addStep(item['key']);
                                    }}>Accept</div>
                        }
                    </div>
                </Collapse>
            </div>
        )
    })
}

export default Steps;