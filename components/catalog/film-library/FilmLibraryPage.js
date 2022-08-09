import style from "./FilmLibraryPage.module.scss";
import {getTitle} from "../../../utils/marcFunctions";
import CartButton from "../../cart/CartButton";
import {useCart} from "react-use-cart";
import AvailabilityButton from "../../results/parts/buttons/AvailabilityButton";
import PrimaryTypeButton from "../../pages/parts/buttons/PrimaryTypeButton";
import useSWR from "swr";
import {nextAPIFetcher} from "../../../utils/fetcherFunctions";
import Loader from "../../pages/parts/loader/Loader";
import React from "react";
import LibraryItem from "../library/LibraryItem";
import {filmLibraryFieldConfig} from "./filmLibraryFieldConfig";
import LibraryHoldings from "../library/LibraryHoldings";


const FilmLibraryPage = ({record}) => {
    const { inCart } = useCart();

    const { id } = record;
    const { data, error } = useSWR(`/api/record/${id}`, nextAPIFetcher)

    if (data) {
        return (
            <div className={style.Page}>
                <div className={style.Header}>
                    <div className={style.HeaderData}>
                        <div className={style.Title}>
                            {getTitle(data)}
                        </div>
                        <div className={style.Buttons}>
                            <CartButton
                                record={record}
                                inCart={inCart(id)}
                                name={id}
                            />
                            <PrimaryTypeButton origin={record['record_origin']} primaryType={record['primary_type']} />
                            <AvailabilityButton record={record} />
                        </div>
                    </div>
                    <div className={style.Thumbnail}>
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
                        filmLibraryFieldConfig.map(fc => (
                            <div className={style.MetadataGroup} key={fc['group']}>
                                {
                                    fc['fields'].map(f => (
                                    <LibraryItem
                                        key={f['label']}
                                        record={data}
                                        group={fc['group']}
                                        label={f['label']}
                                        links={f['links']}
                                        fieldConfig={f['fieldConfig']}
                                        display={f.hasOwnProperty('display') ? f['display'] : 'sameRow'}
                                    />
                                ))}
                            </div>
                        ))
                    }
                </div>
                <div>
                    <LibraryHoldings
                        record={data}
                    />
                </div>
            </div>
        )
    } else {
        return <Loader/>
    }

}

export default FilmLibraryPage;
