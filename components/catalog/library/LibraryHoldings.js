import style from "./LibraryHoldings.module.scss";
import {getValues} from "../../../utils/marcFunctions";

const ITEM_TYPES = {
    'BK': 'Book',
    'CR': 'Continuing Resource'
}

const BRANCHES = {
    'OSA': 'OSA Archivum Library',
    'OFF': 'OSA Archivum Off-Site Storage',
    'FL': 'OSA Film Library'
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

const LibraryHoldings = ({record}) => {
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

export default LibraryHoldings;
