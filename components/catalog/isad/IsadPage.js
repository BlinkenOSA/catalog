import style from "./IsadPage.module.scss";
import PrimaryTypeButton from "../../pages/parts/buttons/PrimaryTypeButton";
import useSWR from "swr";
import {nextAPIFetcher} from "../../../utils/fetcherFunctions";
import Loader from "../../pages/parts/loader/Loader";
import React, {useState} from "react";
import LanguageButton from "../../pages/parts/buttons/LanguageButton";
import IsadMetadataPage from "./IsadMetadataPage";
import CollectionPage from "../../pages/CollectionPage";


const IsadPage = ({record}) => {
    const { id } = record;
    const { data, error } = useSWR(`/api/record/${id}`, nextAPIFetcher)

    const [language, setLanguage] = useState('EN');
    const [selectedView, setSelectedView] = useState('context')

    const getTitle = () => {
        return (
            <div className={style.Title}>
                {record['reference_code']} {record['title']}
                {record['title_original'] && <span> ({record['title_original']})</span>}
            </div>
        )
    }

    const getActiveUnit = () => {
        return record['reference_code'].replace("HU OSA ", "hu_osa_")
    }

    const renderContent = () => {
        switch (selectedView) {
            case 'context':
                return <IsadMetadataPage data={data} language={language} />
            case 'hierarchy':
                return <CollectionPage fondsID={'23'} activeUnitID={'25'} activeUnit={getActiveUnit()}/>
            default:
                return ''
        }
    }

    if (data) {
        return (
            <div className={style.Page}>
                <div className={style.Header}>
                    <div className={style.HeaderData}>
                        { getTitle(data) }
                        <div className={style.Buttons}>
                            {
                                data.hasOwnProperty('isad-translation') &&
                                <LanguageButton onLanguageChange={setLanguage} />
                            }
                            <PrimaryTypeButton primaryType={record['primary_type']} />
                        </div>
                    </div>
                    <div className={style.Thumbnail}>
                        <div>
                            <img
                                alt={`Cover`}
                                style={{maxHeight: '300px'}}
                                src={``}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.Tabs}>
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
                    <div
                        onClick={() => setSelectedView('folders')}
                        className={selectedView === 'folders' ? style.Active : ''}>
                        Folders / Items in this series
                    </div>
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
