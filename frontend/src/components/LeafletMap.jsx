//compoenet of leafLet map 
import { MapContainer, TileLayer,Marker,Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export const LeafletMap = ({lattitude, longitude}) => {
  return (
    <div style={{height:"200px"}}>
    <MapContainer  style={{ height: '400px', width: '400px' }} center={[lattitude, longitude]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[lattitude, longitude]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
</div>

  )
}
