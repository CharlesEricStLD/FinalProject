//map where the user can look for al the centers 

import { MapContainer, TileLayer,Marker,Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


const positions = [
    [-40.99497, 174.50808],
    [-41.30269, 173.63696],
    [-41.49413, 173.5421],
    [-40.98585, 174.50659],
    [-40.93163, 173.81726],
    [-41.5183, 174.78081],
    [-41.42079, 173.5783],
    [-42.08414, 173.96632],
    [-41.51285, 173.53274]
];

export const LeafletMap = () => {
  return (
    <MapContainer  style={{ height: '400px', width: '400px', borderRadius:"15px" }} center={positions[1]} zoom={16} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  
    {positions.map((positionCenter) => (
    <Marker position={positionCenter}>
      <Popup>
      position :  {positionCenter}
      </Popup>
    </Marker>
    ))}
    </MapContainer> 
)}
