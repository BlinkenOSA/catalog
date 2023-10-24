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
              First and foremost, to be able to request materials you will have to register
              yourself as a researcher filling out our <a href={'/register'}>registration form</a>. After you submit
              the form, the research room staff will check your data and approves your registration. When your
              registration is approved your virtual research card number will be sent to your mailbox. Please keep
              that number, because you will need it when you would like to request materials.
            </p>
          </div>
          <div className={style.Title}>Request materials</div>
          <div className={style.Text}>
            <p>
              You can request materials the same way as you are buying items from an online shop. With an icon like below:
            </p>
            <p style={{textAlign: 'center'}}>
              <CartButton
                inCart={demoButtonChecked}
                name={'demo'}
                onCheckedChange={setDemoButtonChecked}
              />
            </p>
            <p>
              You can add items to your request list or remove the ones already in it. The maximum amount of material is
              restricted by record types. You can only request a maximum of 10 containers (Archival boxes, VHS tapes, etc.), 10 library
              materials and 10 film library items in one request package.
            </p>
            <p style={{fontSize: '14px'}}>
              (Please be aware, that you can't add fonds, subfonds and series description records to the request list.)
            </p>
            <p>
              When you add materials to the request list, a small indicator will show the number of items in the basket
              on the top right corner of the screen. See the icon below:
            </p>
            <p style={{textAlign: 'center'}}>
              <Image src="/icons/Cart.svg" height={20} width={20} />
            </p>
            <p>
              The same icon let's you see the <a href={'/requests'}>requests page</a>. By entering the e-mail address,
              your virtual research card number and the date by when you would like the material to be prepared, you can send
              your request to our staff. You will get an email notification once your request is prepared and ready to be
              used.
            </p>
          </div>
          <div className={style.Title}>Access the requested materials</div>
          <div className={style.Text}>
            <p>
              There are two factors that determine how you will be able to access the requested materials:
            </p>
            <p>
              <ul>
                <li>If the material is already digitized or it's still in it's original analog form.</li>
                <li>The access rights rules.</li>
              </ul>
            </p>
            <h2>Analog or Digital</h2>
            <p>
              Blinken OSA Archivum aims to digitize the majority of their holdings allowing for researchers to access
              them easier, without the need to present personally in the research room.
            </p>
            <h2>Access rights</h2>
            <p>
              Based on their legal status or the permission of the donor materials in the catalog can be available with
              or without restriction. Non restricted materials are available for research purposes either personally or
              served digitally, restricted materials can be accessed only personally at the research room in
              Blinken OSA Archivum.
            </p>
            <h2>Access use cases</h2>
            <p>
              The following badges are helping you determine how certain materials can be accessed:
            </p>
            <div className={style.BadgeExplanation}>
              <div className={style.Badges}>
                <AvailabilityButton record={{record_origin: 'Library'}}/>
              </div>
              <p>
                These materials existing only in analog format, you can only access them personally in our research room.
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
                These materials existing only in analog format and their access rights is set to 'restricted', because
                of the nature of their content, or legal reasons. You may access them personally in our research room, but
                extra precautionary measures are required. The research room will help you assist in these.
              </p>
            </div>

            <div className={style.BadgeExplanation}>
              <div className={style.Badges}>
                <AvailabilityButton record={{record_origin: 'Archives', digital_version_exists: true, digital_version_barcode: 'HU_OSA_00000001'}}/>
              </div>
              <p>
                These materials available in analog form but they are also digitized. When you request these types of
                materials, they will be served as digital files through our Research Cloud.
              </p>
            </div>

            <div className={style.BadgeExplanation}>
              <div className={style.Badges}>
                <AvailabilityButton record={{record_origin: 'Archives', digital_version_exists: true, digital_version_online: true}}/>
              </div>
              <p>
                These materials available in analog form but they are also digitized and can be directly accessed in the
                catalog on the record's page in a digital viewer.
              </p>
            </div>
          </div>
        </React.Fragment>
    )
}

export default Request;