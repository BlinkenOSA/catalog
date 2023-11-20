import style from "./DrawerInfoPanel.module.scss";
import Button from "../../search/parts/Button";
import {Collapse} from "react-collapse";

const DrawerInfoPanel = ({theme, onThemeSelect}) => {
    return (
        <div className={style.Info}>
            <div className={style.Header}>
                <div className={style.ActionButtons}>
                    <Button active={theme === 0} text={'All'} onClick={() => onThemeSelect(0)} />
                    <Button active={theme === 1} text={'Communism and Cold War'} onClick={() => onThemeSelect(1)} />
                    <Button active={theme === 2} text={'Human Rights and Social Justice'} onClick={() => onThemeSelect(2)} />
                    <Button active={theme === 3} text={'CEU and Open Society Network'} onClick={() => onThemeSelect(3)} />
                </div>
            </div>
            <div className={style.InfoText}>
                <p>
                    The Archivum’s catalog offers integrated search in cross-referenced archival, library and film
                    library records. Where available, digital content is presented along rich contextual descriptions.
                    While the primary language of the catalog is English, some of the collections are described in
                    their original language, including in Hungarian, Russian, Polish and Italian.
                </p>
                <p>
                    The Archivum’s textual and audiovisual materials come in analog and digital format and in 40+
                    languages. Altogether they comprise 10,000 linear meters, 17,000 hours of audiovisual, and 15
                    TB of digital records, as well as 150,000 photographs, 6000+ documentary film titles and 19,000
                    library items on three main themes, see above.
                </p>
                <Collapse isOpened={theme === 0 || theme === 1}>
                    <h1>Communism, the Cold War, and their Afterlives</h1>
                    <p>
                    The largest collection on this topic is that of the Radio Free Europe/Radio Liberty (RFE/RL)
                    Research Institute and its successor, the Open Media Research Institute, consisting of background
                    and reference materials accumulated over 45 years of activity. It is an essential source on the
                    post-WWII political, social, economic, and cultural history of the Central and Southeast
                    European region, including, among others, Radio Liberty broadcasts, Soviet television monitoring
                    and unique Soviet, Polish and Hungarian samizdat materials.
                    </p>
                    <p>
                    Special collections comprise Soviet propaganda films; live recordings and documentary films of
                    the Hungarian Black Box Video Journal; copies of state security and secret police documents;
                    propaganda and educational films of the communist Hungarian Ministry of the Interior and the
                    Workers’ Militia; video interviews relating to Chernobyl; and the archive of the journal Budapest
                    Week.
                    </p>
                    <p>
                    Individual donations or deposits include those made by the filmmakers Pál Schiffer and
                    Péter Forgács, the former democratic opposition member and mayor of Budapest Gábor Demszky,
                    the freedom fighter General Béla Király, the sociologist István Kemény, the photographers
                    Rodolf Hervé, Lajos Erdélyi and Éva Kapitány, and the philanthropist and diplomat couple
                    Vera and Donald Blinken.
                    </p>
                </Collapse>
                <Collapse isOpened={theme === 0 || theme === 2}>
                    <h1>Human Rights and Social Justice</h1>
                    <p>
                        Collections comprise records from international and local agencies and non-governmental
                        organizations, as well as individuals active in documenting the history of human rights
                        movements and violations worldwide, including but not limited to genocide, war crimes, torture,
                        rape and crimes against humanity, as well as of the rights and representation of marginalized,
                        disadvantaged groups, such as refugees, the Roma, and other ethnic minorities, the LGBTQI+
                        community or people with disabilities.
                    </p>
                    <p>
                        Most important among these record groups are those of the UN Expert Commission on Investigating
                        War Crimes in the Former Yugoslavia, International Helsinki Federation for Human Rights,
                        Index on Censorship, Physicians for Human Rights, American Refugee Committee’s Balkan
                        Programs, Human Rights Watch, Hungarian Roma Parliament Association, and International
                        Federation of Persons with Physical Disability.
                    </p>
                    <p>
                        The Archivum’s Yugoslavia related collections contain substantial source materials on the
                        communist past, violent dissolution and turbulent afterlife of the region, including video
                        recordings of human rights abuses collected by the International Monitor Institute, research
                        materials of the journalist David Rohde, home movies from Srebrenica recorded by a local
                        cameraman before and after the enclave’s fall, and postwar monitoring of newscasts and
                        political programs from televisions in Bosnia, Croatia and Serbia.
                    </p>
                </Collapse>
                <Collapse isOpened={theme === 0 || theme === 3}>
                    <h1>Central European University (CEU) and the Open Society Foundations (OSF) Network</h1>
                    <p>
                        The Archivum, the official repository and historical archives of the Central European
                        University (CEU) in Budapest and Vienna, as well as of the Open Society Foundations (OSF)
                        network globally, is responsible for the long-term preservation of the permanent records
                        of these entities.
                    </p>
                    <p>
                        The records of CEU include documents related to the foundation and activities of this unique
                        research university, established initially and primarily to offer quality English language
                        higher education to and foster dialogue between students coming from emerging democracies
                        in Central and Southeastern Europe, as well as the former Soviet Union. Beyond recordings
                        of academic programs and public events, CEU collections include personal papers of some of
                        its founders and professors, such as that of the philosopher of science Bill Newton-Smith.
                    </p>
                    <p>
                        The OSF records reflect the philanthropic activities of the foundations in the domain of
                        public education and health, culture, arts and sciences, transparent governance, disabilities,
                        human rights, environment, poverty, and ethnic minorities. They comprise the archives of the
                        Soros Foundation Hungary, the first entity of the network, the documentary film collection of
                        the Soros Documentary Fund or OSF’s Sarajevo Programs’ records. These latter include text and
                        video materials on humanitarian, educational and cultural aid, on exchange and science projects
                        initiated and managed for population of the city under siege during the recent Yugoslav Wars.
                    </p>
                </Collapse>
            </div>
        </div>
    )
}

export default DrawerInfoPanel;