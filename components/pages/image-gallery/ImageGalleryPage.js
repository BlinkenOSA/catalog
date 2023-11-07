import style from "./ImageGalleryPage.module.scss";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import ImageMetadata from "./parts/ImageMetadata";


const ImageGalleryPage = ({data, facets, total}) => {
	const [selectedImage, setSelectedImage] = useState(data?.[0]?.['response']['docs'][0]['id'])
	const [selectedImageMetadata, setSelectedImageMetadata] = useState({})

	useEffect(() => {
		data.forEach(d => {
			const results = d['response']['docs'].filter(r => r['id'] === selectedImage)
			if (results.length > 0) {
				setSelectedImageMetadata(results[0])
			}
		})
	}, [selectedImage])

	const ImageGalleryThumbnails = dynamic(() => import('./ImageGalleryThumbnails'), {
		ssr: false
	})

	const ImageViewer = dynamic(() => import('../../catalog/finding-aids/parts/findingAidsDigitalContent/viewers/ImageViewer'), {
		ssr: false
	})

	const onImageSelect = (id) => {
		if (selectedImage === id) {
			setSelectedImage('')
		} else {
			setSelectedImage(id)
		}
	}

	return (
		<div className={style.ImageGalleryPage}>
			<div className={style.ImageGalleryViewer}>
				<div className={style.Content}>
					<ImageMetadata metadata={selectedImageMetadata}/>
					{selectedImage && data.length > 0 && <ImageViewer id={selectedImage} isGallery={true} />}
				</div>
			</div>
			<div className={style.ImageGalleryThumbnails}>
				<ImageGalleryThumbnails
					data={data}
					facets={facets}
					total={total}
					onImageSelect={onImageSelect}
					selectedImage={selectedImage}
				/>
			</div>
		</div>
	)
}

export default ImageGalleryPage;