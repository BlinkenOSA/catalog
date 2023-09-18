import Layout from "../components/layout/Layout";
import Head from "next/head";
import React from "react";
import style from "./pages.module.scss";

const ImageGallery = () => {
	return (
		<Layout>
			<Head>
				<title>Blinken OSA Archivum - Image Gallery</title>
			</Head>
			<div className={style.Page}>
				<div className={style.PageTitle}>
					<div></div>
					<div></div>
				</div>
			</div>
		</Layout>
	)
}

export default ImageGallery;
