//Compopnents to render the Page for each center by ID of center 

import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'; 

export const CenterPage = () => {

  const [center, SetCenter] = useState(null); 
  const [lattitude, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  

  const {centerId} = useParams();

  //Fetch data from server
  useEffect(() => {
    if (centerId) { 
      console.log("FETCH DONE");
      fetch(`/api/center/${centerId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message = "center sucessfully found: ") {
          SetCenter(data.data)
        }
      })
      .catch((error) => {
        console.error(`Error fetching center details for ID ${centerId}:`, error);
    });
  }

  },[]);

  //Fetch to Nominative GoogleStreet API
  useEffect(() => {
    if (center) {
    fetch(`https://nominatim.openstreetmap.org/search?q=${center.name}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message = "center sucessfully found: ") {
          console.log(data[0])
          setLattitude(data[0].lat);
          setLongitude(data[0].lon);
        }
      })
      .catch((error) => {
        console.error(`Error fetching center details for ID ${centerId}:`, error);
    });
  }
  }, [center])


  return (
    <>
    <div>
    <h1>THIS IS THE PAGE TO RENDER THE CENTER PAGE WITH IT"S ID</h1>
    {!center? <p>loading ....</p> : (
      <>
      <h1>{center.name}</h1>
      <p>region :{center.region} </p>
      <img src={center.image}></img>
      <p><a>{center.url}</a></p>
      <p> adresss :<a href={`https://www.google.com/maps/place/${center.address}`} target="blank"> {center.address}</a></p>
      <h2>Contact</h2>
      <p>{center.contact.email}</p>
      <p>{center.contact.facebook}</p>
      <p>{center.contact.phone}</p> 
      <p> <a href={`https://www.trailforks.com/map/?ping=${lattitude},${longitude}`} target="blank"> InteractiveMAp on TrailFork </a> </p> 
      </> 
    ) }
    </div>      
    </>
  ) 

}