import style from './ArchivalUnitDrawer.module.scss'
import useSWR from "swr";
import {fetcher} from "../../../../utils/fetcherFunctions";
import Loader from "../loader/Loader";
import LanguageButton from "../buttons/LanguageButton";
import {useState} from "react";
import PrimaryTypeButton from "../buttons/PrimaryTypeButton";
import Button from "../buttons/Button";

const ArchivalUnitDrawer = ({open, archivalUnitID, onClose}) => {
    const {data, error} = useSWR(`/archival_units/${archivalUnitID}`, fetcher);
    const [language, setLanguage] = useState('EN')

    const getDataWithLabel = (category, label, text, isLast=false) => {
        if (text) {
            return (
                <div className={isLast ? style.RowLast : style.Row}>
                    <div className={style.Category}>{category}</div>
                    <div>
                        <div className={style.Label}>{label}</div>
                        <div className={style.Text}>{text}</div>
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
                <LanguageButton
                    originalLanguage={data['locale']}
                    onLanguageChange={setLanguage}
                />
                <PrimaryTypeButton primaryType={'Archival Unit'} />
                <Button text={'Show full record'} link={'/archival_unit/1312'}/>
                <Button text={'Show Folders / items'} link={'/search/'} />
            </div>
        )
    }

    const renderContent = () => {
        if (language === 'EN') {
            return (
                <div className={style.ArchivalUnitData}>
                    <div className={style.Header}>
                        <h1>{data['reference_code']} {data['title']}</h1>
                        {renderButtons()}
                    </div>
                    {getDataWithLabel('Identity Statement', 'Reference Code', data['reference_code'])}
                    {getDataWithLabel('', 'Title', data['title'])}
                    {getDataWithLabel('Context', 'Archival History', data['archival_history'])}
                    {getDataWithLabel('', 'Scope and Content', data['scope_and_content'], true)}
                </div>
            )
        } else {
            return (
                <div className={style.ArchivalUnitData}>
                    <div className={style.Header}>
                        <h1>{data['reference_code']} {data['title_original']}</h1>
                        {renderButtons()}
                    </div>
                    {getDataWithLabel('Identity Statement', 'Reference Code', data['reference_code'])}
                    {getDataWithLabel('', 'Cím', data['title_original'])}
                    {getDataWithLabel('Kontextus', 'Archival History', data['archival_history_original'])}
                    {getDataWithLabel('', 'Scope and Content', data['scope_and_content_original'], true)}
                </div>
            )
        }
    }

    return (
        <div className={open ? style.DrawerOpen : style.DrawerClosed}>
            {data ? renderContent() : <Loader/>}
        </div>
    )
}

export default ArchivalUnitDrawer;
