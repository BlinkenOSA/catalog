import Head from "next/head";
import React from "react";
import style from "./pages.module.scss";
import ImageGalleryPage from "../components/pages/image-gallery/ImageGalleryPage";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import {useMeasure} from "react-use";
import {makeSolrParams, solrFetcher} from "../utils/fetcherFunctions";
import {Buffer} from "buffer";
import GalleryLayout from "../components/layout/gallery/GalleryLayout";
import useSWRInfinite from "swr/infinite";
import {useRouter} from "next/router";

const SOLR_API = process.env.NEXT_PUBLIC_SOLR_IMAGE_GALLERY;

const SOLR_USER = process.env.NEXT_PUBLIC_SOLR_USER;
const SOLR_PASS = process.env.NEXT_PUBLIC_SOLR_PASS;

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
	const [ref] = useMeasure();

	const router = useRouter();
	const {id, query, ...selectedFacets} = router.query;

	const getKey = (index) => {
		return {
			solrCore: 'image-gallery',
			query: query,
			offset: index * 50,
			limit: 50,
			...selectedFacets
		}
	}

	const { data, size, setSize } = useSWRInfinite(getKey, solrFetcher, {fallbackData: [initialData]})

	return (
		<GalleryLayout>
			<Head>
				<title>Blinken OSA Archivum - Image Gallery</title>
			</Head>
			<BreadcrumbSearch
				total={data?.[0]?.['response']['numFound']}
				reference={ref}
				inverse={false}
				module={'image-gallery'}
				isMobile={false}
			/>
			<div className={`${style.Page}`}>
				<ImageGalleryPage
					data={data}
					facets={data?.[0]?.['facet_counts']['facet_fields']}
					total={data?.[0]?.['response']['numFound']} />
			</div>
		</GalleryLayout>
	)
}

export default ImageGallery;
