import {solrFetcher} from "../../../../utils/fetcherFunctions";
import useSWR from "swr";
import Loader from "../../../pages/parts/loader/Loader";
import style from "./InsightsPage.module.scss";
import IsadInsightsDates from "./parts/IsadInsightsDates";

const InsightsPage = ({archivalUnitID, descriptionLevel, language, isMobile}) => {
	const { data, error } = useSWR({query: `${descriptionLevel.toLowerCase()}_id:${archivalUnitID}`}, solrFetcher);

	const renderParts = () => {
		const facets = data['facet_counts']['facet_fields']

		return (
			<div className={style.InsightsWrapper}>
				<IsadInsightsDates facets={facets} />
			</div>
		)
	}

	return (
		data ? renderParts() : <Loader/>
	)


}

export default InsightsPage;