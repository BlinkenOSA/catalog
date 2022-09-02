import useSWRInfinite from 'swr/infinite'
import {solrFetcher} from "../../../../utils/fetcherFunctions";
import Loader from "../../../pages/parts/loader/Loader";
import IsadContentNotFound from "./parts/IsadContentNotFound";
import style from "./IsadContentPage.module.scss";
import CartButton from "../../../cart/CartButton";
import {useCart} from "react-use-cart";
import React, {useEffect, useState} from "react";
import AvailabilityButton from "../../../results/parts/buttons/AvailabilityButton";
import parse from "html-react-parser";
import PrimaryTypeButton from "../../../pages/parts/buttons/PrimaryTypeButton";

const IsadContentPage = ({seriesID, language}) => {
    const { inCart } = useCart();
    const PER_PAGE = 50;

    const getKey = (index) => {
        return {
            query: `series_id:${seriesID}`,
            offset: index * PER_PAGE,
            limit: PER_PAGE,
            sort: 'fonds_sort asc, subfonds_sort asc, series_sort asc, container_number_sort asc, folder_number_sort asc'
        }
    }

    const { data, size, setSize } = useSWRInfinite(getKey, solrFetcher, {initialSize: 1})
    const isEmpty = data?.[0]?.['response']['docs'].length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.['response']['docs'].length < PER_PAGE);

    const renderData = (rec, lang='EN') => {
        const getContentFromJson = (key, lang, array=false) => {
            const data = JSON.parse(rec['item_json'])
            let data_json;

            if (lang !== 'EN') {
                if (data.hasOwnProperty('item_json_2nd')) {
                    data_json = data['item_json_2nd']
                } else {
                    data_json = data['item_json_eng']
                }
            } else {
                data_json = data['item_json_eng']
            }

            return data_json.hasOwnProperty(key) ? array ? data_json[key].join(', ') : data_json[key] : '';
        }

        const getTitle = () => {
            if (lang === 'EN') {
                return rec['title']
            } else {
                return rec['title_original'] ? rec['title_original'] : rec['title']
            }
        }

        const getInfo = () => {
            let parts = [];

            let dates = []
            const datesArray = getContentFromJson('dates', 'EN')
            datesArray !== '' && datesArray.forEach(d => dates.push(`${d['dateType']}: ${d['date']}`))
            dates.length > 0 && parts.push(dates.join(', '))

            const language = getContentFromJson('language', 'EN', true);
            language.length > 0 && parts.push(`${language} language`)

            const duration = getContentFromJson('duration', 'EN');
            duration.length > 0 && parts.push(`${duration}`)

            return parts.join(', ')
        }

        const getNotes = () => {
            const notes = getContentFromJson('note', lang);
            return notes.length > 0 ? `[${notes}]` : ''
        }

        return (
            <div>
                <a href={`/catalog/${rec['id']}`}>
                    <div className={style.Title}>
                        {getTitle()}
                        {rec['date_created'] && `, ${rec['date_created']}`}
                    </div>
                </a>
                <div className={style.Description}>
                    { parse(getContentFromJson('contentsSummary', lang)) }
                </div>
                <div className={style.Info}>
                    <div>{getInfo()}</div>
                    <div>{getNotes()}</div>
                </div>
                <div className={style.Buttons}>
                    <PrimaryTypeButton primaryType={rec['primary_type']} />
                    <AvailabilityButton record={rec} />
                </div>
            </div>
        )
    }

    const renderDocs = (records) => {
        const isBoxRow = (rec, index) => {
            return index === 0 || (index > 0 && rec['container_number'] !== records[index - 1]['container_number']);
        }

        const displayContainer = (rec, index) => {
            const containerNumber = `${rec['container_type']} #${rec['container_number']}`

            if (isBoxRow(rec, index)) {
                return (
                    <div className={style.ContainerType}>
                        <span>{containerNumber}</span>
                    </div>
                )
            } else {
                return <span style={{width: '150px'}} />
            }
        }

        return records.map((rec, index) => {
            return (
                <div className={isBoxRow(rec, index) ? style.Record : `${style.Record} ${style.InContainer}`} key={index}>
                    <div className={style.CartButton}>
                        <CartButton record={rec} inCart={inCart(rec['id'])} name={rec['id']} />
                    </div>
                    <a href={`/catalog/${rec['id']}`}>
                        <div className={style.CallNumber}>
                            {rec['call_number'][0]}
                        </div>
                    </a>
                    <div className={style.Data}>
                        {renderData(rec, language)}
                    </div>
                    {displayContainer(rec, index)}
                </div>
            )
        })
    }

    if (data) {
        return (
            <React.Fragment>
                <div className={style.RecordsWrapper}>
                    {
                        data.map((response, index) => {
                            return renderDocs(response['response']['docs'])
                        })
                    }

                </div>
                {
                    !isReachingEnd &&
                    <div className={style.MoreButtonWrapper}>
                        <div
                            className={style.MoreButton}
                            onClick={() => setSize(size + 1)}>
                            Load More ...
                        </div>
                    </div>
                }
            </React.Fragment>
        )
    } else {
        return <Loader/>
    }
}

export default IsadContentPage;
