//map where the user can look for al the centers

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { useContext } from "react";
import { DataCentersContext } from "../routes/RoutesIndex";
import { Link } from "react-router-dom";

export const MapOfAllCenters = () => {
  const [centersData, setCentersData] = useContext(DataCentersContext);

  const filterCentersData = centersData.filter((center) => center.location);

  let positionOfAllCenters = [];
  filterCentersData.map((center) => {
    let centerObject = {};
    centerObject = Object.assign({
      name: center.name,
      position: [center.location.lat, center.location.lng],
      _id: center._id,
    });
    positionOfAllCenters.push(centerObject);
  });

  return (
    <PageContainer>
      <MapContainer
        style={{ height: "100%", width: "100%", borderRadius: "15px" }}
        center={[47.4187161, -72.79134189999999]}
        zoom={6}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {positionOfAllCenters.map((center) => (
          <Marker key={center.name} position={center.position}>
            <Popup>
              <Link to={"/center/" + center._id}>{center.name}</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  border: none;
  height: 75vh;
  width: auto;
  margin: 1em;
`;
