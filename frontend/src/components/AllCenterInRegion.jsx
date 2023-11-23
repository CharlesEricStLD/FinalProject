//Component to render the filter by region
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

export const AllCenterInRegion = () => {

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allCentersOfRegion, setAllCentersOfRegion] = useState(null);

  const {region} = useParams()

  //Fetch by region with an endpoint with disctinct fro the Db 
  useEffect(() => {
  fetch(`/api/region/${region}`) 
  .then(response => response.json())
  .then(data => {
    if (data.message === "Request sucessfull: ") {
      console.log("FETCH DONE");
      setAllCentersOfRegion(data.data)
      setLoading(false)
    }
    else {
    setErrorMessage(data.message)
    }
})
  },[region])


  return (
    <div>
    <h1>This is the component to filter by Region</h1>
    <h2>Here you can see all the centers of the {region}</h2>
    {
      loading ? <p> is loading ....</p> : (
        allCentersOfRegion.map(center => 
          <div>
          <h1>{center.name}</h1>
          <p>region :{center.region} </p>
          <img src={center.image}></img>
          <p><a>{center.url}</a></p>
          <h2>Contact</h2>
          <p>{center.contact.email}</p>
          <p>{center.contact.facebook}</p>
          <p>{center.contact.phone}</p> 
          </div> 
        )
      )
    }
    </div>
  )

}