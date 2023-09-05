import React, {useEffect, useState} from "react";
import style from "../../FindingAidsItem.module.scss";
import Collapse from "react-collapse";
import dynamic from "next/dynamic";

const FindingAidsItemWikiInfo = dynamic(() => import('./FindingAidsItemWikiInfo'), {
	ssr: false,
});

const FindingAidsItemWithWiki = ({record, language, fieldName, fields=[], display='sameRow', group, label, isMobile=false}) => {
	const [wikiInfoOpen, setWikiInfoOpen] = useState(false)
	const [selectedWikidata, setSelectedWikidata] = useState(undefined);
	const [data, setData] = useState([])
	const [dataArray, setDataArray] = useState([])

	const fieldConfig = {
		'associated_country': 'country',
		'associated_place': 'place',
		'associated_person': 'name',
		'associated_corporation': 'name',
		'subject_person': 'name',
		'subject_corporation': 'name',
		'spatial_coverage_country': 'country',
		'spatial_coverage_place': 'place'
	}

	const withoutMainKey = [
		'subject_person', 'subject_corporation', 'spatial_coverage_country', 'spatial_coverage_place'
	]

	useEffect(() => {
		const d = [];
		fields.forEach((field) => {
			record[field].forEach(rf => {
				withoutMainKey.includes(field) ? d.push({[field]: rf}) : d.push(rf)
			})
		})
		setData(d)
	}, [])

	useEffect(() => {
		const values = [];

		data.forEach(d => {
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
				}
			})
		})
		setDataArray(values)
	}, [data])

	useEffect(() => {
		//console.log(dataArray)
	}, [dataArray])

	const getWikiType = () => {
		switch (fieldName) {
			case 'added_geo_locations':
				return 'geo'
			case 'spatial_coverage':
				return 'geo'
			case 'subjects':
				return 'subject'
			case 'contributors':
				return 'contributor'
		}
	}

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
					<Collapse open={wikiInfoOpen}>
						<FindingAidsItemWikiInfo wikidata_id={selectedWikidata} type={getWikiType()}/>
					</Collapse>
				</div>
			)
		} else {
			return (
				<React.Fragment>
					<div key={fieldName} className={style.Row}>
						<div className={style.Category}>{group.hasOwnProperty(language) ? group[language] : group['EN']}</div>
						<div className={style.Label}>{label.hasOwnProperty(language) ? label[language] : label['EN']}</div>
						<div className={style.Value}>
							{renderValue(dataArray)}
						</div>
					</div>
					<Collapse isOpened={wikiInfoOpen}>
						<div className={style.WikiDataWrapper}>
							<FindingAidsItemWikiInfo wikidata_id={selectedWikidata} type={getWikiType()}/>
						</div>
					</Collapse>
				</React.Fragment>
			)
		}
	}

	const toggleSelectedValue = (wikidata_id) => {
		if (wikidata_id === selectedWikidata) {
			setWikiInfoOpen(false)
			setSelectedWikidata(undefined)
		} else {
			setWikiInfoOpen(true)
			setSelectedWikidata(wikidata_id)
		}
	}

	const renderValue = (dataArray) => (
		dataArray.flat().map(d => {

			// Same row display
			if (display === 'sameRow') {
				if (d['wikidata_id'] !== 'null') {
					return (
						<React.Fragment key={d['wikidata_id']}>
							<span
								className={selectedWikidata === d['wikidata_id'] ? style.WikiValueActive : style.WikiValue}
								onClick={() => toggleSelectedValue(d['wikidata_id'])}>{d['value']}</span>
							<span className={style.Comma}> | </span>
						</React.Fragment>
					)
				} else {
					return (
						<React.Fragment key={d['value']}>
							<span>{d['value']}</span>
							<span className={style.Comma}> | </span>
						</React.Fragment>
					)
				}

			// New row
			} else {
				if (d['wikidata_id'] !== 'null') {
					return <div key={d['wikidata_id']}>{d['value']} ({d['wikidata_id']})</div>
				} else {
					return <div key={d['value']}>{d['value']}</div>
				}
			}}
		))

	return dataArray.length > 0 && displayField(dataArray)
}

export default FindingAidsItemWithWiki