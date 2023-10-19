import style from "./HelpPage.module.scss";
import React, {useEffect, useState} from "react";
import Terminology from "./parts/Terminology";
import Catalog from "./parts/Catalog";

const HelpPage = ({defaultSelected}) => {
    const [selectedQuestion, setSelectedQuestion] = useState(defaultSelected)

    const helpMenuItems = [
        {key: 'catalog', label: 'What\'s in the catalog?'},
        {key: 'hierarchy', label: 'How is the content organized?'},
        {key: 'reference_code', label: 'How to identify records?'},
        {key: 'search', label: 'Search & filter'},
        {key: 'record', label: 'Opening a record'},
        {key: 'access', label: 'Access rights'},
        {key: 'request', label: 'How can I request materials?'},
        {key: 'pages', label: 'Pages in the catalog'},
        {key: 'terminology', label: 'Terminology'},
    ]

    const renderQuestions = () => {
        return helpMenuItems.map(item => {
            return (
                <li
                    onClick={() => setSelectedQuestion(item['key'])}
                    className={selectedQuestion === item['key'] ? style.Selected : ''}
                >
                    <span>{item['label']}</span>
                    <div className={style.Button}/>
                </li>
            )
        })
    }

    const renderContent = () => {
        switch (selectedQuestion) {
            case 'catalog':
                return <Catalog />
            case 'terminology':
                return <Terminology />
            default:
                break;
        }
    }

    return (
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