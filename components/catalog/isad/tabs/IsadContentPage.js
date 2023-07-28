import useSWRInfinite from 'swr/infinite'
import {solrFetcher} from "../../../../utils/fetcherFunctions";
import Loader from "../../../pages/parts/loader/Loader";
import style from "./IsadContentPage.module.scss";
import CartButton from "../../../cart/CartButton";
import {useCart} from "react-use-cart";
import React, {useState} from "react";
import AvailabilityButton from "../../../results/parts/buttons/AvailabilityButton";
import PrimaryTypeButton from "../../../pages/parts/buttons/PrimaryTypeButton";
import IsadSearchBar from "./parts/IsadSearchBar";
import IsadFilter from "./parts/IsadFilter";
import {useRouter} from "next/router";
import IsadThumbnail from "./parts/IsadThumbnail";
import {Collapse} from 'react-collapse';
import parse from "html-react-parser";
import filterPlaceholders from "./config/filterPlaceholders";

const IsadContentPage = ({seriesID, language, isMobile}) => {
	const { inCart } = useCart();

	const [filterOpen, setFilterOpen] = useState(false);

	const router = useRouter();
	const {id, seriesQuery, ...selectedSeriesFacets} = router.query;

	const PER_PAGE = 50;

	const getKey = (index) => {
		return {
			solrCore: 'folders-items',
			query: seriesQuery,
			filterQuery: `series_id:${seriesID}`,
			offset: index * PER_PAGE,
			limit: PER_PAGE,
			...selectedSeriesFacets
		}
	}

	const { data, size, setSize } = useSWRInfinite(getKey, solrFetcher, {initialSize: 1})
	const isEmpty = data?.[0]?.['response']['docs'].length === 0;
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.['response']['docs'].length < PER_PAGE);
	const numFound = data?.[0]?.['response']['numFound']
	const facets = data?.[0]?.['facet_counts']['facet_fields']
	const highlights = data?.[0]?.['highlighting']

	const renderData = (rec, lang='EN') => {
		const getHighlightedField = (field) => {
			if (lang === 'EN') {
				if (highlights && highlights.hasOwnProperty(rec['id'])) {
					const elementHighlight = highlights[rec['id']];
					if (elementHighlight.hasOwnProperty(`${field}_search_en`)) {
						return parse(elementHighlight[`${field}_search_en`].join())
					}
					if (elementHighlight.hasOwnProperty(`${field}_search_general`)) {
						return parse(elementHighlight[`${field}_search_general`].join())
					}
				}
				return rec[field] ? parse(rec[field]) : rec[field]
			} else {
				if (highlights && highlights.hasOwnProperty(rec['id'])) {
					const elementHighlight = highlights[rec['id']];
					if (elementHighlight.hasOwnProperty(`${field}_search_${lang.toLowerCase()}`)) {
						return parse(elementHighlight[`${field}_search_${lang.toLowerCase()}`].join())
					}
					if (elementHighlight.hasOwnProperty(`${field}_search_general`)) {
						return parse(elementHighlight[`${field}_search_general`].join())
					}
					if (elementHighlight.hasOwnProperty(`${field}_search_en`)) {
						return parse(elementHighlight[`${field}_search_en`].join())
					}
				}
				return rec[`${field}_original`] ? parse(rec[`${field}_original`]) : parse(rec[field])
			}
		}

		const getNotes = () => {
			if (lang === 'EN') {
				return rec['note']
			} else {
				return rec['note_original'] ? rec['note_original'] : rec['note']
			}
		}

		return (
			<div>
				<a href={`/catalog/${rec['id']}`}>
					<div className={style.Title}>
						{getHighlightedField('title')}
						{rec['date_created'] && `, ${rec['date_created']}`}
					</div>
				</a>
				<div className={style.Description}>
					{ getHighlightedField('contents_summary') }
				</div>
				<div className={style.Info}>
					{ rec['info'] }
					{ getNotes() }
				</div>
				<div className={style.Buttons}>
					{isMobile && <CartButton record={rec} inCart={inCart(rec['id'])} name={rec['id']} />}
					<PrimaryTypeButton primaryType={rec['primary_type']} />
					<AvailabilityButton record={rec} />
				</div>
			</div>
		)
	}

	const onFilter = (filter, value) => {
		if (value !== '') {
			router.replace({
				query: {...router.query, [filter]: value}
			}, undefined, {shallow: true})
		} else {
			delete router.query[filter]
			router.replace({
				query: {...router.query}
			}, undefined, {shallow: true})
		}
	}

	const renderDocs = (records) => {
		const isBoxRow = (rec, index) => {
			return index === 0 || (index > 0 && rec['container_number_sort'] !== records[index - 1]['container_number_sort']);
		}

		const displayContainer = (rec, index) => {
			const containerNumber = `${rec['container_type']} #${rec['container_number_sort']}`

			if (isBoxRow(rec, index)) {
				return (
					<div className={style.ContainerType}>
						<span>{containerNumber}</span>
					</div>
				)
			} else {
				return <span style={{width: '150px'}} />
			}
		}

		const renderThumbnail = (rec) => {
			if (rec['digital_version_online']) {
				return <IsadThumbnail record={rec} />
			} else {
				return ''
			}
		}

		return records.map((rec, index) => {
			if (isMobile) {
				return (
					<div className={isBoxRow(rec, index) ? `${style.Record} ${style.Mobile}` : `${style.Record} ${style.InContainer} ${style.Mobile}`} key={index}>
						<a href={`/catalog/${rec['id']}`}>
							<div className={style.CallNumber}>
								{rec['call_number']}
							</div>
						</a>
						<div className={style.Data}>
							{renderData(rec, language)}
						</div>
						{displayContainer(rec, index)}
					</div>
				)
			} else {
				return (
					<div className={isBoxRow(rec, index) ? style.Record : `${style.Record} ${style.InContainer}`} key={index}>
						<div className={style.CartButton}>
							<CartButton record={rec} inCart={inCart(rec['id'])} name={rec['id']} />
						</div>
						<a href={`/catalog/${rec['id']}`}>
							<div className={style.CallNumber}>
								{renderThumbnail(rec)}
								{rec['call_number']}
							</div>
						</a>
						<div className={style.Data}>
							{renderData(rec, language)}
						</div>
						{displayContainer(rec, index)}
					</div>
				)
			}
		})
	}

	const renderMenu = () => {
		const renderFilters = () => (
			<React.Fragment>
				<IsadFilter
					facetName={'year_created'}
					onSelect={onFilter}
					facets={facets}
					placeholder={filterPlaceholders['year_created'][language]}
					value={selectedSeriesFacets.hasOwnProperty('year_created') ? selectedSeriesFacets['year_created'] : undefined}
					isMobile={isMobile}
				/>
				<IsadFilter
					facetName={'subject'}
					onSelect={onFilter}
					facets={facets}
					placeholder={filterPlaceholders['subject'][language]}
					value={selectedSeriesFacets.hasOwnProperty('subject') ? selectedSeriesFacets['subject'] : undefined}
					isMobile={isMobile}
				/>
				<IsadFilter
					facetName={'geo'}
					onSelect={onFilter}
					facets={facets}
					placeholder={filterPlaceholders['geo'][language]}
					value={selectedSeriesFacets.hasOwnProperty('geo') ? selectedSeriesFacets['geo'] : undefined}
					isMobile={isMobile}
				/>
			</React.Fragment>
		)

		if (isMobile) {
			return (
				<div className={`${style.SeriesSearch} ${style.Mobile}`}>
					<IsadSearchBar
						placeholder={filterPlaceholders['search'][language]}
						seriesQuery={seriesQuery}
						onSearch={(value) => onFilter('seriesQuery', value)}
						onFilter={() => setFilterOpen(!filterOpen)}
						isMobile={true}
						filterOpen={filterOpen}
					/>
					<Collapse isOpened={filterOpen}>
						{renderFilters()}
					</Collapse>
				</div>
			)
		} else {
			return (
				<div className={style.SeriesSearch}>
					<IsadSearchBar
						placeholder={filterPlaceholders['search'][language]}
						seriesQuery={seriesQuery}
						onSearch={(value) => onFilter('seriesQuery', value)}
					/>
					{renderFilters()}
				</div>
			)
		}
	}

	if (data) {
		return (
			<React.Fragment>
				{
					(numFound > 10 || seriesQuery !== '' || Object.keys(selectedSeriesFacets).length > 0) && renderMenu()
				}
				<div className={style.RecordsWrapper}>
					{
						data.map((response, index) => {
							return renderDocs(response['response']['docs'])
						})
					}
				</div>
				{
					!isReachingEnd &&
					<div className={style.MoreButtonWrapper}>
						<div
							className={style.MoreButton}
							onClick={() => setSize(size + 1)}>
							Load More ...
						</div>
					</div>
				}
			</React.Fragment>
		)
	} else {
		return <Loader/>
	}
}

export default IsadContentPage;
