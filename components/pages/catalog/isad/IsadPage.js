import style from "./IsadPage.module.scss";
import PrimaryTypeButton from "../../search/parts/PrimaryTypeButton";
import Loader from "../../../layout/Loader";
import React, {useEffect, useState} from "react";
import LanguageButton from "../../search/parts/LanguageButton";
import IsadMetadataPage from "./tabs/IsadMetadataPage";
import CollectionPage from "../../collections/CollectionPage";
import IsadContentPage from "./tabs/IsadContentPage";
import isadTabConfig from "./config/isadTabConfig";
import InsightsPage from "./tabs/InsightsPage";


const IsadPage = ({solrData, metadata, hierarchy, insights, isMobile}) => {
    const { id, ams_id } = solrData;

    const [language, setLanguage] = useState('EN');
    const [selectedView, setSelectedView] = useState('context')

    const getTitle = () => {
        if (language === 'EN') {
            return (
                <div className={style.Title}>
                    {metadata['reference_code']} {metadata['title']}
                </div>
            )
        } else {
            return (
                <div className={style.Title}>
                    {metadata['reference_code']} {metadata['title_original'] ? metadata['title_original'] : metadata['title']}
                </div>
            )
        }
    }

    const getActiveUnit = () => {
        return metadata['reference_code'].replace("HU OSA ", "hu_osa_")
    }

    const renderContent = () => {
        switch (selectedView) {
            case 'context':
                return <IsadMetadataPage
                    id={id}
                    data={metadata}
                    language={language}
                    isMobile={isMobile}/>
            case 'insights':
                return <InsightsPage
                    data={insights}
                />
            case 'hierarchy':
                return <CollectionPage
                    activeUnitID={ams_id}
                    activeUnit={getActiveUnit()}
                    data={hierarchy}
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

    if (metadata) {
        return (
            <div className={style.Page}>
                <div className={isMobile ? `${style.Header} ${style.Mobile}` : style.Header}>
                    <div className={isMobile ? `${style.HeaderData} ${style.Mobile}` : style.HeaderData}>
                        { getTitle() }
                        <div className={style.Buttons}>
                            {
                                metadata['original_locale'] !== null &&
                                <>
                                    <LanguageButton
                                      name={`isad-page-language-selector-${isMobile ? 'mobile' : 'desktop'}`}
                                      selectedLanguage={language}
                                      originalLanguage={metadata['original_locale']}
                                      onLanguageChange={setLanguage}
                                    />
                                    <div className={style.Divider} />
                                </>
                            }
                            <PrimaryTypeButton
                              primaryType={solrData['primary_type']}
                              descriptionLevel={solrData['description_level']} />
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
                        metadata['description_level'] === 'Series' &&
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
