import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
	Tooltip,
	BarChart,
	XAxis,
	YAxis, Legend, Bar, ComposedChart
} from 'recharts';
import style from "./IsadInsightsDistribution.module.scss";

const primaryTypes = [
	{label: 'Textual', value: 'Textual'},
	{label: 'Moving Image', value: 'Moving Image'},
	{label: 'Audio', value: 'Audio'},
	{label: 'Still Image', value: 'Still Image'},
	{label: 'Webarchive', value: 'Webarchive'},
]

const availabilityTypes = [
	{label: 'Digital Without Registration', value: 'Digitally Anywhere / Without Registration'},
	{label: 'Digital With Registration', value: 'Digitally Anywhere / With Registration'},
	{label: 'In the Research Room', value: 'In the Research Room'}
]

const IsadInsightsDistribution = ({facets, isMobile}) => {
	const getData = (source, facetField) => {
		const values = [];

		const getValue = (element) => {
			if (facets.hasOwnProperty(facetField)) {
				if (facets[facetField].indexOf(element) !== -1) {
					return facets[facetField][facets[facetField].indexOf(element)+1]
				} else {
					return 0
				}
			}
		}

		source.forEach(element => {
			values.push(
				{label: element['label'], value: getValue(element['value'])}
			)
		})

		return values
	}

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className={style.Tooltip}>
					<div>{`${label} (${payload[0].value})`}</div>
				</div>
			);
		}

		return null;
	};

	const renderDistributionGraph = (data, title) => {
		return (
			<div className={style.Graph}>
				<div className={style.Title}>{title}</div>
				<div>
					<ResponsiveContainer width="100%" minHeight={300}>
						<RadarChart data={data}>
							<PolarGrid />
							<PolarAngleAxis dataKey="label" />
							<PolarRadiusAxis />
							<Tooltip content={<CustomTooltip />} />
							<Radar dataKey="value" stroke="#000" fill="#666" fillOpacity={0.6} />
						</RadarChart>
					</ResponsiveContainer>
				</div>
			</div>
		)
	}

	const renderDistributionBar = (data, title) => {
		return (
			<div className={isMobile ? style.Graph : `${style.Graph} ${style.Left}`}>
				<div className={style.Title}>{title}</div>
				<div style={{marginLeft: '-20px'}}>
					<ResponsiveContainer width="100%" minHeight={300}>
						<BarChart data={data} >
							<XAxis dataKey="label" />
							<YAxis />
							<Tooltip content={<CustomTooltip />} />
							<Bar dataKey="value" fill={'#999'}/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		)
	}

	return (
		<div className={isMobile ? `${style.DistributionWrapper} ${style.Mobile}` : style.DistributionWrapper}>
			{renderDistributionBar(getData(primaryTypes, 'primary_type_facet'), 'Material types in this series')}
			{renderDistributionGraph(getData(availabilityTypes, 'availability_facet'), 'Availability in this series')}
		</div>
	)

}

export default IsadInsightsDistribution;