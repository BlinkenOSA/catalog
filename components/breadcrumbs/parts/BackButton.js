import style from "./BackButton.module.scss";
import {AiOutlineLeft} from "react-icons/ai";
import React from "react";
import {useSessionStorage} from "react-use";

const BackButton = () => {
	const [storage, setStorage] = useSessionStorage('blinken-osa-catalog-searchpage', '');

	/**
	 * Get backlink to catalog from session storage
	 */
	const getBackLink = () => {
		return storage !== '' ? storage : '/'
	}

	return (
		<div className={style.Navigation}>
			<a href={getBackLink()}>
				<AiOutlineLeft /> <span>Back to Catalog</span>
			</a>
		</div>
	)
}

export default BackButton;