//compoenet of leafLet map 
import { MapContainer, TileLayer,Marker,Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styled from "styled-components"

export const LeafletMap = ({lattitude, longitude}) => {
  return (
    <MapStyle>
    <MapContainer  style={{ height: '100%', width: '100%', borderRadius:"15px" }} center={[lattitude, longitude]} zoom={16} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[lattitude, longitude]}>
    <Popup>
      position : {lattitude} {longitude}
    </Popup>
  </Marker>
</MapContainer>
</MapStyle>
  )
}

const MapStyle = styled.div`
  width:100%;
  height:100%;
`
