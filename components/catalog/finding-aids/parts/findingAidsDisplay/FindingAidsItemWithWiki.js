import React, {useState} from "react";
import style from "../../FindingAidsItem.module.scss";

const FindingAidsItemWithWiki = ({record, language, fieldName, fields=[], display='sameRow', group, label, isMobile=false}) => {
	const [wikiInfoOpen, setWikiInfoOpen] = useState(false)
	const [selectedValue, setSelectedValue] = useState(undefined);
	const data = [];

	const fieldConfig = {
		'associated_country': 'country',
		'associated_place': 'place',
		'subject_person': 'name',
		'subject_corporation': 'name'
	}

	fields.forEach((field) => {
		record[field].forEach(rf => {
			data.push(rf)
		})
	})

	const displayField = (dataArray) => {
		if (isMobile) {
			return (
				<div key={fieldName} className={`${style.Row} ${style.Mobile}`}>
					<div className={style.Category}>{group.hasOwnProperty(language) ? group[language] : group['EN']}</div>
					<div className={style.ValueWrapper}>
						<div className={style.Label}>{label.hasOwnProperty(language) ? label[language] : label['EN']}</div>
						<div className={style.Value}>
							{renderValue(dataArray)}
						</div>
					</div>
				</div>
			)
		} else {
			return (
				<div key={fieldName} className={style.Row}>
					<div className={style.Category}>{group.hasOwnProperty(language) ? group[language] : group['EN']}</div>
					<div className={style.Label}>{label.hasOwnProperty(language) ? label[language] : label['EN']}</div>
					<div className={style.Value}>
						{renderValue(dataArray)}
					</div>
				</div>
			)
		}
	}

	const toggleSelectedValue = (wikidata_id) => {
		selectedValue ? setSelectedValue(undefined) : setSelectedValue(wikidata_id)
	}

	const renderValue = (dataArray) => (
		dataArray.flat().map(d => {

			// Same row display
			if (display === 'sameRow') {
				if (d['wikidata_id'] !== 'null') {
					return (
						<React.Fragment>
							<span
								className={selectedValue === d['wikidata_id'] ? style.WikiValueActive : style.WikiValue}
								onClick={() => toggleSelectedValue(d['wikidata_id'])}>{d['value']}</span>
							<span className={style.Comma}>, </span>
						</React.Fragment>
					)
				} else {
					return (
						<React.Fragment>
							<span>{d['value']}</span>
							<span className={style.Comma}>, </span>
						</React.Fragment>
					)
				}

			// New row
			} else {
				if (d['wikidata_id'] !== 'null') {
					return <div>{d['value']} ({d['wikidata_id']})</div>
				} else {
					return <div>{d['value']}</div>
				}
			}}
		))


	const dataArray = data.map(d => {
		const values = []
		Object.keys(fieldConfig).forEach(fcKey => {
			if (d.hasOwnProperty(fcKey)) {
				if (d['role'] && d['role'] !== null) {
					values.push({
						value: `${d[fcKey][fieldConfig[fcKey]]} (${d['role']})`,
					  wikidata_id: `${d[fcKey]['wikidata_id']}`
					})
				} else {
					values.push({
						value: `${d[fcKey][fieldConfig[fcKey]]}`,
						wikidata_id: `${d[fcKey]['wikidata_id']}`
					})
				}
			} else {
				if (d.hasOwnProperty(fieldConfig[fcKey])) {
					values.push({
						value: `${d[fieldConfig[fcKey]]}`,
						wikidata_id: `${d['wikidata_id']}`
					})
				}
			}
		})
		return values
	})

	return dataArray.length > 0 && displayField(dataArray)
}

export default FindingAidsItemWithWiki