import style from "../../../pages/pages.module.scss";
import React from "react";
import Button from "../search/parts/Button";

const DigitalRepositoryPage = ({id}) => {
	return (
		<div>
			<div className={style.PageTitle}>
				<h1>Digital Repository Record</h1>
			</div>
			<div className={style.StaticContent}>
				<div>
					<div className={style.Placeholder}>
						<h2 className={style.PlaceholderText}>Digital Content</h2>
					</div>
					<p className={style.PlaceholderParagraph}>
						This is a digital repository record which is currently being migrated to the new catalog in the forthcoming weeks.
						We are sorry for any inconvenience.
					</p>
					<p className={style.PlaceholderParagraph}>
						To see the requested digital item in the old catalog, click the button below:
					</p>
					<div className={style.Button}>
						<Button
							text={'Open record in the legacy catalog'}
							link={`https://catalog-legacy.osaarchiuvm.org/catalog/${id}`} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default DigitalRepositoryPage;