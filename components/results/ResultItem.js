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
import {useCart} from "react-use-cart";
import countObjectsByProperty from "../../utils/countObjectsByProperty";
import { useAlert } from 'react-alert'

const ResultItem = ({result, limit, offset, index}) => {
    const { addItem, removeItem, items, inCart } = useCart();
    const alert = useAlert()

    const renderThumbnail = () => {
        return (
            <div className={style.ResultItemThumbnail}>

            </div>
        )
    }

    const onCheckedChange = (checked) => {
        if (checked) {
            const count = countObjectsByProperty(items, 'origin', result['record_origin']);

            const item = {
                id: result['id'],
                origin: result['record_origin'],
                price: 0
            }

            if (count >= 10) {
                alert.show(`You have reached the maximum amount of '${result['record_origin']}' items allowed to be requested!`);
            } else {
                addItem(item, 1);
            }
        } else {
            removeItem(result['id'])
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
                onCheckedChange={onCheckedChange}
            />
        )

        /*
        const count = countObjectsByProperty(items, 'origin', result['record_origin']);

        if (count >= 10) {
            if (inCart(result['id']) || result['digital_version_exists']) {
                return (
                    <CartButton
                        inCart={inCart(result['id'])}
                        name={result['id']}
                        onCheckedChange={onCheckedChange}
                    />
                )
            } else {
                return ''
            }
        } else {
            return (
                <CartButton
                    inCart={inCart(result['id'])}
                    name={result['id']}
                    onCheckedChange={onCheckedChange}
                />
            )
        }
        */
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
