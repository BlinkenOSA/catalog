import style from "./ImageGalleryPage.module.scss";
import {useState} from "react";
import ImageGalleryThumbnails from "./ImageGalleryThumbnails";
import Button from "../search/parts/Button";
import ImageViewerPage from "./ImageViewerPage";
import FacetHelperMobile from "../../facets/mobile/FacetHelperMobile";


const ImageGalleryPage = ({initialData, breadcrumbHeight, isMobile=false}) => {
	const [selectedImage, setSelectedImage] = useState('')

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
						Explore the Blinken OSA Archivum's ever-growing collection of digital images. Our digital image collection
						currently contains {total} images. Select an image on the right side to see it in high quality with
						deep level zooming thanks to the <a href={'https://iiif.io/'} target={'_new'}>IIIF framework</a>.
					</p>
					<p>
						Use the search box to search in the descriptions. You can also use the predefined filters to narrow down
						your search results. To see the full archive description of an image, select an image to open it in the
						viewer and click the button in the header. See the example below:
					</p>
					<div style={{marginTop: '10px',marginRight: '10px'}}>
						<Button text={'Show full record'} link={`#`}/>
					</div>
					<br/>
					<p>
						Start your image discovery journey now!
					</p>
				</div>
			</div>
		)
	}

	if (isMobile) {
		return (
			<>
				<div className={style.ImageGalleryPage}>
					<div className={`${style.ImageGalleryThumbnails} ${style.Mobile}`}>
						<ImageGalleryThumbnails
							breadcrumbHeight={breadcrumbHeight}
							initialData={initialData}
							onImageSelect={onImageSelect}
							selectedImage={selectedImage}
							isMobile={true}
						/>
					</div>
				</div>
				<div className={selectedImage !== '' ? `${style.Drawer}` : `${style.Drawer} ${style.Closed}`}>
					<div className={style.Window}>
						<div className={style.CloseButton} onClick={() => setSelectedImage('')}>
							<span> </span>
							<span> </span>
						</div>
						{
							selectedImage &&
							<div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
								<ImageViewerPage selectedImage={selectedImage} isMobile={true}/>
							</div>
						}
					</div>
				</div>
			</>
		)
	} else {
		return (
			<div className={style.ImageGalleryPage}>
				<div className={style.ImageGalleryViewer}>
					<div className={style.Content} style={{top: 59 + breadcrumbHeight}}>
						{
							selectedImage ? <ImageViewerPage selectedImage={selectedImage}/> : renderImageGalleryText()
						}
					</div>
				</div>
				<div className={style.ImageGalleryThumbnails}>
					<ImageGalleryThumbnails
						breadcrumbHeight={breadcrumbHeight}
						initialData={initialData}
						onImageSelect={onImageSelect}
						selectedImage={selectedImage}
					/>
				</div>
			</div>

		)
	}
}

export default ImageGalleryPage;