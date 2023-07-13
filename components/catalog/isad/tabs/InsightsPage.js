import {solrFetcher} from "../../../../utils/fetcherFunctions";
import useSWR from "swr";
import Loader from "../../../pages/parts/loader/Loader";
import style from "./InsightsPage.module.scss";
import IsadInsightsDates from "./parts/insights/IsadInsightsDates";
import IsadInsightsTopValues from "./parts/insights/IsadInsightsTopValues";
import IsadInsightsDistribution from "./parts/insights/IsadInsightsDistribution";

const InsightsPage = ({archivalUnitID, descriptionLevel, language, isMobile}) => {
	const { data, error } = useSWR({
		query: `${descriptionLevel.toLowerCase()}_id:${archivalUnitID}`,
		solrCore: 'stats'
	}, solrFetcher);

	const renderParts = () => {
		const facets = data['facet_counts']['facet_fields']

		return (
			<div className={style.InsightsWrapper}>
				<IsadInsightsDates facets={facets} isMobile={isMobile} />
				<IsadInsightsDistribution facets={facets} isMobile={isMobile} />
				<IsadInsightsTopValues facets={facets} isMobile={isMobile} />
			</div>
		)
	}

	return (
		data ? renderParts() : <Loader/>
	)


}

export default InsightsPage;