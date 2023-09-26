import style from "./AccessRightsButton.module.scss"
import { HiOutlineBookOpen } from 'react-icons/hi'
import { BsShieldLock } from 'react-icons/bs'


const AccessRightsButton = ({ record }) => {
	if (record.hasOwnProperty('access_rights')) {
		if (record['access_rights'] === 'Restricted') {
			return (
				<div className={`${style.Button} ${style.Restricted}`}>
					<BsShieldLock />
					<span className={style.Text}>Restricted</span>
				</div>
			)
		} else {
			return ''
		}
	}
}

export default AccessRightsButton;
