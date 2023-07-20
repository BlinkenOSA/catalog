import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, Marker, useMap, GeoJSON} from 'react-leaflet';
import { icon } from "leaflet"
import style from './Map.module.scss'


const ICON = icon({
	iconUrl: "images/marker-icon-grey.png",
	shadowUrl: "images/marker-shadow.png",
})

export function ChangeView({ coords, zoom }) {
	const map = useMap();
	map.setView(coords, zoom);
	return null;
}

const Map = ({lat, long, geoJSON=false, geoJSONData, zoom=0}) => {
	const center = [lat, long];

	const geoJSONStyle = {
		color: '#000',
		weight: 1,
		fillColor: '#FFEB42',
		fillOpacity: 0.5
	}

	return (
		<div className={style.MapWrapper}>
			<MapContainer center={center} zoom={zoom !== 0 ? zoom : 12} style={{ height: '300px'}}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{(lat && long && !geoJSON) && <Marker icon={ICON} position={center} />}
				{geoJSON && <GeoJSON key={`map_${lat}_${long}`} data={geoJSONData} style={geoJSONStyle}/>}
				<ChangeView coords={center} zoom={zoom !== 0 ? zoom : 12}/>
			</MapContainer>
		</div>
	)
}

export default Map;