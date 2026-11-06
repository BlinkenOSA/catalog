import React from 'react';
import Image from "next/image";
import style from "./styles.module.scss";

const DigitalMaterials = () => {
    return (
        <React.Fragment>
            <h2 className={style.Title}>Accessing digital materials</h2>
            <div className={style.Text}>
                <p>
                    Digital materials that cannot be viewed directly in the catalog are shared through our
                    Research Cloud, which uses Microsoft 365 SharePoint. This includes materials marked as
                    ‘Available digitally’ and digital copies prepared in response to a Digitization on Demand request.
                </p>
                <p>
                    All materials shared through the Research Cloud are available for viewing only. They cannot
                    be downloaded.
                </p>
            </div>
            <h2 className={style.Title}>Receiving your materials</h2>
            <div className={style.Text}>
                <p>
                    Once your requested digital materials are ready, they are placed in a SharePoint folder under
                    your registered name. The folder is automatically shared with the email address you used to
                    register with Blinken OSA Archivum. A notification containing a link to the folder is sent
                    automatically to the same address.
                </p>
            </div>
            <h2 className={style.Title}>Signing in for the first time</h2>
            <div className={style.Text}>
                <p>
                    On your first visit, follow the prompts to accept guest access to Central European University’s
                    (CEU) Microsoft 365 environment and sign in using your registered email address. Blinken OSA
                    Archivum is part of CEU and uses this environment to share materials. If you have already
                    accepted guest access and are signed in, you may be taken directly to your folder.
                </p>
                <p>
                    The example below shows first-time access with a Gmail address. The screens and sign-in prompts
                    may vary depending on your email provider, account settings and whether you are already signed in.
                </p>
                <ol className={style.AccessSteps}>
                    <li>
                        <h3>Validate the sharing link</h3>
                        <p>
                            Open the link in the notification email. If the ‘Sharing Link Validation’ screen
                            appears, click <strong>Next</strong>.
                        </p>
                        <figure className={style.AccessScreenshot} style={{maxWidth: 356}}>
                            <Image
                                src="/images/researchers-guide/01-Example-Gmail.jpeg"
                                alt="Sharing Link Validation screen with a Next button."
                                width={356}
                                height={328}
                                layout="responsive"
                            />
                        </figure>
                    </li>
                    <li>
                        <h3>Sign in with your registered email address</h3>
                        <p>
                            On the CEU sign-in page, enter the email address you used to register with Blinken
                            OSA Archivum, then click <strong>Next</strong>. This must be the same address that
                            received the notification email.
                        </p>
                        <figure className={style.AccessScreenshot} style={{maxWidth: 793}}>
                            <Image
                                src="/images/researchers-guide/02-Sign-In.jpeg"
                                alt="CEU sign-in page with an email address field and a Next button."
                                width={793}
                                height={445}
                                layout="responsive"
                            />
                        </figure>
                    </li>
                    <li>
                        <h3>Continue with Google</h3>
                        <p>
                            In this Gmail example, Google asks you to allow microsoftonline.com to access your
                            email address. If this screen appears, review the information and click
                            {' '}<strong>Continue</strong> to proceed.
                        </p>
                        <figure className={style.AccessScreenshot} style={{maxWidth: 1078}}>
                            <Image
                                src="/images/researchers-guide/03-Accept.jpeg"
                                alt="Google sign-in screen explaining that microsoftonline.com will receive your email address, with a Continue button."
                                width={1078}
                                height={564}
                                layout="responsive"
                            />
                        </figure>
                    </li>
                    <li>
                        <h3>Accept the CEU permissions</h3>
                        <p>
                            Review the permissions requested by Central European University and click
                            {' '}<strong>Accept</strong>. This allows CEU’s Microsoft 365 environment to receive
                            your profile data, including your email address, and to collect, log and use your
                            activity on the Research Cloud.
                        </p>
                        <p>
                            We use this information to check whether you have been able to open the shared
                            materials and to manage their removal when your request period ends.
                        </p>
                        <figure className={style.AccessScreenshot} style={{maxWidth: 796}}>
                            <Image
                                src="/images/researchers-guide/04-Grant.jpeg"
                                alt="CEU permissions screen listing access to profile data and activity logging, with an Accept button."
                                width={796}
                                height={586}
                                layout="responsive"
                            />
                        </figure>
                    </li>
                </ol>
            </div>
            <h2 className={style.Title}>Viewing your materials</h2>
            <div className={style.Text}>
                <p>
                    After signing in, you should see the contents of your shared folder. Click a file to view it.
                    Audio and video files open in Microsoft Stream, Microsoft’s built-in media player. Textual
                    materials open in the built-in document viewers.
                </p>
            </div>
            <h2 className={style.Title}>Problems signing in</h2>
            <div className={style.Text}>
                <p>
                    If the sharing notification has not arrived, check your spam or junk folder and make sure you
                    are checking the email account you used to register with Blinken OSA Archivum.
                </p>
                <p>
                    If your email address belongs to another institution’s Microsoft 365 account and you have
                    difficulty opening your folder, try signing out of that account first. You can also open
                    the sharing link in an Incognito window in Chrome or a Private Browsing window in Safari
                    or Firefox to avoid conflicts with an existing sign-in session. Use your registered email
                    address when signing in to the Research Cloud.
                </p>
                <p>
                    If you still cannot open your folder or view the files, contact Research Room staff at
                    {' '}<a href="mailto:archivum@ceu.edu">archivum@ceu.edu</a>. Include the reference codes or call
                    numbers of the requested materials and a brief description of the problem or error message.
                </p>
            </div>
            <h2 className={style.Title}>Access period</h2>
            <div className={style.Text}>
                <p>
                    Access to shared digital materials is usually granted for 30 days. If you need more time,
                    contact Research Room staff at <a href="mailto:archivum@ceu.edu">archivum@ceu.edu</a> to request
                    an extension. You can also contact staff to confirm when your access ends.
                </p>
            </div>
        </React.Fragment>
    )
}

export default DigitalMaterials;
