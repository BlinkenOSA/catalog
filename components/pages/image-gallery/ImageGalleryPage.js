import style from "./ImageGalleryPage.module.scss";
import dynamic from "next/dynamic";
import FilterMenu from "./parts/FilterMenu";
import {useState} from "react";
import ImageMetadata from "./parts/ImageMetadata";

const ImageGalleryPage = ({data}) => {
	const records = data['response']['docs']
	const [selectedImage, setSelectedImage] = useState('')

	const ImageGalleryThumbnails = dynamic(() => import('./parts/ImageGalleryThumbnails'), {
		ssr: false
	})

	const ImageViewer = dynamic(() => import('../../catalog/finding-aids/parts/findingAidsDigitalContent/viewers/ImageViewer'), {
		ssr: false
	})

	return (
		<div className={style.ImageGalleryPage}>
			<div className={style.ImageGalleryThumbnails}>
				<div className={style.FilterBar}>
					<FilterMenu />
				</div>
				<ImageGalleryThumbnails records={records} onSelect={setSelectedImage} />
			</div>
			<div className={style.ImageGalleryViewer}>
				<div className={style.Content}>
					<ImageViewer id={selectedImage} isGallery={true} />
					<ImageMetadata id={selectedImage} />
				</div>
			</div>
		</div>
	)
}

export default ImageGalleryPage;