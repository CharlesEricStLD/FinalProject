//Component to render the filter by region
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import styled from "styled-components";
import { CenterCard } from "./CenterCard";

export const AllCenterInRegion = () => {

  const [loading, setLoading] = useState(true);
  const [allCentersOfRegion, setAllCentersOfRegion] = useState(null);

  const {region} = useParams()

  //Fetch by region with an endpoint with disctinct fro the Db 
  useEffect(() => {
  fetch(`/api/region/${region}`) 
  .then(response => response.json())
  .then(data => {
    if (data.message === "Request sucessfull: ") {
      setAllCentersOfRegion(data.data)
      setLoading(false)
    }
})
  },[region])


  return (
    <AllCenterInRegionStyling>
    <h1>{region}</h1>
    {
      loading ? <p> is loading ....</p> : (
        allCentersOfRegion.map(center => 
          <CenterCard key={center._id} center={center}/> 
        )
      )
    }
    </AllCenterInRegionStyling>
  )

}

const AllCenterInRegionStyling = styled.div`
  margin:2%;
  font-size: 1.5em;
  
  p{
    font-size: 1.2em;
  }

  h1{
    font-size: 4em;
    margin-bottom: 1%;
  }
`
