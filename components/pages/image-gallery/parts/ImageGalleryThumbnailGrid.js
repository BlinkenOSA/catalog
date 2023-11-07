import React, {useEffect, useState} from 'react';
import style from "./ImageGalleryThumbnailGrid.module.scss";

const ImageGalleryThumbnailGrid = ({records, selectedImage, onSelect}) => {
	const getDimensionData = (record) => {
		if (record.hasOwnProperty('digital_version_technical_metadata') && record['digital_version_technical_metadata']) {
			const imageData = JSON.parse(record['digital_version_technical_metadata'])
			const width = imageData['sizes'][2]['width']
			const height = imageData['sizes'][2]['height']
			return {
				flexGrow: width * 100 / height,
				flexBasis: width * 120 / height,
				paddingBottom: height / width * 100.0,
				imageURL: `${imageData['@id']}/full/${width},${height}/0/default.jpg`
			}
		} else {
			return undefined
		}
	}

	return (
		<div className={style.Grid}>
			{
				records.map((response, idx) => {
					return response['response']['docs'].map((record, index) => {
						const dimensionData = getDimensionData(record);
						if (dimensionData) {
							return (
								<figure
									className={selectedImage === record['id'] ? style.Selected : ''}
									key={index}
									onClick={() => onSelect(record['id'])}
									style={{
										flexGrow: dimensionData['flexGrow'],
										flexBasis: `${dimensionData['flexBasis']}px`
									}}>
									<i style={{paddingBottom: `${dimensionData['paddingBottom']}%`}}/>
									<img src={dimensionData['imageURL']} alt="placeholder"/>
								</figure>
							)
						}
					})
				})
			}
		</div>
	)
}

export default ImageGalleryThumbnailGrid;