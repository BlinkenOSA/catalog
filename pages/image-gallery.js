import Head from "next/head";
import React, {useState} from "react";
import style from "./pages.module.scss";
import ImageGalleryPage from "../components/pages/image-gallery/ImageGalleryPage";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import {useMeasure} from "react-use";
import {makeSolrParams} from "../utils/fetcherFunctions";
import {Buffer} from "buffer";
import GalleryLayout from "../components/layout/GalleryLayout";
import {Media} from "../utils/media";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
import FacetPageMobile from "../components/facets/mobile/FacetPageMobile";
import {galleryFacetConfig} from "../config/galleryFacetConfig";
import Error from "next/error";
import {filterAcceptedParams, getRejectedParamKeys} from "../utils/urlParamFunctions";
import NotFound from "../components/pages/search/results/NotFound";

const SOLR_API = process.env.NEXT_PUBLIC_SOLR_IMAGE_GALLERY;

const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER;
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS;

export async function getServerSideProps(context) {
	const rejectedParams = getRejectedParamKeys(context.query, 'gallery')
	if (rejectedParams.length > 0) {
		context.res.statusCode = 400
		return { props: { errorCode: 400 } }
	}

	const params = filterAcceptedParams(context.query, 'gallery')
	const solrParams = makeSolrParams(params, 'gallery')

	try {
		// SOLR Basic Authentication
		let headers = new Headers();
		headers.set('Authorization', 'Basic ' + Buffer.from(SOLR_USER + ":" + SOLR_PASS).toString('base64'));

		const res = await fetch(`${SOLR_API}?` + solrParams, {
			headers: headers
		})

		if (!res.ok) {
			throw new Error(`SOLR request failed with status ${res.status}`)
		}

		const data = await res.json()
		return { props: { initialData: data } }
	} catch (error) {
		console.error('SOLR gallery request failed:', error)
		context.res.statusCode = 503
		return { props: { initialData: null, serviceUnavailable: true } }
	}
}

const ImageGallery = ({initialData, errorCode, serviceUnavailable}) => {
	if (errorCode) {
		return <Error statusCode={errorCode} title={'Invalid search parameters'} />
	}

	const [ref, {height}] = useMeasure();
	const [selectedFacetGroup, setSelectedFacetGroup] = useState('')

	const onSelectFacetGroup = (facetGroup) => {
		if (selectedFacetGroup === facetGroup) {
			setSelectedFacetGroup('')
		} else {
			setSelectedFacetGroup(facetGroup)
		}
	}

	const onShowButtonClick = () => {
		setSelectedFacetGroup('')
	}

	const renderGalleryContentMobile = () => {
		if (selectedFacetGroup === '') {
			return (
				<div className={`${style.Page} ${style.Mobile}`}>
					<ImageGalleryPage
						isMobile={true}
						breadcrumbHeight={height}
						initialData={initialData} />
				</div>
			)
		} else {
			return (
				<FacetPageMobile
					facetConfig={galleryFacetConfig}
					selectedFacetGroupInitial={selectedFacetGroup}
					breadcrumbHeight={height}
					facets={initialData ? initialData['facet_counts']['facet_fields'] : {}}
					total={initialData ? initialData['response']['numFound'] : 0}
					onShowButtonClick={onShowButtonClick}
				/>
			)
		}
	}

	return (
		<GalleryLayout>
			<Head>
				<title>Blinken OSA Archivum - Digital Image Gallery</title>

			</Head>
			<Media lessThan="md">
				<BreadcrumbSearchMobile
					defaultFacetOpen={'series'}
					reference={ref}
					inverse={selectedFacetGroup !== ''}
					module={'image-gallery'}
					onSelectFacetGroup={onSelectFacetGroup}
				/>
				{
					serviceUnavailable ?
						<NotFound
							face={'(x_x)'}
							mainText={'Search service unavailable'}
							text={'The search service is currently unavailable. Please try again later.'}
						/> :
						renderGalleryContentMobile()
				}
			</Media>
			<Media greaterThanOrEqual="md">
				<BreadcrumbSearch
					reference={ref}
					inverse={false}
					module={'image-gallery'}
				/>
				<div className={`${style.Page}`}>
					{
						serviceUnavailable ?
							<NotFound
								face={'(x_x)'}
								mainText={'Search service unavailable'}
								text={'The search service is currently unavailable. Please try again later.'}
							/> :
							<ImageGalleryPage
								breadcrumbHeight={height}
								initialData={initialData} />
					}
				</div>
			</Media>
		</GalleryLayout>
	)
}

export default ImageGallery;
