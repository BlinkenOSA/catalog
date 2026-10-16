import React, {useState} from "react";
import {useRouter} from "next/router";
import {AiOutlineSearch} from "react-icons/ai";
import {createParams} from "../../../utils/urlParamFunctions";

const HomeSearch = ({className = '', label = 'Search the catalog'}) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (searchValue.trim() !== '') {
            router.push({
                pathname: '/',
                query: createParams(searchValue.trim(), undefined, undefined, {}),
            });
        }
    };

    return (
        <form className={className} onSubmit={handleSubmit} role="search">
            <label htmlFor="front-page-search">{label}</label>
            <div>
                <input
                    id="front-page-search"
                    type="search"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Name, place, organization, subject…"
                />
                <button type="submit" aria-label="Search">
                    <AiOutlineSearch aria-hidden="true" />
                </button>
            </div>
        </form>
    );
};

export default HomeSearch;
