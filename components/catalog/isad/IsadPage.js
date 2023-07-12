import style from "./IsadPage.module.scss";
import PrimaryTypeButton from "../../pages/parts/buttons/PrimaryTypeButton";
import useSWR from "swr";
import {fetcher, nextAPIFetcher} from "../../../utils/fetcherFunctions";
import Loader from "../../pages/parts/loader/Loader";
import React, {useEffect, useState} from "react";
import LanguageButton from "../../pages/parts/buttons/LanguageButton";
import IsadMetadataPage from "./tabs/IsadMetadataPage";
import CollectionPage from "../../pages/CollectionPage";
import IsadContentPage from "./tabs/IsadContentPage";
import isadTabConfig from "./config/isadTabConfig";
import InsightsPage from "./tabs/InsightsPage";


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
            case 'insights':
                return <InsightsPage
                    archivalUnitID={ams_id}
                    descriptionLevel={record['description_level']}
                    language={language}
                    isMobile={isMobile}
                />
            case 'hierarchy':
                return <CollectionPage
                    activeUnitID={ams_id}
                    activeUnit={getActiveUnit()}
                    language={language}
                    isMobile={isMobile}/>
            case 'folders':
                return <IsadContentPage
                    seriesID={ams_id}
                    language={language}
                    isMobile={isMobile}/>
            default:
                return ''
        }
    }

    const renderTabName = (tab) => {
        return isadTabConfig[tab].hasOwnProperty(language) ? isadTabConfig[tab][language] : isadTabConfig[tab]['EN']
    }

    if (data) {
        return (
            <div className={style.Page}>
                <div className={isMobile ? `${style.Header} ${style.Mobile}` : style.Header}>
                    <div className={isMobile ? `${style.HeaderData} ${style.Mobile}` : style.HeaderData}>
                        { getTitle() }
                        <div className={style.Buttons}>
                            {
                                data['original_locale'] !== null &&
                                <LanguageButton
                                  name={`isad-page-language-selector-${isMobile ? 'mobile' : 'desktop'}`}
                                  selectedLanguage={language}
                                  originalLanguage={data['original_locale']}
                                  onLanguageChange={setLanguage}
                                />
                            }
                            <PrimaryTypeButton primaryType={record['primary_type']} />
                        </div>
                    </div>
                </div>
                <div className={isMobile ? `${style.Tabs} ${style.Mobile}` : style.Tabs}>
                    <div
                        onClick={() => setSelectedView('context')}
                        className={selectedView === 'context' ? style.Active : ''}>
                        {renderTabName('context')}
                    </div>
                    <div
                        onClick={() => setSelectedView('hierarchy')}
                        className={selectedView === 'hierarchy' ? style.Active : ''}>
                        {renderTabName('hierarchy')}
                    </div>
                    <div
                      onClick={() => setSelectedView('insights')}
                      className={selectedView === 'insights' ? style.Active : ''}>
                        {renderTabName('insights')}
                    </div>
                    {
                        record['description_level'] === 'Series' &&
                        <div
                            onClick={() => setSelectedView('folders')}
                            className={selectedView === 'folders' ? style.Active : ''}>
                            {isMobile ? renderTabName('folders-mobile') : renderTabName('folders')}
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
