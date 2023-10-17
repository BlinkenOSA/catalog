import style from "./ImageGalleryThumbnails.module.scss";
import FilterMenu from "./parts/FilterMenu";
import ImageGalleryThumbnailGrid from "./parts/ImageGalleryThumbnailGrid";
import GalleryFooter from "../../layout/gallery/GalleryFooter";
import ImageGalleryFacets from "./parts/ImageGalleryFacets";
import {galleryFacetConfig} from "../../../config/galleryFacetConfig";
import {useState} from "react";

const ImageGalleryThumbnails = ({data, facets, selectedImage, onImageSelect}) => {
    const [selectedFacetGroup, setSelectedFacetGroup] = useState('')

    const handleFacetGroupSelect = (facetGroupKey) => {
        if (selectedFacetGroup === facetGroupKey) {
            setSelectedFacetGroup('')
        } else {
            setSelectedFacetGroup(facetGroupKey)
        }
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
                : <ImageGalleryFacets
                    facets={facets}
                    selectedFacetGroup={selectedFacetGroup}
                    facetConfig={galleryFacetConfig}
                />
            }
        </>
    )
}

export default ImageGalleryThumbnails;