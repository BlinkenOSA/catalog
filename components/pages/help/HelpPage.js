import style from "./HelpPage.module.scss";
import React, {useEffect, useState} from "react";
import Terminology from "./parts/Terminology";
import Catalog from "./parts/Catalog";
import Organization from "./parts/Organization";
import Identifiers from "./parts/Identifiers";
import Request from "./parts/Request";
import Search from "./parts/Search";
import Pages from "./parts/Pages";
import Record from "./parts/Record";

const HelpPage = ({defaultSelected, isMobile}) => {
    const [selectedQuestion, setSelectedQuestion] = useState(defaultSelected)
    const [drawerOpen, setDrawerOpen] = useState(false)

    const helpMenuItems = [
        {key: 'catalog', label: 'What is in the catalog?'},
        {key: 'organisation', label: 'How are the materials organized?'},
        {key: 'identifiers', label: 'How records are identified?'},
        {key: 'request', label: 'Request and access rights'},
        {key: 'search', label: 'Search & filter'},
        {key: 'record', label: 'Opening a record'},
        {key: 'pages', label: 'Other pages in the catalog'},
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
                return <Catalog />
            case 'organisation':
                return <Organization />
            case 'terminology':
                return <Terminology />
            case 'identifiers':
                return <Identifiers />
            case 'request':
                return <Request />
            case 'search':
                return <Search />
            case 'record':
                return <Record />
            case 'pages':
                return <Pages />
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