import style from "./ImageMetadata.module.scss"
import Button from "../../search/parts/Button";

const ImageMetadata = ({metadata}) => {

  const renderData = () => {
    const displayField = (field, label) => {
      return (
        <div className={style.Row}>
          <div className={style.Label}>{label}</div>
          {
            field === 'reference_code' ?
            <div className={style.RefCodeWithLink}>
              <div className={style.Data}>{metadata[field]}</div>
              <Button text={'Show full record'} link={`/catalog/${metadata['id']}`}/>
            </div>
            : <div className={style.Data}>{metadata[field]}</div>
          }
        </div>
      )
    }

    return (
      <div className={style.MetadataWrapper}>
        {displayField('title', 'Title')}
        {displayField('reference_code', 'Reference Code')}
        {displayField('contents_summary', 'Contents Summary')}
      </div>
    )

  }

  return ( metadata ? renderData() : '' )
}

export default ImageMetadata;