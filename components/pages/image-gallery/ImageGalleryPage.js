import style from "./ImageGalleryPage.module.scss";
import dynamic from "next/dynamic";

const ImageGalleryPage = ({data}) => {
	const records = data['response']['docs']

	const ImageGalleryThumbnails = dynamic(() => import('./ImageGalleryThumbnails'), {
		ssr: false
	})

	return (
		<div className={style.ImageGalleryPage}>
			<div className={style.ImageGalleryThumbnails}>
				<div className={style.FilterBar}>

				</div>
				<ImageGalleryThumbnails records={records} />

			</div>
			<div className={style.ImageGalleryViewer}>

			</div>
		</div>
	)
}

export default ImageGalleryPage;