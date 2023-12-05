import {getPdfURL, getURL, getVideoURL} from "../../../../utils/digitalObjectFunctions";
import style from './ResultThumbnail.module.scss';

const ResultThumbnail = ({record, isMobile}) => {
	const archivalReferenceCode = record['call_number']

	const getThumbnailURL = () => {
		switch (record['primary_type']) {
			case 'Textual':
				return getPdfURL(record['digital_version_barcode'], '', true)
			case 'Moving Image':
				return getVideoURL(record['digital_version_barcode'], true)
			case 'Still Image':
				return getURL(archivalReferenceCode, record['digital_version_barcode'], record['primary_type'], true);
			case 'Audio':
				return getURL(archivalReferenceCode, record['digital_version_barcode'], record['primary_type'], true);
		}
	}

	const getIconClass = () => {
		switch(record['primary_type']) {
			case 'Textual':
			case 'Still Image':
				return ''
			case 'Moving Image':
				return style.MovingImage;
			case 'Audio':
				return style.MovingImage;
		}
	}

	switch (record['record_origin']) {
		case 'Library':
			return record['thumbnail'] &&
				<a href={`/catalog/${record['id']}`}>
					<div className={isMobile ? `${style.Thumbnail} ${style.Mobile}` : style.Thumbnail}>
						<div>
							<img
								alt={`Book cover of ${record['title']}`}
								style={{maxWidth: isMobile ? '100px' : '200px'}}
								src={`${record['thumbnail']}`}
							/>
						</div>
					</div>
				</a>
		case 'Archives':
			if (record['digital_version_online']) {
				return (
					<a href={`/catalog/${record['id']}`}>
						<div className={isMobile ? `${style.Thumbnail} ${style.Mobile}` : style.Thumbnail}>
							<div className={getIconClass()}>
								<img
									width={isMobile ? 100 : 200}
									alt={'thumbnail'}
									src={getThumbnailURL()}
								/>
							</div>
						</div>
					</a>
				)
			} else {
				return ''
			}
		default:
			return ''
	}
}

export default ResultThumbnail
