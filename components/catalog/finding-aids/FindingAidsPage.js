import style from "./FindingAidsPage.module.scss";
import PrimaryTypeButton from "../../pages/parts/buttons/PrimaryTypeButton";
import useSWR from "swr";
import {fetcher, nextAPIFetcher} from "../../../utils/fetcherFunctions";
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

const FindingAidsPage = ({record}) => {
    const { id } = record;
    const { inCart } = useCart();

    const router = useRouter();

    const { data, error } = useSWR(`finding-aids/${id}/`, fetcher)

    const digitalContentRef = useRef();
    const metadataRef = useRef();

    const [language, setLanguage] = useState('EN');

    const getTitle = () => {
        if (language === 'EN') {
            return (
                <div className={style.Title}>
                    {data['archival_reference_code']} {data['title']}
                </div>
            )
        } else {
            return (
                <div className={style.Title}>
                    {data['archival_reference_code']} {data['title_original'] ? data['title_original'] : data['title']}
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

    if (data) {
        return (
            <div className={style.Page}>
                <div className={style.Header}>
                    <div className={style.HeaderData}>
                        { getTitle(data) }
                        <div className={style.Buttons}>
                            <CartButton
                                record={record}
                                inCart={inCart(id)}
                                name={id}
                            />
                            <PrimaryTypeButton primaryType={record['primary_type']} />
                            <AvailabilityButton record={record} />
                        </div>
                    </div>
                </div>
                {
                    data['digital_version_online'] &&
                    <React.Fragment>
                        <PageNavigation primaryType={record['primary_type']} onSelect={handleSelectSection}/>
                        <div ref={digitalContentRef}>
                            <FindingAidsDigitalContent id={id} data={data}/>
                        </div>
                    </React.Fragment>
                }
                <FindingAidsCitation citation={data['citation']} />
                <div ref={metadataRef}>
                    <FindingAidsMetadataPage id={id} data={data} language={language} />
                </div>
                <FindingAidsLocation id={id} onTreeNodeClick={handleTreeNodeClick} />
            </div>
        )
    } else {
        return <Loader/>
    }

}

export default FindingAidsPage;
