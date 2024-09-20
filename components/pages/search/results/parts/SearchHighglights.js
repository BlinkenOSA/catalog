import React from 'react';
import style from './SearchHighlights.module.scss';
import parse from "html-react-parser";

const SearchHighglights = ({result}) => {
  const {_formatted} = result;

  const getLocale = () => {
    switch(result['original_locale']) {
      case 'EN':
        return 'English';
      case 'HU':
        return 'Hungarian';
      case 'RU':
        return 'Russian';
      case 'PL':
        return 'Polish';
      default:
        return 'Original';
    }
  }

  const FIELDS = {
    'title_original': `Title (${getLocale()})`,
    'contents_summary': 'Contents Summary',
    'contents_summary_original': `Contents Summary (${getLocale()})`,
    'geo_search': 'Geographic Location',
    'subject_search': 'Subject',
    'contributor_search': 'Contributor',
    'keyword_search': 'Keyword'
  }

  const renderValue = (key, value) => {
    if (key.includes('contents_summary')) {
      return <div style={{paddingLeft: "20px"}}>...{parse(value)}...</div>
    } else {
      return <div style={{paddingLeft: "20px"}}>{parse(value)}</div>
    }
  }

  return (
      <div className={style.HighlightsWrapper}>
        {
          Object.keys(FIELDS).map((field) => {
            if (_formatted.hasOwnProperty(field)) {
              if (_formatted[field].includes('<em>')) {
                return (
                    <div key={field} className={style.HighlightsValueWrapper}>
                      <div className={style.Label}>{FIELDS[field]}:</div>
                      <div className={style.Value}>{renderValue(field, _formatted[field])}</div>
                    </div>
                )
              }
            }
          })
        }
      </div>
  )
}

export default SearchHighglights;