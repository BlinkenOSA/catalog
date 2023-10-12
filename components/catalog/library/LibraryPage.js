import style from "./LibraryPage.module.scss";
import CartButton from "../../cart/CartButton";
import {useCart} from "react-use-cart";
import AvailabilityButton from "../../pages/search/results/parts/buttons/AvailabilityButton";
import PrimaryTypeButton from "../../pages/search/parts/PrimaryTypeButton";
import Loader from "../../layout/Loader";
import React from "react";
import LibraryItem from "./LibraryItem";
import {libraryFieldConfig} from "./config/libraryFieldConfig";
import {filmLibraryFieldConfig} from "./config/filmLibraryFieldConfig";
import LibraryHoldings from "./desktop/LibraryHoldings";
import LibraryHoldingsMobile from "./mobile/LibraryHoldingsMobile";
import Title from "../../pages/search/results/parts/metadata/Title";


const LibraryPage = ({solrData, data, type, isMobile}) => {
    const { inCart } = useCart();

    const config = type === 'library' ? libraryFieldConfig : filmLibraryFieldConfig;

    const { id } = solrData;

    const getKey = (idx) => {
      const key01 = type === 'library' ? 'library' : 'film-library'
      const key02 = isMobile ? 'mobile' : 'desktop'
      return `${key01}-${key02}-${idx}`
    }

    if (data) {
        return (
            <div className={style.Page}>
                <div className={isMobile ? `${style.Header} ${style.Mobile}` : style.Header}>
                    <div className={isMobile ? `${style.HeaderData} ${style.Mobile}` : style.HeaderData}>
                        <div className={style.Title}>
                            <Title result={solrData} />
                        </div>
                        <div className={style.Buttons}>
                            <CartButton
                                record={solrData}
                                inCart={inCart(id)}
                                name={id}
                            />
                            <AvailabilityButton record={solrData} />
                            <PrimaryTypeButton primaryType={solrData['primary_type']} />
                        </div>
                    </div>
                    { solrData['thumbnail'] &&
                        <div className={isMobile ? `${style.Thumbnail} ${style.Mobile}` : style.Thumbnail}>
                            <div>
                                <img
                                    alt={`Cover`}
                                    style={{maxHeight: '250px'}}
                                    src={`${solrData['thumbnail']}`}
                                />
                            </div>
                        </div>
                    }
                </div>
                <div>
                    {
                        config.map(fc => (
                            <div className={style.MetadataGroup} key={fc['group']}>
                                {
                                    fc['fields'].map((f, index) => (
                                    <LibraryItem
                                        id={getKey(index)}
                                        key={getKey(index)}
                                        record={data}
                                        group={fc['group']}
                                        label={f['label']}
                                        links={f['links']}
                                        fieldConfig={f['fieldConfig']}
                                        display={f.hasOwnProperty('display') ? f['display'] : 'sameRow'}
                                        isMobile={isMobile}
                                    />
                                ))}
                            </div>
                        ))
                    }
                </div>
                <div>
                {
                    isMobile ?
                    <LibraryHoldingsMobile record={data} type={type} /> :
                    <LibraryHoldings record={data} type={type} />
                }
                </div>
            </div>
        )
    } else {
        return <Loader/>
    }

}

export default LibraryPage;
