import React, {useState} from 'react';
import style from "./styles.module.scss"
import CartButton from "../../../cart/CartButton";
import Image from "next/image";
import AvailabilityButton from "../../search/results/parts/buttons/AvailabilityButton";
import AccessRightsButton from "../../search/parts/AccessRightsButton";


const Request = ({isMobile}) => {
    const [demoButtonChecked, setDemoButtonChecked] = useState(false)

    return (
        <React.Fragment>
            <div className={style.Title}>Registration</div>
            <div className={style.Text}>
                <p>
                    To request materials, you must first register as a researcher by completing our <a href={'/registration'}>registration form</a>. Once you have submitted the form, the Research Room
                    staff will check your details and approve your registration. If your registration is approved, your
                    virtual research card number will be sent to your mailbox. Please keep this number as you will need
                    it when requesting materials.
                </p>
            </div>
            <div className={style.Title}>Request documents</div>
            <div className={style.Text}>
                <p>
                    You can request documents in the same way as you would buy items from an online store. With the
                    slider iconbelow you can add items to, or remove items from, your request list:
                </p>
                <p style={{textAlign: 'center'}}>
                    <CartButton
                        inCart={demoButtonChecked}
                        name={'demo'}
                        onCheckedChange={setDemoButtonChecked}
                    />
                </p>
                <p>
                    The maximum amount of material you can request is limited by record type. You can request a maximum
                    of 10 containers (archival boxes, VHS tapes, etc.), 10 library materials and 10 film library items
                    in one request package.
                </p>
                <p style={{fontSize: '14px'}}>
                    (Please note that fonds, subfonds, and series descriptions cannot be added to the request list.)
                </p>
                <p>
                    When you add materials to your request list, a small indicator will show the number of items already
                    in your basket in the top right corner of the screen. See the number(s) shown next to the icon
                    below:
                </p>
                <p style={{textAlign: 'center'}}>
                    <Image src="/icons/Cart.svg" height={20} width={20}/>
                </p>
                <p>
                    Clicking the same icon takes you to the requests page. You can submit your request by entering your
                    email address, your virtual research card number, and the date by which you would like the material
                    to be prepared. You will be notified by email as soon as your request is processed and the requested
                    documents can be accessed.
                </p>
            </div>
            <div className={style.Title}>Access requested documents</div>
            <div className={style.Text}>
                <p>
                    There are two factors determining whether and how you can access requested documents:
                </p>
                <p>
                    <ul>
                        <li>Whether the documents have already been digitized, or whether they are still in their
                            original analogue format.
                        </li>
                        <li>The rules on access rights.</li>
                    </ul>
                </p>
                <h2>Analog or Digital</h2>
                <p>
                    Blinken OSA Archivum aims to digitize the majority of its holdings in order to make it easier for
                    researchers to access them without having to visit the research room in person.
                </p>
                <h2>Access rights</h2>
                <p>
                    Depending on their legal status or the donor's permission, documents may be available with or
                    without restrictions. Non-restricted documents are available for research purposes either in person
                    or digitally.
                    Restricted documents can be accessed in person in the research room at Blinken OSA Archivum. Where
                    possible, we provide sanitized copies of restricted documents digitally.
                </p>
                <h2>Access use cases</h2>
                <p>
                    The following labels will help you to determine how certain materials can be accessed:
                </p>
                <div className={isMobile ? `${style.BadgeExplanation} ${style.Mobile}` : style.BadgeExplanation}>
                    <div className={style.Badges}>
                        <AvailabilityButton record={{record_origin: 'Library'}}/>
                    </div>
                    <p>
                        These materials are only available in analog form and can only be accessed in person
                        in our research room..
                    </p>
                </div>

                <div className={isMobile ? `${style.BadgeExplanation} ${style.Mobile}` : style.BadgeExplanation}>
                    <div className={style.Badges}>
                        <div style={{display: "flex", gap: '10px'}}>
                            <AvailabilityButton record={{record_origin: 'Library'}}/>
                            <AccessRightsButton record={{access_rights: 'Restricted'}}/>
                        </div>
                    </div>
                    <p>
                        Access to these documents is restricted due to their content or for legal reasons. You can
                        access them personally in our research room once certain conditions are met. Research room staff
                        will provide assistance in these cases
                    </p>
                </div>

                <div className={isMobile ? `${style.BadgeExplanation} ${style.Mobile}` : style.BadgeExplanation}>
                    <div className={style.Badges}>
                        <AvailabilityButton record={{
                            record_origin: 'Archives',
                            digital_version_exists: true,
                            digital_version_barcode: 'HU_OSA_00000001'
                        }}/>
                    </div>
                    <p>
                        These materials are available in analog form, but they are also digitized. If you request these
                        types of documents, you will be able to
                        access them as digital files via our Research Cloud
                    </p>
                </div>

                <div className={isMobile ? `${style.BadgeExplanation} ${style.Mobile}` : style.BadgeExplanation}>
                    <div className={style.Badges}>
                        <AvailabilityButton record={{
                            record_origin: 'Archives',
                            digital_version_exists: true,
                            digital_version_online: true
                        }}/>
                    </div>
                    <p>
                        These materials are available in analog form, but they are also digitized and can be accessed
                        directly from the catalog in a digital viewer.
                    </p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Request;