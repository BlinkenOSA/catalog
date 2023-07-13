import style from "./IsadInsightsTopValues.module.scss"
import {useEffect, useState} from "react";
import isadStatsTabConfig from "../../../config/isadStatsTabConfig";
import IsadInsgightsBadges from "./IsadInsightsBadges";

const IsadInsightsTopValues = ({facets, language='EN', isMobile}) => {
	const [selectedView, setSelectedView] = useState('')
	const [visibleViews, setVisibleViews] = useState([])

	useEffect(() => {
		const facetFields = ['keyword_facet', 'geo_facet', 'subject_facet', 'contributor_facet']
		const visibleFields = []

		facetFields.forEach(field => {
			if (detectVisible(field)) {
				visibleFields.push(field)
			}
		})

		if (visibleFields.length > 0) {
			setSelectedView(visibleFields[0])
		}

		setVisibleViews(visibleFields)
	}, [])

	const renderTabName = (tab) => {
		return isadStatsTabConfig[tab].hasOwnProperty(language) ? isadStatsTabConfig[tab][language] : isadStatsTabConfig[tab]['EN']
	}

	const detectVisible = (facetField) => {
		if (facets.hasOwnProperty(facetField)) {
			if (facets[facetField].length > 2) {
				return true
			}
		}
		return false
	}

	if (visibleViews.length > 0) {
		return (
			<div className={style.InsightsTopValuesWrapper}>
				<div className={style.Title}>Most frequent values from this series</div>
				<div className={isMobile ? `${style.Tabs} ${style.Mobile}` : style.Tabs}>
					{
						visibleViews.includes('keyword_facet') &&
						<div
							onClick={() => setSelectedView('keyword_facet')}
							className={selectedView === 'keyword_facet' ? style.Active : ''}>
							{renderTabName('keyword_facet')}
						</div>
					}
					{
						visibleViews.includes('geo_facet') &&
						<div
							onClick={() => setSelectedView('geo_facet')}
							className={selectedView === 'geo_facet' ? style.Active : ''}>
							{renderTabName('geo_facet')}
						</div>
					}
					{
						visibleViews.includes('subject_facet') &&
						<div
							onClick={() => setSelectedView('subject_facet')}
							className={selectedView === 'subject_facet' ? style.Active : ''}>
							{renderTabName('subject_facet')}
						</div>
					}
					{
						visibleViews.includes('contributor_facet') &&
						<div
							onClick={() => setSelectedView('contributor_facet')}
							className={selectedView === 'contributor_facet' ? style.Active : ''}>
							{renderTabName('contributor_facet')}
						</div>
					}
					<div className={style.TabPlaceholder}> </div>
				</div>
				<IsadInsgightsBadges data={facets[selectedView]} isMobile={isMobile} />
			</div>
		)
	} else {
		return ''
	}

}

export default IsadInsightsTopValues;