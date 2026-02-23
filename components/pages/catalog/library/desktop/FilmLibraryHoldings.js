import style from "./LibraryHoldings.module.scss";
import {getValues} from "../../../../../utils/marcFunctions";
import {BRANCHES, COLLECTIONS, ITEM_TYPES, SHELVING} from "../config/fieldCodeConfigs";


const FilmLibraryHoldings = ({record}) => {
    const subfields = ['y', 'b', 'p', 'o', 'h', 'c', 'z']
    let values = [];

    values = values.concat(getValues(record, "952", subfields))

    const getValueFromConfig = (value, config) => {
        return config.hasOwnProperty(value) ? config[value] : value
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
            <div className={style.Table}>
                <table>
                    <thead>
                        <tr>
                            <th>Item Type</th>
                            <th>Call Number</th>
                            <th>Barcode</th>
                            <th>Shelving Location</th>
                            <th>Public Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            values.map((value, index) => (
                                <tr key={index}>
                                    <td>{getValueFromConfig(value[0], ITEM_TYPES)}</td>
                                    <td>{value[3]}</td>
                                    <td>{cleanBarcode(value[2])}</td>
                                    <td>{getValueFromConfig(value[5], SHELVING)}</td>
                                    <td>{value[6]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default FilmLibraryHoldings;
