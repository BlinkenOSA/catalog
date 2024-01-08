import useSWRInfinite from 'swr/infinite'
import {catalogAPIFetcher, solrFetcher} from "../../../../../utils/fetcherFunctions";
import Loader from "../../../../layout/Loader";
import style from "./IsadContentPage.module.scss";
import CartButton from "../../../../cart/CartButton";
import {useCart} from "react-use-cart";
import React, {useState} from "react";
import AvailabilityButton from "../../../search/results/parts/buttons/AvailabilityButton";
import PrimaryTypeButton from "../../../search/parts/PrimaryTypeButton";
import IsadSearchBar from "./parts/IsadSearchBar";
import IsadFilter from "./parts/IsadFilter";
import {useRouter} from "next/router";
import IsadThumbnail from "./parts/IsadThumbnail";
import {Collapse} from 'react-collapse';
import parse from "html-react-parser";
import filterPlaceholders from "./config/filterPlaceholders";
import AccessRightsButton from "../../../search/parts/AccessRightsButton";
import useSWR from "swr";
import IsadPagination from "./parts/IsadPagination";

const IsadContentPage = ({seriesID, language, containerCount, folderItemCount, originalLocale, isMobile}) => {
	const { inCart } = useCart();

	const [filterOpen, setFilterOpen] = useState(!isMobile);

	const router = useRouter();
	const {id, seriesQuery, start, size, view, ...selectedSeriesFacets} = router.query;

	const getParams = () => {
		return {
			query: seriesQuery,
			filterQuery: `series_id:${seriesID}`,
			start: start,
			size: size,
			view: view,
			...selectedSeriesFacets
		}
	}

	const {data, isLoading} = useSWR([`folders-items/${seriesID}`, getParams()], ([url, params]) => catalogAPIFetcher(url, params))

	const numFound = data?.['response']['numFound']
	const facets = data ? data['facet_counts']['facet_fields'] : {}
	const highlights = data?.['highlighting']

	const renderData = (rec, lang='EN') => {
		const getHighlightedField = (field, lng = lang) => {
			if (lng === 'EN') {
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
					if (elementHighlight.hasOwnProperty(`${field}_search_${lng.toLowerCase()}`)) {
						return parse(elementHighlight[`${field}_search_${lng.toLowerCase()}`].join())
					}
					if (elementHighlight.hasOwnProperty(`${field}_search_general`)) {
						return parse(elementHighlight[`${field}_search_general`].join())
					}
					if (elementHighlight.hasOwnProperty(`${field}_search_en`)) {
						return parse(elementHighlight[`${field}_search_en`].join())
					}
				}
				if (rec[`${field}_original`]) {
					return parse(rec[`${field}_original`])
				} else {
					return rec[field] ? parse(rec[field]) : rec[field]
				}
			}
		}

		const getNotes = () => {
			if (lang === 'EN') {
				return rec['note']
			} else {
				return rec['note_original'] ? rec['note_original'] : rec['note']
			}
		}

		const detectSecondLanguage = () => {
			return originalLocale !== null && rec['title_original']  && rec['contents_summary_original']
		}

		if (isMobile) {
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
						{isMobile && !rec['digital_version_online'] && <CartButton record={rec} inCart={inCart(rec['id'])} name={rec['id']} />}
						<AvailabilityButton record={rec} />
						<AccessRightsButton record={rec} />
						<div className={style.Divider} />
						<PrimaryTypeButton primaryType={rec['primary_type']} />
					</div>
				</div>
			)
		} else {
			return (
				<div>
					<div className={style.TitleAndDescriptionWrapper}>
						<div style={{flex: 1}}>
							<a href={`/catalog/${rec['id']}`}>
								<div className={style.Title}>
									{getHighlightedField('title', 'EN')}
									{
										!detectSecondLanguage() && rec['title_original'] &&
										(
											originalLocale === 'RU' ?
											<span className={style.Russian}> ({getHighlightedField('title_original', 'EN')})</span> :
											` (${getHighlightedField('title_original', 'EN')})`
										)
									}
									{rec['date_created'] && `, ${rec['date_created']}`}
								</div>
							</a>
							<div className={style.Description}>
								{ getHighlightedField('contents_summary', 'EN') }
							</div>
						</div>
						{ detectSecondLanguage() &&
							<div style={{flex: 1}}>
								<a href={`/catalog/${rec['id']}`}>
									<div className={style.Title}>
										{
											originalLocale === 'RU' ?
											<span className={style.Russian}>{getHighlightedField('title', originalLocale)}</span> :
											getHighlightedField('title', originalLocale)
										}
										{rec['date_created'] && `, ${rec['date_created']}`}
									</div>
								</a>
								<div className={style.Description}>
									{getHighlightedField('contents_summary', originalLocale)}
								</div>
							</div>
						}
					</div>
					<div className={style.Info}>
						{ rec['info'] }
						{ getNotes() }
					</div>
					<div className={style.Buttons}>
						{isMobile && <CartButton record={rec} inCart={inCart(rec['id'])} name={rec['id']} />}
						<AvailabilityButton record={rec} />
						<AccessRightsButton record={rec} />
						<div className={style.Divider} />
						<PrimaryTypeButton primaryType={rec['primary_type']} />
					</div>
				</div>
			)
		}
	}

	const onFilter = (filter, value) => {
		delete router.query['view']
		if (value !== '') {
			router.replace({
				query: {...router.query, [filter]: value, start: 1}
			}, undefined, {shallow: true})
		} else {
			delete router.query[filter]
			router.replace({
				query: {...router.query, start: 1}
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
						<div>{containerNumber}</div>
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
						{
							!rec['digital_version_online'] &&
							<div className={style.CartButton}>
								<CartButton record={rec} inCart={inCart(rec['id'])} name={rec['id']} />
							</div>
						}
						<a href={`/catalog/${rec['id']}`}>
							<div className={rec['digital_version_online'] ? `${style.CallNumber} ${style.Online}` : style.CallNumber}>
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
				<div className={isMobile ? `${style.SeriesSearch} ${style.Mobile}` : style.SeriesSearch}>
					<IsadSearchBar
						placeholder={filterPlaceholders['search'][language]}
						seriesQuery={seriesQuery}
						onSearch={(value) => onFilter('seriesQuery', value)}
						onFilter={() => setFilterOpen(!filterOpen)}
						isMobile={isMobile}
						filterOpen={filterOpen}
					/>
					<IsadPagination
						numFound={numFound}
						recordsCount={data ? data['response']['docs'].length : []}
						containerCount={containerCount}
						folderItemCount={folderItemCount}
						containerNumber={start}
						isMobile={isMobile}
					/>
					<Collapse isOpened={filterOpen}>
						{renderFilters()}
					</Collapse>
				</div>
			)
		} else {
			return (
				<div className={style.SeriesSearch}>
					<div className={style.SearchRow}>
						<IsadSearchBar
							placeholder={filterPlaceholders['search'][language]}
							seriesQuery={seriesQuery}
							onSearch={(value) => onFilter('seriesQuery', value)}
							onFilter={() => setFilterOpen(!filterOpen)}
							filterOpen={filterOpen}
						/>
						<IsadPagination
							numFound={numFound}
							recordsCount={data ? data['response']['docs'].length : []}
							containerCount={containerCount}
							folderItemCount={folderItemCount}
							containerNumber={start}
						/>
					</div>
					<Collapse isOpened={filterOpen}>
						<div className={style.FilterRow}>
							{renderFilters()}
						</div>
					</Collapse>
				</div>
			)
		}
	}

	return (
		<React.Fragment>
			{ renderMenu() }
			<div className={style.RecordsWrapper}>
					{data && !isLoading ? renderDocs(data['response']['docs']) : <Loader />}
			</div>
		</React.Fragment>
	)

}

export default IsadContentPage;
