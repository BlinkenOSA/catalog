import style from "./BackButton.module.scss";
import {AiOutlineLeft} from "react-icons/ai";
import React from "react";
import {useSessionStorage} from "react-use";
import {useRouter} from "next/router";

const BackButton = () => {
	const [storage, setStorage] = useSessionStorage('blinken-osa-catalog-searchpage', '');
	const router = useRouter()

	/**
	 * Get backlink to catalog from session storage
	 */
	const getBackLink = () => {
		return storage !== '' ? storage : '/'
	}

	const handleClick = () => {
		if (storage !== '/') {
			router.push(storage);
		} else {
			router.back()
		}
	}

	return (
		<div className={style.Navigation}>
			<a href={'#'} onClick={() => handleClick()}>
				<AiOutlineLeft /> <span>{storage !== '/' ? `Back to catalog search` : `Back`}</span>
			</a>
		</div>
	)
}

export default BackButton;