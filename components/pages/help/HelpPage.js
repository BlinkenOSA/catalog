import style from "./HelpPage.module.scss";
import React, {useEffect, useState} from "react";
import Terminology from "./parts/Terminology";
import Catalog from "./parts/Catalog";
import Organization from "./parts/Organization";
import Identifiers from "./parts/Identifiers";
import Request from "./parts/Request";
import Search from "./parts/Search";
import Record from "./parts/Record";
import DigitalMaterials from "./parts/DigitalMaterials";

const helpMenuItems = [
    {key: 'catalog', label: 'Blinken OSA Archivum’s Catalog', anchor: 'blinken-osa-archivums-catalog'},
    {key: 'organisation', label: 'Organization of Records', anchor: 'organization-of-records'},
    {key: 'identifiers', label: 'Identifying records', anchor: 'identifying-records'},
    {key: 'request', label: 'Request and access', anchor: 'request-and-access'},
    {key: 'digital-materials', label: 'Accessing digital materials', anchor: 'accessing-digital-materials'},
    {key: 'search', label: 'Refining your search', anchor: 'refining-your-search'},
    {key: 'record', label: 'Interpreting your search results', anchor: 'interpreting-your-search-results'},
    {key: 'terminology', label: 'Terminology', anchor: 'terminology'},
]

const HelpPage = ({defaultSelected, isMobile}) => {
    const [selectedQuestion, setSelectedQuestion] = useState(defaultSelected)
    const [drawerOpen, setDrawerOpen] = useState(false)

    useEffect(() => {
        const syncSectionFromHash = () => {
            const item = helpMenuItems.find(item => `#${item.anchor}` === window.location.hash)
            setSelectedQuestion(item ? item.key : defaultSelected)
            setDrawerOpen(Boolean(item))
        }

        syncSectionFromHash()
        window.addEventListener('hashchange', syncSectionFromHash)
        return () => window.removeEventListener('hashchange', syncSectionFromHash)
    }, [defaultSelected])

    const renderQuestions = () => {
        return helpMenuItems.map(item => {
            return (
                <li
                    key={item['key']}
                    className={selectedQuestion === item['key'] ? style.Selected : ''}
                >
                    <a
                        href={`#${item.anchor}`}
                        onClick={() => onClickQuestion(item['key'])}
                        aria-current={selectedQuestion === item['key'] ? 'true' : undefined}
                    >
                        <span>{item['label']}</span>
                        <div className={style.Button}/>
                    </a>
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
            case 'digital-materials':
                return <DigitalMaterials />
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
