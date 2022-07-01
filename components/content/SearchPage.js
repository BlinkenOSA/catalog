import React from "react";
import style from "./SearchPage.module.scss";
import FacetMenu from "../facets/FacetMenu";
import useSWR from "swr";
import {fetcher} from "../../utils/fetcher";
import Loader from "./parts/loader/Loader";
import ResultItem from "../results/ResultItem";
import {useRouter} from "next/router";
import {useSessionStorage} from "react-use";

/**
 * Page responsible for displaying the search results
 *
 * @param {Object} params
 * @param {func} params.onSelectFacetGroup Handling of selecting a particular group.
 */
const SearchPage = ({data, onSelectFacetGroup}) => {
    const router = useRouter();
    const {limit, offset} = router.query;

    const [cart, setCart] = useSessionStorage('cart', []);

    const handleCartAction = (id, checked) => {
        if (checked) {
            setCart(oldCart => [...oldCart, id])
        } else {
            setCart(oldCart => [...oldCart.filter(item => item === id)])
        }
    }

    const renderResults = () => {
        const results = data['response']['docs']
        return results.map((result, index) => (
            <ResultItem
                inCart={cart.indexOf(result['id']) > 0}
                onCartAction={handleCartAction}
                result={result}
                limit={limit ? Number(limit) : 10}
                offset={offset ? Number(offset) : 0}
                index={index}
            />
        ))
    }

    return (
        <div className={style.ContentSearch}>
            <FacetMenu
                onSelectFacetGroup={onSelectFacetGroup}
            />
            <div className={style.Content}>
                {data ? renderResults() : <Loader/>}
            </div>
        </div>
    )
}

export default SearchPage;
