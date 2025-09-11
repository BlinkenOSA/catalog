import {CookieConsent} from "react-cookie-consent";
import style from "./Consent.module.scss";
import { getCookieConsentValue } from "react-cookie-consent";
import { GoogleAnalytics } from '@next/third-parties/google'
import {useState} from "react";
import Link from "next/link";

const Consent = () => {
	const [consentAccepted, setConsentAccepted] = useState(getCookieConsentValue('BlinkenOSACatalogCookieConsent'))

	return (
		<>
			{
				consentAccepted === 'true' && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
			}
			<CookieConsent
				enableDeclineButton
				flipButtons={true}
				cookieName={'BlinkenOSACookieConsent'}
				buttonText={'Accept'}
				containerClasses={style.Container}
				buttonWrapperClasses={style.ButtonWrapper}
				buttonClasses={style.AcceptButton}
				declineButtonClasses={style.DeclineButton}
				declineButtonText={'Decline'}
				onAccept={() => setConsentAccepted('true')}
				onDecline={() => setConsentAccepted('false')}
			>
				<div className={style.ConsentText}>
					We use cookies to improve your experience on our site. For more info,
					check this <a href={'https://archivum.org/about-us/privacy-policy'} target={'_new'}>page</a>.
				</div>
			</CookieConsent>
		</>
	)
}

export default Consent;