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
                    Use the selector below to add materials to, or remove them from, your request list:
                </p>
                <p style={{textAlign: 'center'}}>
                    <CartButton
                        inCart={demoButtonChecked}
                        name={'demo'}
                        onCheckedChange={setDemoButtonChecked}
                    />
                </p>
                <p>
                    The catalog limits the number of materials you can add to your request list by record type.
                    A message will appear if you reach a selection limit. For the current limits on materials that
                    can be supplied for consultation at one time, see the
                    {' '}<a href="https://www.archivum.org/collections/help-with-your-research">Research Room rules</a>.
                    Materials are supplied in batches, and staff can advise you on requesting further materials
                    once you have finished with the previous batch.
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
                    <Image src="/icons/Cart.svg" alt="Request list" height={20} width={20}/>
                </p>
                <p>
                    Clicking the same icon takes you to the requests page. You can submit your request by entering your
                    registered email address, your virtual research card number, and your planned visit or access
                    date. You will be notified by email when the requested materials are ready for consultation.
                </p>
            </div>
            <div className={style.Title}>Access requested documents</div>
            <div className={style.Text}>
                <p>
                    There are two factors determining whether and how you can access requested documents:
                </p>
                <ul>
                    <li>Whether a digital copy is available or the materials must be consulted in their physical form.</li>
                    <li>The access conditions that apply to the materials.</li>
                </ul>
                <h2>Analog or Digital</h2>
                <p>
                    Blinken OSA Archivum aims to digitize the majority of its holdings in order to make it easier for
                    researchers to access them without having to visit the research room in person.
                </p>
                <h2>Digitization on Demand</h2>
                <p>
                    If you need a digital copy of materials that are not already available digitally, you can apply
                    through our <a href="https://www.archivum.org/collections/digitization-on-demand">Digitization on Demand service</a>.
                    Complete the request form linked on the service page and email it to
                    {' '}<a href="mailto:archivum@ceu.edu">archivum@ceu.edu</a>, including the reference codes or call
                    numbers of the materials you need. The service page explains the request limits, expected
                    processing times and any applicable fees.
                </p>
                <p>
                    If your request can be fulfilled, the digital copies will be shared through our Research Cloud.
                    See <a href="#accessing-digital-materials">Accessing digital materials</a> for instructions on
                    opening your shared folder and viewing the files.
                </p>
                <h2>Access rights</h2>
                <p>
                    Access conditions depend on the legal status of the materials and any restrictions set by the
                    donor. Unrestricted materials can be consulted in the Research Room or, where available, as
                    digital viewing copies.
                </p>
                <p>
                    Access to restricted materials requires approval by the Access Review Committee. When submitting
                    your request, provide the title and topic of your research and explain how you intend to use the
                    restricted materials. If approved, access is provided in the Research Room under the conditions
                    specified by staff. Where permitted, redacted digital copies may be provided.
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
                        in our Research Room.
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
                        Access to these materials requires approval by the Access Review Committee. If approved,
                        you can consult them in the Research Room under the conditions specified by staff.
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
                        Digital copies of these materials are available on request through our Research Cloud,
                        subject to the applicable access conditions. See
                        {' '}<a href="#accessing-digital-materials">Accessing digital materials</a> for instructions.
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
