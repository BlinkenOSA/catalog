import style from "./ImageGalleryPage.module.scss";
import dynamic from "next/dynamic";
import FilterMenu from "./parts/FilterMenu";
import {useEffect, useState} from "react";
import ImageMetadata from "./parts/ImageMetadata";
import GalleryFooter from "../../layout/gallery/GalleryFooter";

const ImageGalleryPage = ({data}) => {
	const [selectedImage, setSelectedImage] = useState('')
	const [selectedImageMetadata, setSelectedImageMetadata] = useState({})

	useEffect(() => {
		setSelectedImageMetadata(data.filter(r => r['id'] === selectedImage)[0])
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
					<ImageMetadata metadata={selectedImageMetadata}/>
					{
						selectedImage !== '' &&
						<ImageViewer id={selectedImage} isGallery={true} />
					}
				</div>
			</div>
			<div className={style.ImageGalleryThumbnails}>
				<div className={style.FilterBar}>
					<FilterMenu />
				</div>
				<ImageGalleryThumbnails records={data} selectedImage={selectedImage} onSelect={setSelectedImage} />
				<GalleryFooter />
			</div>
		</div>
	)
}

export default ImageGalleryPage;