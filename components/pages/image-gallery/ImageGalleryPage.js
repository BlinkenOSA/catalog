import style from "./ImageGalleryPage.module.scss";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import ImageMetadata from "./parts/ImageMetadata";
import ImageGalleryThumbnails from "./ImageGalleryThumbnails";
import Button from "../search/parts/Button";


const ImageGalleryPage = ({initialData}) => {
	const [selectedImage, setSelectedImage] = useState('')

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

	const renderImageGalleryText = () => {
		const total = initialData['response']['numFound']

		return (
			<div>
				<div className={style.Title}>Digital Image Gallery</div>
				<div className={style.Text}>
					<p>
						Explore the constantly growing amount of digital images of the Blinken OSA Archivum. Currently there
						are {total} images in our digital image collection. Select an image on the right side to see it in high quality
						with deep level zooming thanks to the <a href={'https://iiif.io/'} target={'_new'}>IIIF framework</a>.
					</p>
					<p>
						Use the search box to search in the descriptions or use the pre-defined filters to narrow the results of
						your search. If you would like to see the full archival description of an image, select an image to open
						it in the viewer and click the button in the header. See the example below:
					</p>
					<div style={{marginTop: '10px',marginRight: '10px'}}>
						<Button text={'Show full record'} link={`#`}/>
					</div>
					<br/>
					<p>
						Start your image exploring journey now!
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className={style.ImageGalleryPage}>
			<div className={style.ImageGalleryViewer}>
				<div className={style.Content}>
					{
						selectedImage ?
						  <>
								<ImageMetadata selectedImage={selectedImage} />
								<ImageViewer id={selectedImage} isGallery={true} />
							</> :
							renderImageGalleryText()
					}
				</div>
			</div>
			<div className={style.ImageGalleryThumbnails}>
				<ImageGalleryThumbnails
					initialData={initialData}
					onImageSelect={onImageSelect}
					selectedImage={selectedImage}
				/>
			</div>
		</div>
	)
}

export default ImageGalleryPage;