//compoenet of leafLet map 
import { MapContainer, TileLayer,Marker,Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export const LeafletMap = ({lattitude, longitude}) => {
  return (
    <MapContainer  style={{ height: '475px', width: '475px', borderRadius:"15px" }} center={[lattitude, longitude]} zoom={16} scrollWheelZoom={false}>
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

  )
}
