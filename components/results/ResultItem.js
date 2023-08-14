import style from "./ResultItem.module.scss";
import Subtitle from "./parts/metadata/Subtitle";
import Title from "./parts/metadata/Title";
import RecordType from "./parts/metadata/RecordType";
import Publisher from "./parts/metadata/Publisher";
import ParentUnits from "./parts/metadata/ParentUnits";
import CallNumber from "./parts/metadata/CallNumber";
import AvailabilityButton from "./parts/buttons/AvailabilityButton";
import PrimaryTypeButton from "../pages/parts/buttons/PrimaryTypeButton";
import CartButton from "../cart/CartButton";
import { useCart } from "react-use-cart";
import SearchHighglights from "./parts/SearchHighglights";

const ResultItem = ({result, highlights, limit, offset, index, isMobile}) => {
    const { inCart } = useCart();

    const renderThumbnail = () => {
        switch (result['record_origin']) {
            case 'Library':
                return (
                  <div className={style.ResultItemThumbnail}>
                      {
                          result['thumbnail'] &&
                          <a href={`/catalog/${result['id']}`}>
                              <div>
                                  <img
                                    alt={`Book cover of ${result['title']}`}
                                    style={{maxHeight: '220px', maxWidth: '200px'}}
                                    src={`${result['thumbnail']}`}
                                  />
                              </div>
                          </a>
                      }
                  </div>
                )
            case 'Archives':
                return '';
            default:
                break;
        }
    }

    const renderAvailabilityButton = () => {
        if (result['primary_type'] !== 'Archival Unit') {
            return <AvailabilityButton record={result} />
        } else {
            return ''
        }
    }

    const renderCartButton = () => {
        if (result['record_origin'] === 'Digital Repository') {
            return ''
        }

        if (result['primary_type'] === 'Archival Unit') {
            return ''
        }

        return (
            <CartButton
                inCart={inCart(result['id'])}
                name={result['id']}
                record={result}
            />
        )
    }

    const renderSearchHighlights = () => {
        return <SearchHighglights result={result} highlights={highlights}/>
    }

    return (
        <div className={style.ResultItemWrapper}>
            <div className={style.ResultItemInfo}>
                <div className={style.Sequence}>
                    {offset + index + 1}.
                </div>
                <div className={style.Title}>
                    <a href={`/catalog/${result['id']}`}>
                        <Title result={result} highlights={highlights} />
                    </a>
                </div>
                <div className={style.Subtitle}>
                    <Subtitle result={result} />
                </div>
                <div className={style.DescriptionWrap} >
                    <RecordType label={'Format'} result={result} />
                    <CallNumber label={'Call Number'} result={result} />
                    <ParentUnits label={'Part of'} result={result} />
                    <Publisher label={'Publisher'} result={result} />
                </div>
                {renderSearchHighlights()}
                <div className={style.Buttons} >
                    {renderCartButton()}
                    <PrimaryTypeButton origin={result['record_origin']} primaryType={result['primary_type']} />
                    {renderAvailabilityButton()}
                </div>
            </div>
            {!isMobile && renderThumbnail()}
        </div>
    )
}

export default ResultItem;
