import React, {useState} from 'react';
import style from "./styles.module.scss"
import CartButton from "../../../cart/CartButton";
import Image from "next/image";
import AvailabilityButton from "../../search/results/parts/buttons/AvailabilityButton";
import AccessRightsButton from "../../search/parts/AccessRightsButton";


const Request = () => {
    const [demoButtonChecked, setDemoButtonChecked] = useState(false)

    return (
        <React.Fragment>
          <div className={style.Title}>Registration</div>
          <div className={style.Text}>
            <p>
              In order to request materials, you must first register as a researcher by completing our
              <a href={'/register'}>registration form</a>. Once you have submitted the form, the Research Room staff
              will check your details and approve your registration. If your registration is approved, your virtual
              research card number will be sent to your mailbox. Please keep this number as you will need it when
              requesting materials.
            </p>
          </div>
          <div className={style.Title}>Request materials</div>
          <div className={style.Text}>
            <p>
              You can request materials in the same way as you would buy items from an online shop.
              With an icon like the one below, you may add items to or remove items from your request list:
            </p>
            <p style={{textAlign: 'center'}}>
              <CartButton
                inCart={demoButtonChecked}
                name={'demo'}
                onCheckedChange={setDemoButtonChecked}
              />
            </p>
            <p>
              The maximum amount of material you can request is limited by record type. You can only request a
              maximum of 10 containers (archival boxes, VHS tapes, etc.), 10 library materials and 10 film library
              items in one request package.
            </p>
            <p style={{fontSize: '14px'}}>
              (Please note that fonds, subfonds, and series description records cannot be added to the request list.)
            </p>
            <p>
              When you add materials to the request list, a small indicator will show the number of items in the basket
              in the top right corner of the screen. See the icon below:
            </p>
            <p style={{textAlign: 'center'}}>
              <Image src="/icons/Cart.svg" height={20} width={20} />
            </p>
            <p>

              The same icon lets you see the <a href={'/requests'}>requests page</a>. By entering the email address,
              your virtual research card number and the date by which you would like the material to be prepared,
              you can send your request to our staff. You will get an email notification once your request is
              prepared and ready to be used.
            </p>
          </div>
          <div className={style.Title}>Access the requested materials</div>
          <div className={style.Text}>
            <p>
              There are two factors that determine how you will be able to access the materials you request:
            </p>
            <p>
              <ul>
                <li>Whether the material has already been digitised or whether it's still in its original analogue form.</li>
                <li>The rules on access rights.</li>
              </ul>
            </p>
            <h2>Analogue or Digital</h2>
            <p>
              Blinken OSA Archivum aims to digitise the majority of its holdings in order to make it easier for
              researchers to access them without having to visit the research room in person.
            </p>
            <h2>Access rights</h2>
            <p>
              Depending on their legal status or the donor's permission, materials in the catalogue may be available
              with or without restrictions. Non-restricted material is available for research purposes either
              in person or digitally, restricted material can only be accessed in person in the research room
              at Blinken OSA Archivum.
            </p>
            <h2>Access use cases</h2>
            <p>
              The following labels will help you to determine how certain materials can be accessed::
            </p>
            <div className={style.BadgeExplanation}>
              <div className={style.Badges}>
                <AvailabilityButton record={{record_origin: 'Library'}}/>
              </div>
              <p>
                These materials are only available in analogue form and can only be accessed in person
                in our research room..
              </p>
            </div>

            <div className={style.BadgeExplanation}>
              <div className={style.Badges}>

                <div style={{display: "flex", gap: '10px'}}>
                  <AvailabilityButton record={{record_origin: 'Library'}}/>
                  <AccessRightsButton record={{access_rights: 'Restricted'}}/>
                </div>
              </div>
              <p>
                to 'restricted' due to the nature of their content or for legal reasons. You can access them personally
                in our research room, but extra precautions are required. The research room will provide
                assistance in these cases.
              </p>
            </div>

            <div className={style.BadgeExplanation}>
              <div className={style.Badges}>
                <AvailabilityButton record={{record_origin: 'Archives', digital_version_exists: true, digital_version_barcode: 'HU_OSA_00000001'}}/>
              </div>
              <p>
                These materials are available in analogue form, but they are also digitised. If you request these
                types of materials, they will be provided as digital files via our Research Cloud.
              </p>
            </div>

            <div className={style.BadgeExplanation}>
              <div className={style.Badges}>
                <AvailabilityButton record={{record_origin: 'Archives', digital_version_exists: true, digital_version_online: true}}/>
              </div>
              <p>
                These materials are available in analogue form, but they are also digitised and can be accessed
                directly from the catalogue on the record page in a digital viewer.
              </p>
            </div>
          </div>
        </React.Fragment>
    )
}

export default Request;