import Loader from "../../../pages/parts/loader/Loader";
import style from "./InsightsPage.module.scss";
import IsadInsightsDates from "./parts/insights/IsadInsightsDates";
import IsadInsightsTopValues from "./parts/insights/IsadInsightsTopValues";
import IsadInsightsDistribution from "./parts/insights/IsadInsightsDistribution";
import React from "react"

const InsightsPage = ({data, isMobile}) => {
	const renderParts = () => {
		const facets = data['facet_counts']['facet_fields']

		return (
			<React.Fragment>
				<div className={style.InsightsWrapper}>
					<IsadInsightsDates facets={facets} isMobile={isMobile} />
					<IsadInsightsDistribution facets={facets} isMobile={isMobile} />
				</div>
				<IsadInsightsTopValues facets={facets} isMobile={isMobile} />
			</React.Fragment>
		)
	}

	return (
		data ? renderParts() : <Loader/>
	)
}

export default InsightsPage;