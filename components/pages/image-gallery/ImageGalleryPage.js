import style from "./ImageGalleryPage.module.scss";
import dynamic from "next/dynamic";
import FilterMenu from "./parts/FilterMenu";
import {useEffect, useState} from "react";
import ImageMetadata from "./parts/ImageMetadata";

const ImageGalleryPage = ({data}) => {
	const records = data['response']['docs']
	const [selectedImage, setSelectedImage] = useState('')
	const [selectedImageMetadata, setSelectedImageMetadata] = useState({})

	useEffect(() => {
		setSelectedImageMetadata(records.filter(r => r['id'] === selectedImage)[0])
	}, [selectedImage])

	const ImageGalleryThumbnails = dynamic(() => import('./parts/ImageGalleryThumbnails'), {
		ssr: false
	})

	const ImageViewer = dynamic(() => import('../../catalog/finding-aids/parts/findingAidsDigitalContent/viewers/ImageViewer'), {
		ssr: false
	})

	return (
		<div className={style.ImageGalleryPage}>
			<div className={style.ImageGalleryViewer}>
				<div className={style.Content}>
					<ImageViewer id={selectedImage} isGallery={true} />
					<ImageMetadata metadata={selectedImageMetadata} />
				</div>
			</div>
			<div className={style.ImageGalleryThumbnails}>
				<div className={style.FilterBar}>
					<FilterMenu />
				</div>
				<ImageGalleryThumbnails records={records} selectedImage={selectedImage} onSelect={setSelectedImage} />
			</div>
		</div>
	)
}

export default ImageGalleryPage;