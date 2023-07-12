import useSWR from "swr";
import {solrFetcher} from "../../../../utils/fetcherFunctions";
import IsadInsightsDates from "../../../catalog/isad/tabs/parts/IsadInsightsDates";
import Loader from "../loader/Loader";

const DateDistribution = ({descriptionLevel, archivalUnitID}) => {
	const { data, error } = useSWR({query: `${descriptionLevel.toLowerCase()}_id:${archivalUnitID}`}, solrFetcher);

	if (data) {
		return (
			<IsadInsightsDates facets={data['facet_counts']['facet_fields']} isOnDrawer={true}/>
		)

	} else {
		return <Loader/>
	}

}

export default DateDistribution;