import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { icon } from "leaflet"
import style from './Map.module.scss'

const ICON = icon({
	iconUrl: "images/marker-icon-grey.png",
	shadowUrl: "images/marker-shadow.png",
})

export function ChangeView({ coords }) {
	const map = useMap();
	map.setView(coords, 12);
	return null;
}

const Map = ({lat, long}) => {
	const center = [lat, long];
	return (
		<div className={style.MapWrapper}>
			<MapContainer center={center} zoom={12} style={{ height: '300px'}}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{lat && long && <Marker icon={ICON} position={center} />}
				<ChangeView coords={center} />
			</MapContainer>
		</div>
	)
}

export default Map;