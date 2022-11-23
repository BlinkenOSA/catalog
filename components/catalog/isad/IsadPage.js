import style from "./IsadPage.module.scss";
import PrimaryTypeButton from "../../pages/parts/buttons/PrimaryTypeButton";
import useSWR from "swr";
import {fetcher, nextAPIFetcher} from "../../../utils/fetcherFunctions";
import Loader from "../../pages/parts/loader/Loader";
import React, {useState} from "react";
import LanguageButton from "../../pages/parts/buttons/LanguageButton";
import IsadMetadataPage from "./tabs/IsadMetadataPage";
import CollectionPage from "../../pages/CollectionPage";
import IsadContentPage from "./tabs/IsadContentPage";


const IsadPage = ({record, isMobile}) => {
    const { id, ams_id } = record;
    const { data, error } = useSWR(`archival-units/${ams_id}/`, fetcher)

    const [language, setLanguage] = useState('EN');
    const [selectedView, setSelectedView] = useState('context')

    const getTitle = () => {
        if (language === 'EN') {
            return (
                <div className={style.Title}>
                    {data['reference_code']} {data['title']}
                </div>
            )
        } else {
            return (
                <div className={style.Title}>
                    {data['reference_code']} {data['title_original'] ? data['title_original'] : data['title']}
                </div>
            )
        }
    }

    const getActiveUnit = () => {
        return record['reference_code'].replace("HU OSA ", "hu_osa_")
    }

    const renderContent = () => {
        switch (selectedView) {
            case 'context':
                return <IsadMetadataPage
                    id={id}
                    data={data}
                    language={language}
                    isMobile={isMobile}/>
            case 'hierarchy':
                return <CollectionPage
                    activeUnitID={record['ams_id']}
                    activeUnit={getActiveUnit()}
                    isMobile={isMobile}/>
            case 'folders':
                return <IsadContentPage
                    seriesID={id}
                    language={language}
                    isMobile={isMobile}/>
            default:
                return ''
        }
    }

    if (data) {
        return (
            <div className={style.Page}>
                <div className={isMobile ? `${style.Header} ${style.Mobile}` : style.Header}>
                    <div className={isMobile ? `${style.HeaderData} ${style.Mobile}` : style.HeaderData}>
                        { getTitle() }
                        <div className={style.Buttons}>
                            {
                                data.hasOwnProperty('original_locale') &&
                                <LanguageButton onLanguageChange={setLanguage} />
                            }
                            <PrimaryTypeButton primaryType={record['primary_type']} />
                        </div>
                    </div>
                </div>
                <div className={isMobile ? `${style.Tabs} ${style.Mobile}` : style.Tabs}>
                    <div
                        onClick={() => setSelectedView('context')}
                        className={selectedView === 'context' ? style.Active : ''}>
                        Context
                    </div>
                    <div
                        onClick={() => setSelectedView('hierarchy')}
                        className={selectedView === 'hierarchy' ? style.Active : ''}>
                        Hierarchy
                    </div>
                    {
                        record['description_level'] === 'Series' &&
                        <div
                            onClick={() => setSelectedView('folders')}
                            className={selectedView === 'folders' ? style.Active : ''}>
                            {isMobile ? 'Folders / Items' : 'Folders / Items in this series'}
                        </div>
                    }
                    <div className={style.TabPlaceholder}> </div>
                </div>
                { renderContent() }
            </div>
        )
    } else {
        return <Loader/>
    }

}

export default IsadPage;
