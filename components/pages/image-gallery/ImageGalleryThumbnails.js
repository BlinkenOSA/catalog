import style from "./ImageGalleryThumbnails.module.scss";
import FilterMenu from "./parts/FilterMenu";
import GalleryFooter from "../../layout/GalleryFooter";
import {galleryFacetConfig} from "../../../config/galleryFacetConfig";
import {useState} from "react";
import FacetPage from "../../facets/desktop/FacetPage";
import React from "react";
import {useRouter} from "next/router";
import useSWRInfinite from "swr/infinite";
import {solrFetcher} from "../../../utils/fetcherFunctions";

const ImageGalleryThumbnails = ({initialData, selectedImage, onImageSelect, breadcrumbHeight, isMobile=false}) => {
    const router = useRouter();
    const {id, query, ...selectedFacets} = router.query;

    const [selectedFacetGroup, setSelectedFacetGroup] = useState('')

    const PER_PAGE = 50;

    const getKey = (index) => {
        return {
            solrCore: 'image-gallery',
            query: query,
            offset: index * PER_PAGE,
            limit: PER_PAGE,
            ...selectedFacets
        }
    }

    const { data, size, setSize } = useSWRInfinite(getKey, solrFetcher, {fallbackData: [initialData]})
    const isEmpty = data?.[0]?.['response']['docs'].length === 0;
    const isReachingEnd = isEmpty || (data && data[data.length - 1]?.['response']['docs'].length < PER_PAGE);

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

    const renderThumbnails = () => {
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
                  data.map((response, idx) => {
                      return response['response']['docs'].map((record, index) => {
                          const dimensionData = getDimensionData(record);
                          if (dimensionData) {
                              return (
                                <figure
                                  className={selectedImage === record['id'] ? style.Selected : ''}
                                  key={index}
                                  onClick={() => onImageSelect(record['id'])}
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
              {
                !isReachingEnd &&
                <div className={style.MoreButtonWrapper}>
                    <div
                      className={style.MoreButton}
                      onClick={() => setSize(size + 1)}>
                        Load More ...
                    </div>
                </div>
              }
          </div>
        )
    }

    if (isMobile) {
        return (
            <>
                {renderThumbnails()}
                <div style={{flex: 1}}/>
            </>
        )
    } else {
        return (
            <>
                <div className={style.FilterBar} style={{top: 59 + breadcrumbHeight}}>
                    <FilterMenu
                        selectedFacetGroup={selectedFacetGroup}
                        onSelectFacetGroup={handleFacetGroupSelect}
                    />
                </div>
                {
                    selectedFacetGroup === '' ?
                        <>
                            {renderThumbnails()}
                            <div style={{flex: 1}}/>
                            <GalleryFooter />
                        </>
                        : <FacetPage
                            type={'gallery'}
                            breadcrumbHeight={breadcrumbHeight}
                            facetConfig={galleryFacetConfig}
                            facets={data?.[0]?.['facet_counts']['facet_fields']}
                            total={data?.[0]?.['response']['numFound']}
                            selectedFacetGroup={selectedFacetGroup}
                            onSelectFacetGroup={onSelectFacetGroup}
                            onShowButtonClick={onShowButtonClick}
                        />
                }
            </>
        )
    }
}

export default ImageGalleryThumbnails;