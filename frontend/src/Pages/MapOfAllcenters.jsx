//map where the user can look for al the centers 

import { MapContainer, TileLayer,Marker,Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import styled from 'styled-components';
import { useContext } from 'react';
import { DataCentersContext } from '../routes/RoutesIndex';

//just for testing.
const positions2 = [
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

export const MapOfAllCenters = () => {
  
  const [centersData, setCentersData] = useContext(DataCentersContext);
  
  const filterCentersData = centersData.filter(center => center.location)

  console.log (centersData);
  console.log(filterCentersData);

  let positionOfAllCenters = [];
  filterCentersData.map((center) => {
    let centerObject = {};
    centerObject = Object.assign({name : center.name, position : [center.location.lat, center.location.lng]})
    positionOfAllCenters.push(centerObject); 
  })

  console.log(positionOfAllCenters);


  return (
    <PageContainer>
    <MapContainer  style={{ height: '100%', width: '100%', borderRadius:"15px" }} center={[47.4187161,-72.79134189999999]} zoom={6} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  
    {positionOfAllCenters.map(center => (
    <Marker key={center.name} position={center.position}>
      <Popup>
    {center.name}
      </Popup>
    </Marker>
    ))
    }
    </MapContainer>
    </PageContainer> 
)}

const PageContainer = styled.div`
  border: none;
  height:75vh;
  width:auto;
  margin:1em;
`
