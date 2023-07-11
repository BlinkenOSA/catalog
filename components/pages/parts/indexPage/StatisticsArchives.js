import useSWR from "swr";
import {fetcher} from "../../../../utils/fetcherFunctions";
import style from "./Statistics.module.scss";
import React from "react";
import Loader from "../loader/Loader";
import dayjs from 'dayjs';

const StatisticsArchives = () => {
  const { data, error } = useSWR(`newly-added-content/isad`, fetcher)

  const renderTitle = (referenceCode, title) => {
    return title.replace(referenceCode, '').trim()
  }

  const renderDate = (date) => {
    return dayjs(date).format('YYYY/MM/DD')
  }

  const renderArchivalUnit = (unit) => {
    return (
      <div className={style.UnitRow}>
        <a href={`/catalog/${unit['id']}`}>
          <div className={style.Unit}>
            <div className={style.ReferenceCode}>{unit['reference_code']}</div>
            <div>{renderTitle(unit['reference_code'], unit['title'])}</div>
            <div className={style.Date}>Published on: {renderDate(unit['date_published'])}</div>
          </div>
        </a>
      </div>
    )
  }

  return (
    data ?
    <div className={style.StatisticsWrapper}>
      <h1>Newly added collection descriptions</h1>
      <div className={style.Units}>
        {data.map(unit => (
            renderArchivalUnit(unit)
        ))}
      </div>
    </div> : <Loader/>
  )
}

export default StatisticsArchives;