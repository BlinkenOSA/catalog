import React from 'react';
import style from './SearchHighlights.module.scss';
import parse from "html-react-parser";

const SearchHighglights = ({result, highlights}) => {
  const FIELDS = {
    'title_search_en': 'Title',
    'title_search_hu': 'Title (Hungarian)',
    'title_search_ru': 'Title (Russian)',
    'title_search_pl': 'Title (Polish)',
    'title_search_general': 'Original Title',
    'contents_summary_search_en': 'Contents Summary',
    'contents_summary_search_hu': 'Contents Summary (Hungarian)',
    'contents_summary_search_ru': 'Contents Summary (Russian)',
    'contents_summary_search_pl': 'Contents Summary (Polish)',
    'contents_summary_search_general': 'Contents Summary (Original)',
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

  if (highlights && highlights.hasOwnProperty(result['id'])) {
    const highlightsObject = {...highlights[result['id']]};
    delete(highlightsObject['title_search_en'])

    if (Object.keys(highlightsObject).length > 0) {
      return (
        <div className={style.HighlightsWrapper}>
          {
            Object.keys(highlightsObject).map(key => {
              return (
                <div key={key} className={style.HighlightsValueWrapper}>
                  <div className={style.Label}>{FIELDS.hasOwnProperty(key) ? FIELDS[key] : 'label'}:</div>
                  <div className={style.Value}>{renderValue(key, highlightsObject[key].join())}</div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  return ''
}

export default SearchHighglights;