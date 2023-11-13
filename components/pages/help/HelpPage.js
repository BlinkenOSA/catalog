import style from "./HelpPage.module.scss";
import React, {useEffect, useState} from "react";
import Terminology from "./parts/Terminology";
import Catalog from "./parts/Catalog";
import Organization from "./parts/Organization";
import Identifiers from "./parts/Identifiers";
import Request from "./parts/Request";
import Search from "./parts/Search";
import Record from "./parts/Record";

const HelpPage = ({defaultSelected, isMobile}) => {
    const [selectedQuestion, setSelectedQuestion] = useState(defaultSelected)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const helpMenuItems = [
        {key: 'catalog', label: 'Blinken OSA Archivum’s Catalog'},
        {key: 'organisation', label: 'Organization of Records'},
        {key: 'identifiers', label: 'Identifying records'},
        {key: 'request', label: 'Request and access'},
        {key: 'search', label: 'Refining your search'},
        {key: 'record', label: 'Interpreting your search results'},
        {key: 'terminology', label: 'Terminology'},
    ]

    const renderQuestions = () => {
        return helpMenuItems.map(item => {
            return (
                <li
                    key={item['key']}
                    onClick={() => onClickQuestion(item['key'])}
                    className={selectedQuestion === item['key'] ? style.Selected : ''}
                >
                    <span>{item['label']}</span>
                    <div className={style.Button}/>
                </li>
            )
        })
    }

    const onClickQuestion = (key) => {
        setSelectedQuestion(key)
        setDrawerOpen(true)
    }

    const renderContent = () => {
        switch (selectedQuestion) {
            case 'catalog':
                return <Catalog isMobile={isMobile}/>
            case 'organisation':
                return <Organization isMobile={isMobile}/>
            case 'terminology':
                return <Terminology isMobile={isMobile} />
            case 'identifiers':
                return <Identifiers isMobile={isMobile}/>
            case 'request':
                return <Request isMobile={isMobile} />
            case 'search':
                return <Search isMobile={isMobile} />
            case 'record':
                return <Record isMobile={isMobile} />
            default:
                break;
        }
    }

    const onClose = () => {
        setDrawerOpen(false)
    }

    return (
            isMobile ?
                <div>
                    <div className={style.ContentWrapper}>
                        <div className={style.Questions}>
                            <ul>{renderQuestions()}</ul>
                        </div>
                    </div>
                    <div className={drawerOpen ? style.MobileInfoWrapper : `${style.MobileInfoWrapper} ${style.Closed}`}>
                        <div className={style.CloseButton} onClick={onClose}>
                            <span> </span>
                            <span> </span>
                        </div>
                        {renderContent()}
                    </div>
                </div>
            :
            <div className={style.ContentWrapper}>
                <div className={style.Questions}>
                    <ul>{renderQuestions()}</ul>
                </div>
                <div className={style.Content}>
                    {renderContent()}
                </div>
            </div>
    )
}

export default HelpPage;