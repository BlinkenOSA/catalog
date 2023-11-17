import Head from "next/head";
import React, {useState} from "react";
import style from "./pages.module.scss";
import ImageGalleryPage from "../components/pages/image-gallery/ImageGalleryPage";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import {useMeasure} from "react-use";
import {makeSolrParams, solrFetcher} from "../utils/fetcherFunctions";
import {Buffer} from "buffer";
import GalleryLayout from "../components/layout/GalleryLayout";
import useSWRInfinite from "swr/infinite";
import {useRouter} from "next/router";
import {Media} from "../utils/media";
import BreadcrumbSearchMobile from "../components/breadcrumbs/mobile/BreadcrumbSearchMobile";
import {facetConfig} from "../config/facetConfig";
import FacetPageMobile from "../components/facets/mobile/FacetPageMobile";
import {galleryFacetConfig} from "../config/galleryFacetConfig";

const SOLR_API = process.env.NEXT_PUBLIC_SOLR_IMAGE_GALLERY;

const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER;
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS;

const PER_PAGE = 50;

export async function getServerSideProps(context) {
	const params = context.query
	const solrParams = makeSolrParams(params)

	// SOLR Basic Authentication
	let headers = new Headers();
	headers.set('Authorization', 'Basic ' + Buffer.from(SOLR_USER + ":" + SOLR_PASS).toString('base64'));

	const res = await fetch(`${SOLR_API}?` + solrParams, {
		headers: headers
	})

	const data = await res.json()
	return { props: { initialData: data } }
}

const ImageGallery = ({initialData}) => {
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
				{renderGalleryContentMobile()}
			</Media>
			<Media greaterThanOrEqual="md">
				<BreadcrumbSearch
					reference={ref}
					inverse={false}
					module={'image-gallery'}
				/>
				<div className={`${style.Page}`}>
					<ImageGalleryPage
						breadcrumbHeight={height}
						initialData={initialData} />
				</div>
			</Media>
		</GalleryLayout>
	)
}

export default ImageGallery;
