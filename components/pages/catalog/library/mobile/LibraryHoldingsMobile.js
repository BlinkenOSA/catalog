
import style from "./LibraryHoldingsMobile.module.scss";
import {getValues} from "../../../../../utils/marcFunctions";
import React, {useState} from "react";
import {Collapse} from "react-collapse";
import Button from "../../../search/parts/Button";

const ITEM_TYPES = {
    'BK': 'Book',
    'CR': 'Continuing Resource',
    'VHS': 'VHS',
    'DVD-ROM': 'DVD',
    'BLU-RAY': 'Blu-Ray Disc',
    'CD-ROM': 'CD-ROM',
    'DIGIFILM': 'Digital Film',
    'HDD': 'HDD'
}

const BRANCHES = {
    'OSA': 'OSA Archivum Library',
    'OFF': 'OSA Archivum Off-Site Storage',
    'FL': 'OSA Film Library',
}

const COLLECTIONS = {
    'ARC': 'Archival, library and information sciences collection',
    'FL': 'OSA Film Library',
    'GEN': 'General collection',
    'HR': 'Human Rights (IHF) Collection',
    'INF': 'HU OSA 300-85-19 Informal Press',
    'REF': 'Reference collection',
    'REG': 'HU OSA 300-85-18 Regional Press',
    'SAM': 'Samizdat and Émigré Publications',
    'SOR': 'Hungarian Numbered Books',
    'Text': 'Hungarian Numbered Books'
}

const SHELVING = {
    'AV': 'Audio Visual',
    'GEN': 'General Stacks',
    'REP': 'Repository',
    'REF': 'Reference',
    'STAFF': 'Staff Office',
    'Albanian Periodicals': 'Albanian Periodicals',
    'BulPer': 'Bulgarian Periodicals',
    'PolPer': 'Polish Periodicals',
    'RomPer': 'Romanian Periodicals'
}

const LibraryHoldingsMobile = ({record, type}) => {
    const subfields = ['y', 'b', '8', 'o', 'h', 'c', 'z']
    let values = [];

    const [selectedHolding, setSelectedHolding] = useState(0);

    values = values.concat(getValues(record, "952", subfields))

    const getValueFromConfig = (value, config) => {
        return config.hasOwnProperty(value) ? config[value] : '-'
    }

    const getButtonText = (value) => {
        if (type === 'library') {
            return `${getValueFromConfig(value[0], ITEM_TYPES)} - ${value[3]}`
        } else {
            return `${getValueFromConfig(value[0], ITEM_TYPES)}`
        }
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
                                <div className={style.Label}>Current Location</div>
                                <div className={style.Value}>{getValueFromConfig(value[1], BRANCHES)}</div>
                            </div>
                            <div className={style.ValueWrapper}>
                                <div className={style.Label}>Current Location</div>
                                <div className={style.Value}>{getValueFromConfig(value[1], BRANCHES)}</div>
                            </div>
                            <div className={style.ValueWrapper}>
                                <div className={style.Label}>Call Number</div>
                                <div className={style.Value}>{value[3]}</div>
                            </div>
                            <div className={style.ValueWrapper}>
                                <div className={style.Label}>Volume Info</div>
                                <div className={style.Value}>{value[4]}</div>
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

export default LibraryHoldingsMobile;
