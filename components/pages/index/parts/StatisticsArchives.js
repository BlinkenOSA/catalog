import style from "./Statistics.module.scss";
import React from "react";
import Loader from "../../../layout/Loader";
import dayjs from 'dayjs';

const StatisticsArchives = ({data}) => {
  const renderTitle = (referenceCode, title) => {
    return title.replace(referenceCode, '').trim()
  }

  const renderDate = (date) => {
    return dayjs(date).format('YYYY/MM/DD')
  }

  const renderArchivalUnit = (unit) => {
    return (
      <React.Fragment>
        <div key={unit['reference_code']} className={style.ScrollItem}>
          <span className={style.ScrollItemDivider}>+++ New collections +++</span>
          <a href={`/catalog/${unit['id']}`}>
            <span className={style.ReferenceCode}>{unit['reference_code']}</span>
            <span className={style.Title}>{renderTitle(unit['reference_code'], unit['title'])}</span>
          </a>
        </div>
      </React.Fragment>
    )
  }

  return (
    data ?
    <React.Fragment>
      <div className={style.StatisticsWrapper}>
        <div className={style.StatisticsMove}>
          {data.map(
            d => renderArchivalUnit(d)
          )}
        </div>
      </div>
    </React.Fragment>: <Loader/>
  )
}

export default StatisticsArchives;