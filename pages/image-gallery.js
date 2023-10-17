import Layout from "../components/layout/Layout";
import Head from "next/head";
import React from "react";
import style from "./pages.module.scss";
import ImageGalleryPage from "../components/pages/image-gallery/ImageGalleryPage";
import BreadcrumbSearch from "../components/breadcrumbs/desktop/BreadcrumbSearch";
import {useMeasure} from "react-use";
import {makeSolrParams} from "../utils/fetcherFunctions";
import {Buffer} from "buffer";
import dynamic from "next/dynamic";
import GalleryLayout from "../components/layout/gallery/GalleryLayout";

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
	if (data.hasOwnProperty('response')) {
		return {
			props: {
				data: data['response']['docs'],
				facets: data['facet_counts']['facet_fields']
			}
		}
	} else {
		return { props: { data } }
	}
}

const ImageGallery = ({data, facets}) => {
	const [ref] = useMeasure();

	return (
		<GalleryLayout>
			<Head>
				<title>Blinken OSA Archivum - Image Gallery</title>
			</Head>
			<BreadcrumbSearch
				total={0}
				reference={ref}
				inverse={false}
				module={'image-gallery'}
				isMobile={false}
			/>
			<div className={`${style.Page}`}>
				<ImageGalleryPage data={data} facets={facets} />
			</div>
		</GalleryLayout>
	)
}

export default ImageGallery;
