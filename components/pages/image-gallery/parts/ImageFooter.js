import style from "./ImageFooter.module.scss"
import Button from "../../search/parts/Button";


const ImageMetadata = ({data, isMobile=false}) => {
  const renderData = () => {
    const metadata = data['response']['docs'][0]

    return (
      <div className={isMobile ? `${style.MetadataWrapper} ${style.Mobile}` : style.MetadataWrapper}>
        <div className={style.Buttons}>
        {
          metadata['keyword_facet'].map((keyword, idx) => {
            return <Button key={idx} text={keyword} />
          })
        }
        </div>
      </div>
    )
  }

  return ( data ? renderData() : '' )
}

export default ImageMetadata;