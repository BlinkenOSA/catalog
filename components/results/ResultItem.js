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

const ResultItem = ({result, limit, offset, index, isMobile}) => {
    const { inCart } = useCart();

    const renderThumbnail = () => {
        if (result['record_origin'] === 'Library') {
            return (
                <div className={style.ResultItemThumbnail}>
                    <a href={`/catalog/${result['id']}`}>
                        <div>
                            <img
                                alt={`Book cover of ${result['title']}`}
                                style={{maxHeight: '250px'}}
                                src={`api/library/book-cover/${result['id']}`}
                            />
                        </div>
                    </a>
                </div>
            )
        } else {
            return (
                <div className={style.ResultItemThumbnail}>

                </div>
            )
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

    return (
        <div className={limit === index + 1 ? style.ResultItemWrapperLast :  style.ResultItemWrapper}>
            <div className={style.ResultItemInfo}>
                <div className={style.Sequence}>
                    {offset + index + 1}.
                </div>
                <div className={style.Title}>
                    <a href={`/catalog/${result['id']}`}>
                        <Title result={result} />
                    </a>
                </div>
                <div className={style.Subtitle}>
                    <Subtitle result={result} />
                </div>
                <div className={style.DescriptionWrap} >
                    <RecordType label={'Format'} result={result} />
                    <Publisher label={'Publisher'} result={result} />
                    <ParentUnits label={'Part of'} result={result} />
                    <CallNumber label={'Call Number'} result={result} />
                </div>
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
