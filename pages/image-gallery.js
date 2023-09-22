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
	return { props: { data } }
}

const ImageGallery = ({data}) => {
	const [ref] = useMeasure();

	return (
		<Layout>
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
			<div className={style.Page}>
				<div className={style.PageTitle}>
					<h1>Digital Image Gallery</h1>
				</div>
				<ImageGalleryPage data={data} />
			</div>
		</Layout>
	)
}

export default ImageGallery;
