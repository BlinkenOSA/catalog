import useSWR from "swr";
import {solrFetcher} from "../../../../../utils/fetcherFunctions";
import Loader from "../../../../pages/parts/loader/Loader";
import DateCreated from "../../../../../config/facetHelpers/DateCreated";

const IsadDates = ({id}) => {
    const { data, error } = useSWR({query: `series_id:${id}`}, solrFetcher)

    if (data) {
        return <DateCreated facetValues={data['facet_counts']['facet_fields']['date_created_facet']} />
    } else {
        return <Loader/>
    }
}

export default IsadDates;
