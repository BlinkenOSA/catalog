import React, {useState} from 'react';
import style from "./styles.module.scss"
import CartButton from "../../../cart/CartButton";
import Image from "next/image";


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

            </p>
            <h2>Access Rights</h2>
            <p>

            </p>
          </div>
        </React.Fragment>
    )
}

export default Request;