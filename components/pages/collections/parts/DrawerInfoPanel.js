import style from "./DrawerInfoPanel.module.scss";
import Button from "../../search/parts/Button";
import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import ThemeFilter from "./ThemeFilter";

const DrawerInfoPanel = ({onClick, theme, onThemeSelect}) => {
    return (
        <div className={style.Info}>
            <div className={style.Header}>
                <div className={style.ActionButtons}>
                    <Button text={<><AiOutlinePlus/> Open All</>} onClick={() => onClick('openAll')} />
                    <Button text={<><AiOutlineMinus/> Close All</>} onClick={() => onClick('closeAll')} />
                </div>
                <div className={style.ThemeFilter}>
                    <ThemeFilter value={theme} onSelect={onThemeSelect} />
                </div>
            </div>
            <div className={style.InfoText}>
                <p>
                    Our traditional archival holdings comprise approximately 7,500 linear meters of records.
                    Based on their provenance as well as their focus, OSA holdings are divided into three main groups.
                </p>
                <h1>Communism, the Cold War, and their Afterlives</h1>
                <p>
                    Fonds include the extensive collection of the Radio
                    Free Europe/Radio Liberty (RFE/RL) Research Institute, background and reference material accumulated
                    over 45 years of activity. The collection is an essential source on the post-war political,
                    social, and economic history of the region. We also hold the personal papers of a range of
                    political, cultural, and counter-culture figures from the Cold War era to the present, and
                    several series of Soviet, Polish and Hungarian underground literature which constitute a major
                    international collection of samizdat materials.
                </p>
                <h1>Human Rights and Social Justice</h1>
                <p>
                    Includes fonds created by non-governmental and supra-governmental organizations,
                    as well as individuals active in post-war Central and Eastern Europe documenting human rights
                    violations and war crimes. Most important among these fonds are the UN Expert Commission on
                    Investigating War Crimes in the Former Yugoslavia, the International Helsinki Federation for
                    Human Rights (IHF), Index on Censorship, as well as the Physicians for Human Rights (PHR).
                </p>
                <h1>Central European University and the Open Society Foundations Network</h1>
                <p>
                    As the official archives of the Open Society
                    Foundations network and the CEU, OSA is responsible for the long-term preservation of and access
                    to network records. We also supply records management services to network entities and offices.
                </p>
            </div>
        </div>
    )
}

export default DrawerInfoPanel;