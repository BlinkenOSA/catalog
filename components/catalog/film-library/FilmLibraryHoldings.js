import style from "./FilmLibraryHoldings.module.scss";
import {getValues} from "../../../utils/marcFunctions";

const ITEM_TYPES = {

}

const BRANCHES = {
    'OSA': 'OSA Archivum Library',
    'OFF': 'OSA Archivum Off-Site Storage',
    'FL': 'OSA Film Library'
}

const COLLECTIONS = {
    'FL': 'OSA Film Library',
}

const SHELVING = {
    'AV': 'Audio Visual',
    'GEN': 'General Stacks',
    'REP': 'Repository',
    'REF': 'Reference',
    'STAFF': 'Staff Office'
}

const FilmLibraryHoldings = ({record}) => {
    const subfields = ['y', 'b', '8', 'o', 'h', 'c', 'z']
    let values = [];

    values = values.concat(getValues(record, "952", subfields))

    const getValueFromConfig = (value, config) => {
        return config.hasOwnProperty(value) ? config[value] : '-'
    }

    return (
        <div className={style.Row}>
            <div className={style.Category}>Holdings</div>
            <div className={style.Table}>
                <table>
                    <thead>
                        <tr>
                            <th>Item Type</th>
                            <th>Current Location</th>
                            <th>Collection</th>
                            <th>Call Number</th>
                            <th>Volume Info</th>
                            <th>Shelving Location</th>
                            <th>Public Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            values.map((value, index) => (
                                <tr key={index}>
                                    <td>{getValueFromConfig(value[0], ITEM_TYPES)}</td>
                                    <td>{getValueFromConfig(value[1], BRANCHES)}</td>
                                    <td>{getValueFromConfig(value[2], COLLECTIONS)}</td>
                                    <td>{value[3]}</td>
                                    <td>{value[4]}</td>
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
