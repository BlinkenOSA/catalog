import React from "react";
import useSWR from "swr";
import {fetcher} from "../../../../../utils/fetcherFunctions";
import Loader from "../../../../pages/parts/loader/Loader";
import { FaWikipediaW } from "react-icons/fa";
import dayjs from "dayjs";
import Image from 'next/image'
import dynamic from "next/dynamic";
import style from "./FindingAidsItemWikiInfo.module.scss";

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const MapWithNoSSR = dynamic(() => import('../../../../facets/facetHelpers/parts/Map'), {
  ssr: false,
});

/**
 * Description of the Record Origin facet.
 *
 * @param {Object} params
 * @param {string} params.wikidata_id Wikidata_id
 * @param {string} params.type Type of the wiki facet
 */
const FindingAidsItemWikiInfo = ({wikidata_id, value, type}) => {
  const {data, isLoading} = useSWR(wikidata_id && wikidata_id.length > 0 ? `wikidata/${wikidata_id}/` : undefined, fetcher)

  const getCountry = () => {
    if (data['properties'].hasOwnProperty('country')) {
      if (data['properties']['country'] !== data['title']) {
        return <p>Country: {data['properties']['country']}</p>
      }
    }
    return ''
  }

  const getWikipedia = () => {
    if (data.hasOwnProperty('wikipedia')) {
      return (
        <a href={data['wikipedia']} target={'_blank'}>
          <div className={style.Button}>
            <FaWikipediaW />
            <span className={style.Text}>Wikipedia</span>
          </div>
        </a>
      )
    }
  }

  const getBirthData = (type) => {
    const formatDate = (date) => {
      return dayjs(date, '+YYYY-MM-DDTHH:mm:ssZ').format('YYYY/MM/DD')
    }

    const properties = data['properties']
    if (properties.hasOwnProperty(`date_of_${type}`) || properties.hasOwnProperty(`place_of_${type}`)) {
      return <p>
        {type === 'birth' ? 'Born: ' : 'Died: '}
        {properties.hasOwnProperty(`date_of_${type}`) && formatDate(properties[`date_of_${type}`])}
        {properties.hasOwnProperty(`place_of_${type}`) && `, ${properties[`place_of_${type}`]}`}
      </p>
    }
  }

  const getListData = (field, label) => {
    const properties = data['properties']
    if (properties.hasOwnProperty(field)) {
      return <p>
        {label}: {properties[field].join(', ')}
      </p>
    }
  }

  const getImage = () => {
    const properties = data['properties']
    if (properties.hasOwnProperty('image')) {
      return (
        <Image
          src={properties['image']}
          width={500}
          height={200}
          objectFit={'contain'}
        />
      )
    }
  }

  const getMap = () => {
    const coordinates = data['properties']['coordinates'];

    if (data['properties'].hasOwnProperty('geojson')) {
      const geoJSONData = data['properties']['geojson']['data']['features']
      return coordinates &&
        <MapWithNoSSR
          mapStyle={{marginTop: 0}}
          lat={coordinates['lat']}
          long={coordinates['long']}
          zoom={data['properties']['geojson']['zoom'] + 2}
          geoJSON={true}
          geoJSONData={geoJSONData}
        />
    } else {
      return coordinates && <MapWithNoSSR lat={coordinates['lat']} long={coordinates['long']} mapStyle={{marginTop: 0}} />
    }
  }

  const renderFacetInfo = () => {
    switch (type) {
      case 'geo':
        return (
          <div className={style.InfoSheet}>
            <div className={style.Map}>
              {getMap()}
            </div>
            <div className={style.Data}>
              <h2>{data['title']}</h2>
              <p>{data['description']}</p>
              {getCountry()}
              <div className={style.DataSource}>Data source: Wikidata</div>
              {getWikipedia()}
            </div>
          </div>
        )
      case 'subject':
      case 'contributor':
        return (
          <React.Fragment>
            <div className={style.InfoSheet}>
              <div className={style.Image}>
                {getImage()}
              </div>
              <div className={style.Data}>
                <h2>{data['title']}</h2>
                <p className={style.Description}>{data['description']}</p>
                {getBirthData('birth')}
                {getBirthData('death')}
                {getListData('occupation', 'Occupation')}
                {getListData('notable_work', 'Notable Works')}
                <div className={style.DataSource}>Data source: Wikidata</div>
                {getWikipedia()}
              </div>
            </div>
          </React.Fragment>
        )
    }
  }

  const detectInfoRender = () => {
    if (data) {
      return renderFacetInfo()
    } else {
      return ''
    }
  }

  return (
    <div className={style.InfoWrapper}>
      {data ? detectInfoRender() : <Loader height={'200px'} />}
    </div>
  )
}

export default FindingAidsItemWikiInfo
