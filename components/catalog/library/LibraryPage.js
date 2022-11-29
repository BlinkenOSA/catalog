import style from "./LibraryPage.module.scss";
import {getTitle} from "../../../utils/marcFunctions";
import CartButton from "../../cart/CartButton";
import {useCart} from "react-use-cart";
import AvailabilityButton from "../../results/parts/buttons/AvailabilityButton";
import PrimaryTypeButton from "../../pages/parts/buttons/PrimaryTypeButton";
import useSWR from "swr";
import {nextAPIFetcher} from "../../../utils/fetcherFunctions";
import Loader from "../../pages/parts/loader/Loader";
import React from "react";
import LibraryItem from "./LibraryItem";
import {libraryFieldConfig} from "./libraryFieldConfig";
import {filmLibraryFieldConfig} from "./filmLibraryFieldConfig";
import LibraryHoldings from "./desktop/LibraryHoldings";
import LibraryHoldingsMobile from "./mobile/LibraryHoldingsMobile";


const LibraryPage = ({record, type, isMobile}) => {
    const { inCart } = useCart();

    const config = type === 'library' ? libraryFieldConfig : filmLibraryFieldConfig;

    const { id } = record;
    const { data, error } = useSWR(`/api/record/${id}`, nextAPIFetcher)

    if (data) {
        return (
            <div className={style.Page}>
                <div className={isMobile ? `${style.Header} ${style.Mobile}` : style.Header}>
                    <div className={isMobile ? `${style.HeaderData} ${style.Mobile}` : style.HeaderData}>
                        <div className={style.Title}>
                            {getTitle(data)}
                        </div>
                        <div className={style.Buttons}>
                            <CartButton
                                record={record}
                                inCart={inCart(id)}
                                name={id}
                            />
                            <AvailabilityButton record={record} />
                            <PrimaryTypeButton primaryType={record['primary_type']} />
                        </div>
                    </div>
                    <div className={isMobile ? `${style.Thumbnail} ${style.Mobile}` : style.Thumbnail}>
                        <div>
                            <img
                                alt={`Cover`}
                                style={{maxHeight: '300px'}}
                                src={`/api/library/book-cover/${id}`}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {
                        config.map(fc => (
                            <div className={style.MetadataGroup} key={fc['group']}>
                                {
                                    fc['fields'].map((f, index) => (
                                    <LibraryItem
                                        key={index}
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
