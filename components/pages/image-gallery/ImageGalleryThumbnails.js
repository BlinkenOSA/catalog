import style from "./ImageGalleryThumbnails.module.scss";
import FilterMenu from "./parts/FilterMenu";
import ImageGalleryThumbnailGrid from "./parts/ImageGalleryThumbnailGrid";
import GalleryFooter from "../../layout/gallery/GalleryFooter";
import {galleryFacetConfig} from "../../../config/galleryFacetConfig";
import {useState} from "react";
import FacetPage from "../../facets/desktop/FacetPage";
import React from "react";

const ImageGalleryThumbnails = ({data, facets, total, selectedImage, onImageSelect}) => {
    const [selectedFacetGroup, setSelectedFacetGroup] = useState('')

    const handleFacetGroupSelect = (facetGroupKey) => {
        if (selectedFacetGroup === facetGroupKey) {
            setSelectedFacetGroup('')
        } else {
            setSelectedFacetGroup(facetGroupKey)
        }
    }

    const onSelectFacetGroup = (group) => {
        setSelectedFacetGroup(group)
    }

    const onShowButtonClick = () => {
        setSelectedFacetGroup('')
    }

    return (
        <>
            <div className={style.FilterBar}>
                <FilterMenu
                    selectedFacetGroup={selectedFacetGroup}
                    onSelectFacetGroup={handleFacetGroupSelect}
                />
            </div>
            {
                selectedFacetGroup === '' ?
                <>
                    <ImageGalleryThumbnailGrid
                        records={data}
                        selectedImage={selectedImage}
                        onSelect={onImageSelect} />
                    <GalleryFooter />
                </>
                : <FacetPage
                    facetConfig={galleryFacetConfig}
                    facets={facets ? facets : {}}
                    total={total}
                    selectedFacetGroup={selectedFacetGroup}
                    onSelectFacetGroup={onSelectFacetGroup}
                    onShowButtonClick={onShowButtonClick}
                  />
            }
        </>
    )
}

export default ImageGalleryThumbnails;