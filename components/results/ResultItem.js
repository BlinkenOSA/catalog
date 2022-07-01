import style from "./ResultItem.module.scss";
import Subtitle from "./parts/metadata/Subtitle";
import Title from "./parts/metadata/Title";
import RecordType from "./parts/metadata/RecordType";
import Publisher from "./parts/metadata/Publisher";
import ParentUnits from "./parts/metadata/ParentUnits";
import CallNumber from "./parts/metadata/CallNumber";
import AvailabilityButton from "./parts/buttons/AvailabilityButton";
import PrimaryTypeButton from "../content/parts/buttons/PrimaryTypeButton";
import CartButton from "../content/parts/buttons/CartButton";

const ResultItem = ({result, limit, offset, index, inCart, onCartAction}) => {
    const renderThumbnail = () => {
        return (
            <div className={style.ResultItemThumbnail}>

            </div>
        )
    }

    const renderCartButton = () => {
        if (result['record_origin'] === 'Digital Repository') {
            return ''
        }

        if (result['primary_type'] === 'Archival Unit') {
            return ''
        }

        return <CartButton inCart={inCart} name={result['id']} onCheckedChange={onCartAction} />
    }

    return (
        <div className={limit === index + 1 ? style.ResultItemWrapperLast :  style.ResultItemWrapper}>
            <div className={style.ResultItemInfo}>
                <div className={style.Sequence}>
                    {offset + index + 1}.
                </div>
                <div className={style.Title}>
                    <Title result={result} />
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
                    <PrimaryTypeButton primaryType={result['primary_type']} />
                    <AvailabilityButton result={result} />
                </div>
            </div>
            {renderThumbnail()}
        </div>
    )
}

export default ResultItem;
