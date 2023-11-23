//Compopnents to render the Page for each center by ID of center 

import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'; 

export const CenterPage = () => {

  // const centerObj =  {
  //   _id : "e0d4b418-a2c2-4ed7-bc1b-b2fdbe55c530",
  //   image : "https://m1.quebecormedia.com/emp/emp/62216354_2615382654865a-73cc-4c33-bc1d-8479a3cd3d50_ORIGINAL.jpg?impolicy=crop-resize&x=0&y=0&w=1000&h=667&width=960",
  //   name : "Ski Montagne coupée",
  //   region : "Laurentides",
  //   url : "https://skidefondstjeanmatharaquettelanaudiere.com/",
    
  //   contact : {
  //   email : "<info@skimontagnecoupee.com>",
  //   facebook : " @skimontagnecoupee",
  //   Phone : "450 886-3845",
  //   website : "https://skidefondstjeanmatharaquettelanaudiere.com/",
  //   }
  // }

  const [center, SetCenter] = useState(null);  

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
      <h2>Contact</h2>
      <p>{center.contact.email}</p>
      <p>{center.contact.facebook}</p>
      <p>{center.contact.phone}</p>  
      </> 
    ) }
    </div>      
    </>
  ) 

}