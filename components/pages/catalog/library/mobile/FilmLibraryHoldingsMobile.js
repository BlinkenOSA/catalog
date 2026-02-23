import style from "./LibraryHoldingsMobile.module.scss";
import {getValues} from "../../../../../utils/marcFunctions";
import React, {useState} from "react";
import {Collapse} from "react-collapse";
import Button from "../../../search/parts/Button";
import {ITEM_TYPES, SHELVING} from "../config/fieldCodeConfigs";

const FilmLibraryHoldingsMobile = ({record, type}) => {
    const subfields = ['y', 'b', 'p', 'o', 'h', 'c', 'z']
    const [selectedHolding, setSelectedHolding] = useState(0);
    let values = [];

    values = values.concat(getValues(record, "952", subfields))

    const getValueFromConfig = (value, config) => {
        return config.hasOwnProperty(value) ? config[value] : value
    }

    const getButtonText = (value) => {
        if (type === 'library') {
            return `${getValueFromConfig(value[0], ITEM_TYPES)} - ${value[3]}`
        } else {
            return `${getValueFromConfig(value[0], ITEM_TYPES)}`
        }
    }

    const cleanBarcode = (barcode) => {
        const extensions = ['.mp3', '.mp4', '.wav', '.avi']
        if (extensions.some(ext => barcode.endsWith(ext))) {
            return barcode.slice(0, -4);
        }
        return barcode
    }


    return (
        <div className={style.Row}>
            <div className={style.Category}>Holdings</div>
            {
                values.map((value, index) => (
                    <div key={index} className={style.Holdings}>
                        <div className={style.Button}>
                            <Button
                                text={getButtonText(value)}
                                onClick={() => setSelectedHolding(index === selectedHolding ? 99 : index)}
                            />
                        </div>
                        <Collapse isOpened={index === selectedHolding}>
                            <div className={style.ValueWrapper}>
                                <div className={style.Label}>Item Type</div>
                                <div className={style.Value}>{getValueFromConfig(value[0], ITEM_TYPES)}</div>
                            </div>
                            <div className={style.ValueWrapper}>
                                <div className={style.Label}>Call Number</div>
                                <div className={style.Value}>{value[3]}</div>
                            </div>
                            <div className={style.ValueWrapper}>
                                <div className={style.Label}>Barcode</div>
                                <div className={style.Value}>{cleanBarcode(value[2])}</div>
                            </div>
                            <div className={style.ValueWrapper}>
                                <div className={style.Label}>Shelving Location</div>
                                <div className={style.Value}>{getValueFromConfig(value[5], SHELVING)}</div>
                            </div>
                            <div className={style.ValueWrapper}>
                                <div className={style.Label}>Public Note</div>
                                <div className={style.Value}>{value[6]}</div>
                            </div>
                        </Collapse>
                    </div>
                ))
            }
        </div>
    )
};

export default FilmLibraryHoldingsMobile;
