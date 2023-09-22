import style from './ArchivalUnitDrawer.module.scss'
import useSWR from "swr";
import {fetcher} from "../../../../utils/fetcherFunctions";
import Loader from "../../../layout/Loader";
import LanguageButton from "../../search/parts/LanguageButton";
import {useState} from "react";
import PrimaryTypeButton from "../../search/parts/PrimaryTypeButton";
import Button from "../../search/parts/Button";
import DateDistribution from "./DateDistribution";
import parse from "html-react-parser";


const ArchivalUnitDrawer = ({open, archivalUnitID, onClose, isMobile}) => {
    const {data, error} = useSWR(archivalUnitID !== 0 ? `archival-units-tree-quick-view/${archivalUnitID}/` : undefined, fetcher);
    const [language, setLanguage] = useState('EN')

    const getDataWithLabel = (label, text, isHTML=false) => {
        if (text) {
            return (
                <div className={style.Row}>
                    <div>
                        <div className={style.Label}>{label}</div>
                        <div className={style.Text}>{isHTML ? parse(text) : text}</div>
                    </div>
                </div>
            )
        } else {
            return ''
        }

    }

    const renderButtons = () => {
        return (
            <div className={style.Buttons}>
                {
                    data['original_locale'] !== null &&
                    <LanguageButton
                        name={'archival-unit-drawer-language-selector'}
                        selectedLanguage={language}
                        originalLanguage={data['original_locale']}
                        onLanguageChange={setLanguage}
                    />
                }
                <PrimaryTypeButton primaryType={'Archival Unit'} />
                <Button text={'Show full record'} link={`/catalog/${data['catalog_id']}`}/>
            </div>
        )
    }

    const renderDates = (label) => {
        const displayPredominantDate = () => {
            if (data['date_predominant']) {
                if (data['date_predominant'].includes('predominant')) {
                    return ` (${data['date_predominant']})`
                } else {
                    return ` (predominant ${data['date_predominant']})`
                }
            } else {
                return ''
            }
        }

        return (
            <div className={style.Row}>
                <div>
                    <div className={style.Label}>{label}</div>
                    <div className={style.Text}>
                        {data['year_from']}{data['year_to'] ? ` - ${data['year_to']}` : ''}
                        {displayPredominantDate()}
                    </div>
                </div>
            </div>
        )
    }

    const getDescriptionLevel = (level) => {
        switch (level) {
            case 'F':
                return 'Fonds';
            case 'SF':
                return 'Subfonds';
            case 'S':
                return 'Series'
        }
    }

    const renderContent = () => {
        if (language === 'EN') {
            return (
                <div className={style.ArchivalUnitData}>
                    <div className={style.Header}>
                        <h1>{data['reference_code']} {data['title']}</h1>
                        {renderButtons()}
                    </div>
                    {getDataWithLabel('Reference Code', data['reference_code'])}
                    {getDataWithLabel('Title', data['title'])}
                    {renderDates('Date(s)')}
                    <DateDistribution archivalUnitID={archivalUnitID} descriptionLevel={getDescriptionLevel(data['description_level'])} />
                    {getDataWithLabel('Archival History', data['archival_history'], true)}
                    {getDataWithLabel('Scope and Content (abstract)', data['scope_and_content_abstract'], true)}
                    {getDataWithLabel('Scope and Content (narrative)', data['scope_and_content_narrative'], true)}
                </div>
            )
        } else {
            return (
                <div className={style.ArchivalUnitData}>
                    <div className={style.Header}>
                        <h1>{data['reference_code']} {data['title_original']}</h1>
                        {renderButtons()}
                    </div>
                    {getDataWithLabel('Reference Code', data['reference_code'])}
                    {getDataWithLabel('Cím', data['title_original'])}
                    {renderDates('Időkör(ök)')}
                    <DateDistribution archivalUnitID={archivalUnitID} descriptionLevel={getDescriptionLevel(data['description_level'])} />
                    {getDataWithLabel('Archival History', data['archival_history_original'], true)}
                    {getDataWithLabel('Scope and Content (abstract)', data['scope_and_content_abstract_original'], true)}
                    {getDataWithLabel('Scope and Content (narrative)', data['scope_and_content_narrative_original'], true)}
                </div>
            )
        }
    }

    const renderInfo = () => {
        return (
            <div className={style.Info} >
                <div className={style.InfoFace}>つ(ಠ益ಠノ)</div>
                <div className={style.InfoMainText}>Select a collection</div>
                <div className={style.InfoText}>
                    If you click on a title, you will see a short information<br/>
                    about the collection.
                </div>
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className={open ? `${style.Drawer} ${style.Mobile}` : `${style.Drawer} ${style.Closed} ${style.Mobile}`}>
                <div className={style.Window}>
                    <div className={style.CloseButton} onClick={onClose}>
                        <span> </span>
                        <span> </span>
                    </div>
                    {data ? renderContent() : <Loader/>}
                </div>
            </div>
        )
    } else {
        return (
            <div className={style.Drawer}>
                {
                    open ?
                        <div className={style.Window}>
                            {data ? renderContent() : <Loader/>}
                        </div> : renderInfo()
                }
            </div>
        )
    }
}

export default ArchivalUnitDrawer;
