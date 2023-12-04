import style from "./FindingAidsPage.module.scss";
import PrimaryTypeButton from "../../search/parts/PrimaryTypeButton";
import Loader from "../../../layout/Loader";
import React, {useEffect, useRef, useState} from "react";
import CartButton from "../../../cart/CartButton";
import {useCart} from "react-use-cart";
import AvailabilityButton from "../../search/results/parts/buttons/AvailabilityButton";
import FindingAidsMetadataPage from "./FindingAidsMetadataPage";
import FindingAidsLocation from "./FindingAidsLocation";
import dynamic from "next/dynamic";
import PageNavigation from "./parts/pageNavigation/PageNavigation";
import { useRouter } from 'next/router'
import FindingAidsCitation from "./parts/findingAidsCitation/FindingAidsCitation";
import LanguageButton from "../../search/parts/LanguageButton";
import AccessRightsButton from "../../search/parts/AccessRightsButton";

const FindingAidsDigitalContent = dynamic(() => import("./parts/findingAidsDigitalContent/FindingAidsDigitalContent"), {
    ssr: false,
});

const FindingAidsPage = ({solrData, metadata, hierarchy, isMobile}) => {
    const { id } = solrData;
    const { inCart } = useCart();

    const router = useRouter();
    
    const digitalContentRef = useRef();
    const metadataRef = useRef();

    const [language, setLanguage] = useState('EN');
    const [digitalContentHeight, setDigitalContentHeight] = useState(0)

    useEffect(() => {
        switch(metadata['primary_type']) {
            case 'Still Image':
                setDigitalContentHeight(isMobile ? 300 : 500)
                break;
            case 'Textual':
                setDigitalContentHeight(isMobile ? 300 : 500)
                break;
            case 'Moving Image':
                setDigitalContentHeight(isMobile ? 300 : 400)
                break;
            case 'Audio':
                setDigitalContentHeight(200)
                break;
        }
    }, [])

    const getTitle = () => {
        if (language === 'EN') {
            return (
                <div className={style.Title}>
                    {metadata['archival_reference_code']}<br/>{metadata['title']}
                </div>
            )
        } else {
            return (
                <div className={style.Title}>
                    {metadata['archival_reference_code']}<br/>{metadata['title_original'] ? metadata['title_original'] : metadata['title']}
                </div>
            )
        }
    }

    const handleSelectSection = (section) => {
        switch (section) {
            case 'home':
                window.scrollTo({top: 0, behavior: "smooth"})
                break;
            case 'digitalContent':
                window.scrollTo({top: 203, behavior: "smooth"})
                break;
            case 'metadata':
                window.scrollTo({top: 203 + digitalContentHeight, behavior: "smooth"})
                break;
        }
    }

    const handleTreeNodeClick = (id) => {
        router.push(`/catalog/${id}`);
    }

    if (metadata) {
        return (
            <div className={style.Page}>
                <div className={isMobile ? `${style.Header} ${style.Mobile}` : style.Header}>
                    <div className={isMobile ? `${style.HeaderData} ${style.Mobile}` : style.HeaderData}>
                        { getTitle(metadata) }
                        <div className={style.Buttons}>
                            {
                                !solrData['digital_version_online'] &&
                                <CartButton
                                    record={solrData}
                                    inCart={inCart(id)}
                                    name={id}
                                />
                            }
                            {
                              metadata['original_locale'] !== null &&
                              <LanguageButton
                                name={`finding-aids-page-language-selector-${isMobile ? 'mobile' : 'desktop'}`}
                                selectedLanguage={language}
                                originalLanguage={metadata['original_locale']}
                                onLanguageChange={setLanguage}
                              />
                            }
                            <AvailabilityButton record={solrData} />
                            <AccessRightsButton record={metadata} />
                            <div className={style.Divider} />
                            <PrimaryTypeButton primaryType={solrData['primary_type']} />
                        </div>
                    </div>
                </div>
                {
                    metadata['digital_version_online'] &&
                    <React.Fragment>
                        {
                            !isMobile &&
                            <PageNavigation primaryType={solrData['primary_type']} onSelect={handleSelectSection}/>
                        }
                        <div ref={digitalContentRef} className={style.DigitalContent} style={{minHeight: {digitalContentHeight}}}>
                            <FindingAidsDigitalContent id={id} data={metadata} isMobile={isMobile}/>
                        </div>
                    </React.Fragment>
                }
                <FindingAidsCitation language={language} citation={metadata['citation']} isMobile={isMobile} />
                <div ref={metadataRef}>
                    <FindingAidsMetadataPage id={id} data={metadata} language={language} isMobile={isMobile} />
                </div>
                <FindingAidsLocation data={hierarchy} language={language} onTreeNodeClick={handleTreeNodeClick} isMobile={isMobile} />
            </div>
        )
    } else {
        return <Loader/>
    }

}

export default FindingAidsPage;
