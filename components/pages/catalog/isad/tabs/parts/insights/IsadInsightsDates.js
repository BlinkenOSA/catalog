import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import style from "./IsadInsightsDates.module.scss";
import {useState} from "react";
import {useDeepCompareEffect} from "react-use";

const IsadInsightsDates = ({facets, isOnDrawer=false, isMobile=false}) => {
	const [data, setData] = useState([]);

	useDeepCompareEffect(() => {
		if (facets.hasOwnProperty('year_created_facet')) {
			if (facets['year_created_facet'].length > 1) {
				const facetValues = facets['year_created_facet'];
				const f = [];
				for (let i = 0; i < facetValues.length; i += 2) {
					f.push({
						year: facetValues[i],
						numberOfRecords: facetValues[i+1]
					})
				}
				setData(f);
			}
		}
	}, [facets])

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className={style.Tooltip}>
					<div>{`${payload[0].value} folders/items from ${label}`}</div>
				</div>
			);
		}

		return null;
	};

	if (facets.hasOwnProperty('year_created_facet')) {
		if (facets['year_created_facet'].length > 1) {
			return (
					<div className={isOnDrawer ? `${style.InsightDateWrapper} ${style.BorderLess}` : style.InsightDateWrapper}>
						<div className={isOnDrawer ? style.TitleDrawer : style.Title}>Date distribution of the material in this archival unit</div>
						<div style={{marginLeft: '-30px'}}>
							<ResponsiveContainer width={'100%'} height={isMobile ? 200 : isOnDrawer ? 200 : 400}>
								<AreaChart data={data} >
									<XAxis dataKey="year" stroke={'#000'} />
									<YAxis stroke={'#000'} />
									<Tooltip content={<CustomTooltip />} />
									<Area type="monotone" dataKey="numberOfRecords" fill="#666" stroke="#000"/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</div>
			)
		}
	}
}

export default IsadInsightsDates;