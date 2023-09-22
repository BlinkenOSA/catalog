import style from "./AccessRightsButton.module.scss"
import { HiOutlineBookOpen } from 'react-icons/hi'
import { BsShieldLock } from 'react-icons/bs'


const AccessRightsButton = ({ record }) => {
	if (record.hasOwnProperty('access_rights')) {
		return (
			<div className={record['access_rights'] === 'Restricted' ? `${style.Button} ${style.Restricted}` : style.Button}>
				{ record['access_rights'] === 'Restricted' ? <BsShieldLock /> : <HiOutlineBookOpen /> }
				<span className={style.Text}>
					{ record['access_rights'] === 'Restricted' ? 'Restricted' : 'Open Access' }
				</span>
			</div>
		)
	}
}

export default AccessRightsButton;
