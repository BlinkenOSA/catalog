import style from "./ImageMetadata.module.scss"
import Button from "../../search/parts/Button";

const ImageMetadata = ({metadata}) => {

  const renderData = () => {
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

  return ( metadata ? renderData() : '' )
}

export default ImageMetadata;