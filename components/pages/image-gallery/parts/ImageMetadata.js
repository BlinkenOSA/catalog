import style from "./ImageMetadata.module.scss"
import Button from "../../search/parts/Button";
import useSWR from "swr";
import {solrFetcher} from "../../../../utils/fetcherFunctions";

const ImageMetadata = ({selectedImage}) => {
  const { data, error } = useSWR({query: `id:${selectedImage}`}, solrFetcher);

  const renderData = () => {
    const metadata = data['response']['docs'][0]

    return (
      <div className={style.MetadataWrapper}>
        <div style={{flex: 1}}>
          <div className={style.Data}>{metadata['reference_code']}</div>
          <div className={style.Data}>{metadata['title']}</div>
        </div>
        <div style={{marginRight: '10px'}}>
          <Button text={'Show full record'} link={`/catalog/${metadata['id']}`}/>
        </div>
      </div>
    )
  }

  const renderEmpty = () => {
    return (
      <div className={style.MetadataWrapper} >
        <div className={style.Data}>Select an image from the right side</div>
      </div>
    )
  }

  return ( selectedImage && data ? renderData() : renderEmpty())
}

export default ImageMetadata;