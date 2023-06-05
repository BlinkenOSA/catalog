import React from 'react';
import style from './CartButton.module.scss';
import {useCart} from "react-use-cart";
import { useAlert } from 'react-alert'
import countObjectsByProperties from "../../utils/countObjectsByProperty";

const CartButton = ({name, record, inCart, onCheckedChange}) => {
    const { addItem, removeItem, items } = useCart();
    const alert = useAlert()

    const isFolderItem = () => {
        if (record.hasOwnProperty('archival_level')) {
            if (record['archival_level'] === 'Folder/Item') {
                return true
            }
        }
        return false;
    }

    const countContainers = () => {
        const uniqueSet = [...new Set(items.map(item => item['container_code']))]
        return uniqueSet.length - 1;
    }

    const onChange = (checked) => {
        if (onCheckedChange) {
            onCheckedChange(checked)
        } else {
            handleChange(checked)
        }
    }

    const handleChange = (checked) => {
        const getSortingCode = () => {
            if (isFolderItem()) {
                const [fonds, subfonds, series] = record['series_reference_code'].trim().split('-')
                const container = record['container_number'].toString()
                const folder = record['folder_number'].toString()
                const sequence = record['sequence_number'].toString()
                return `${fonds.padStart(4, 0)}-${subfonds.padStart(4, 0)}-${series.padStart(4, 0)}-${container.padStart(4, 0)}-${folder.padStart(4, 0)}-${sequence.padStart(4, 0)}`
            } else {
                return record['title']
            }
        }

        const getType = () => {
            if (isFolderItem()) {
                return `${record['container_type']} #${record['container_number']}`
            } else {
                return `${record['primary_type']}${record['extent'] ? `, ${record['extent'].join(', ')}` : ''}`
            }
        }

        if (checked) {
            let count;

            if (isFolderItem()) {
                count = countContainers()
            } else {
                count = countObjectsByProperties(items, 'origin', record['record_origin']);
            }

            const item = {
                id: record['id'],
                ams_id: record.hasOwnProperty('ams_id') ? record['ams_id'] : '',
                origin: record['record_origin'],
                title: record['title'],
                title_original: record.hasOwnProperty('title_original') ? record['title_original'] : '',
                call_number: record.hasOwnProperty('call_number') ? record['call_number'][0] : '',
                sorting_code: getSortingCode(),
                digital_version: record.hasOwnProperty('digital_version_barcode') ? record['digital_version_barcode'] : '',
                type: getType(),
                series_name: record.hasOwnProperty('series_name') ? record['series_name'] : '',
                price: 0
            }

            if (count >= 10) {
                if (isFolderItem()) {
                    alert.show(`You have reached the maximum amount of boxes allowed to be requested!`);
                } else {
                    alert.show(`You have reached the maximum amount of '${record['record_origin']}' items allowed to be requested!`);
                }
            } else {
                addItem(item, 1);
            }
        } else {
            removeItem(record['id'])
        }
    }

    return (
        <label className={style.Switch} htmlFor={name}>
            <input
                type="checkbox"
                id={name}
                name={name}
                checked={inCart}
                onChange={e => onChange(e.target.checked)}
            />
            <span className={`${style.Slider} ${style.Round}`}>
                <div className={style.Label}>
                    <div className={style.MinusButton} />
                    <div className={style.PlusButton} />
                </div>
            </span>
        </label>
    )
}

export default CartButton;
