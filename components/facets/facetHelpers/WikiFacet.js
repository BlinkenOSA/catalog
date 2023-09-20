import React from "react";
import useSWR from "swr";
import {fetcher} from "../../../utils/fetcherFunctions";
import Loader from "../../pages/parts/loader/Loader";
import style from "./FacetHelper.module.scss";
import { FaWikipediaW, FaMapMarkerAlt } from "react-icons/fa";
import dayjs from "dayjs";
import Image from 'next/image'
import dynamic from "next/dynamic";

const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const MapWithNoSSR = dynamic(() => import('./parts/Map'), {
  ssr: false,
});

/**
 * Description of the Record Origin facet.
 *
 * @param {Object} params
 * @param {Object} params.selectedFacetObject Selected facet object
 * @param {string} params.type Type of the wiki facet
 */
const WikiFacet = ({selectedFacetObject, type}) => {
    const {data, error, isLoading} = useSWR(selectedFacetObject['wiki_id'] && selectedFacetObject['wiki_id'].length > 0 ? `wikidata/${selectedFacetObject['wiki_id']}/` : undefined, fetcher)

    const renderFacetGroup = () => {
      switch (type) {
        case 'geo':
          return (
            <React.Fragment>
              <h2>Geographic Location</h2>
              <p>
                The spatial coverage of a record. It can be a country, a city or any other geographical location.
              </p>
            </React.Fragment>
          )
        case 'keyword':
          return (
            <React.Fragment>
              <h2>Keyword & Terms</h2>
              <p>
                Topical terms and keywords assigned to the records.
              </p>
            </React.Fragment>
          )
        case 'subject':
          return (
            <React.Fragment>
              <h2>Subject</h2>
              <p>
                A person, corporation / institution or a term is being discussed, described, or dealt with in a described archival holding.
              </p>
            </React.Fragment>
          )
        case 'contributor':
          return (
            <React.Fragment>
              <h2>Contributor</h2>
              <p>
                A person, corporation / institution who took part in creating the archival holding. Authors, crew members, publishers, producers.
              </p>
            </React.Fragment>
          )
      }
    }

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
          <div className={style.ImageWrapper}>
            <Image
              src={properties['image']}
              layout={'fill'}
              objectFit={"contain"}
            />
          </div>
        )
      }
    }

    const getMap = () => {
      const coordinates = data['properties']['coordinates'];

      if(data['properties'].hasOwnProperty('geojson')) {
        const geoJSONData = data['properties']['geojson']['data']['features']
        return coordinates &&
          <MapWithNoSSR
            lat={coordinates['lat']}
            long={coordinates['long']}
            zoom={data['properties']['geojson']['zoom'] + 2}
            geoJSON={true}
            geoJSONData={geoJSONData}
          />
      } else {
        return coordinates && <MapWithNoSSR lat={coordinates['lat']} long={coordinates['long']} />
      }
    }

    const renderFacetInfo = () => {
      switch (type) {
        case 'geo':
          return (
            <React.Fragment>
              <h2>{data['title']}</h2>
              <p>{data['description']}</p>
              {getCountry()}
              <div className={style.Buttons}>
                {getWikipedia()}
              </div>
              <div className={style.DataSource}>Data source: Wikidata</div>
              {getMap()}
            </React.Fragment>
          )
        case 'subject':
        case 'contributor':
          return (
            <React.Fragment>
              {getImage()}
              <h2>{data['title']}</h2>
              <p className={style.Description}>{data['description']}</p>
              {getBirthData('birth')}
              {getBirthData('death')}
              {getListData('occupation', 'Occupation')}
              {getListData('notable_work', 'Notable Works')}
              <div className={style.DataSource}>Data source: Wikidata</div>
              {getWikipedia()}
            </React.Fragment>
          )
      }
    }

    const detectInfoRender = () => {
      if (data) {
        return renderFacetInfo()
      } else {
        if (selectedFacetObject !== '' && selectedFacetObject['wiki_id'] !== '') {
          return <Loader height={'50px'} color={'#FFFFFF'}/>
        }
      }
    }

    return (
        <div className={style.FacetHelperText}>
            <div className={style.FacetGroup}>
              {renderFacetGroup()}
            </div>
            <div className={style.FacetExplanation}>
              {detectInfoRender()}
            </div>
        </div>
    )
}

export default WikiFacet
