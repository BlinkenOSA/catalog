import style from "./FindingAidsPage.module.scss";
import PrimaryTypeButton from "../../pages/parts/buttons/PrimaryTypeButton";
import Loader from "../../pages/parts/loader/Loader";
import React, {useRef, useState} from "react";
import CartButton from "../../cart/CartButton";
import {useCart} from "react-use-cart";
import AvailabilityButton from "../../results/parts/buttons/AvailabilityButton";
import FindingAidsMetadataPage from "./FindingAidsMetadataPage";
import FindingAidsLocation from "./FindingAidsLocation";
import dynamic from "next/dynamic";
import PageNavigation from "./parts/pageNavigation/PageNavigation";
import { useRouter } from 'next/router'
import FindingAidsCitation from "./parts/findingAidsCitation/FindingAidsCitation";

const FindingAidsDigitalContent = dynamic(() => import("./parts/findingAidsDigitalContent/FindingAidsDigitalContentOld"), {
    ssr: false,
});

const FindingAidsPage = ({solrData, metadata, hierarchy, isMobile}) => {
    const { id } = solrData;
    const { inCart } = useCart();

    const router = useRouter();
    
    const digitalContentRef = useRef();
    const metadataRef = useRef();

    const [language, setLanguage] = useState('EN');

    const getTitle = () => {
        if (language === 'EN') {
            return (
                <div className={style.Title}>
                    {metadata['archival_reference_code']} {metadata['title']}
                </div>
            )
        } else {
            return (
                <div className={style.Title}>
                    {metadata['archival_reference_code']} {metadata['title_original'] ? metadata['title_original'] : metadata['title']}
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
                window.scrollTo({top: 705, behavior: "smooth"})
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
                            <CartButton
                                record={solrData}
                                inCart={inCart(id)}
                                name={id}
                            />
                            <PrimaryTypeButton primaryType={solrData['primary_type']} />
                            <AvailabilityButton record={solrData} />
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
                        <div ref={digitalContentRef} style={isMobile ? {minHeight: 300} : {minHeight: 500}}>
                            <FindingAidsDigitalContent id={id} data={metadata} isMobile={isMobile}/>
                        </div>
                    </React.Fragment>
                }
                <FindingAidsCitation citation={metadata['citation']} isMobile={isMobile} />
                <div ref={metadataRef}>
                    <FindingAidsMetadataPage id={id} data={metadata} language={language} isMobile={isMobile} />
                </div>
                <FindingAidsLocation data={hierarchy} onTreeNodeClick={handleTreeNodeClick} isMobile={isMobile} />
            </div>
        )
    } else {
        return <Loader/>
    }

}

export default FindingAidsPage;
