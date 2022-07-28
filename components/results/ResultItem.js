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
import { useAlert } from 'react-alert'
import countObjectsByProperties from "../../utils/countObjectsByProperty";

const ResultItem = ({result, limit, offset, index}) => {
    const { addItem, removeItem, items, inCart } = useCart();
    const alert = useAlert()

    const renderThumbnail = () => {
        return (
            <div className={style.ResultItemThumbnail}>

            </div>
        )
    }

    const isFolderItem = () => {
        if (result.hasOwnProperty('archival_level')) {
            if (result['archival_level'] === 'Folder/Item') {
                return true
            }
        }
        return false;
    }

    const countContainers = () => {
        const uniqueSet = [...new Set(items.map(item => item['container_code']))]
        return uniqueSet.length - 1;
    }

    const onCheckedChange = (checked) => {
        const getSortingCode = () => {
            if (isFolderItem()) {
                const [fonds, subfonds, series] = result['series_reference_code'].trim().split('-')
                const container = result['container_number'].toString()
                const folder = result['folder_number'].toString()
                const sequence = result['sequence_number'].toString()
                return `${fonds.padStart(4, 0)}-${subfonds.padStart(4, 0)}-${series.padStart(4, 0)}-${container.padStart(4, 0)}-${folder.padStart(4, 0)}-${sequence.padStart(4, 0)}`
            } else {
                return result['title']
            }
        }

        const getType = () => {
            if (isFolderItem()) {
                return `${result['container_type']} #${result['container_number']}`
            } else {
                return `${result['primary_type']}${result['extent'] ? `, ${result['extent'].join(', ')}` : ''}`
            }
        }

        if (checked) {
            let count;

            if (isFolderItem()) {
                count = countContainers()
            } else {
                count = countObjectsByProperties(items, 'origin', result['record_origin']);
            }

            const item = {
                id: result['id'],
                origin: result['record_origin'],
                title: result['title'],
                title_original: result.hasOwnProperty('title_original') ? result['title_original'] : '',
                call_number: result.hasOwnProperty('call_number') ? result['call_number'][0] : '',
                sorting_code: getSortingCode(),
                digital_version: result.hasOwnProperty('digital_version_barcode') ? result['digital_version_barcode'] : '',
                type: getType(),
                series_name: result.hasOwnProperty('series_name') ? result['series_name'] : '',
                price: 0
            }

            if (count >= 10) {
                if (isFolderItem()) {
                    alert.show(`You have reached the maximum amount of boxes allowed to be requested!`);
                } else {
                    alert.show(`You have reached the maximum amount of '${result['record_origin']}' items allowed to be requested!`);
                }
            } else {
                addItem(item, 1);
            }
        } else {
            removeItem(result['id'])
        }
    }

    const renderAvailabilityButton = () => {
        if (result['primary_type'] !== 'Archival Unit') {
            return <AvailabilityButton result={result} />
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
                onCheckedChange={onCheckedChange}
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
                    {renderAvailabilityButton()}
                </div>
            </div>
            {renderThumbnail()}
        </div>
    )
}

export default ResultItem;
