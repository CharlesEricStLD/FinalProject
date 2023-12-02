//Component to render the filter by region
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    <AllCenterInRegionStyling>
    <h1>{region}</h1>
    {
      loading ? <p> is loading ....</p> : (
        allCentersOfRegion.map(center => 
          
          <CenterCard key={center.name} >
          
          <div>
          <Link to={`/center/${center._id}`}>
          <img src={center.image}></img>
          </Link>
          </div>

          <div>
          <h2>{center.name}</h2>
          <p>Region : {center.region} </p>
          <p> <a href={center.url} target="blank">{center.url}</a></p>
          
          <h3>Contact</h3>
          <p>{center.contact.email}</p>
          <p>{center.contact.facebook}</p>
          <p>{center.contact.phone}</p> 
          </div>

          </CenterCard> 
          
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

const CenterCard = styled.div`
  margin-bottom:5%;
  padding:2%;
  width:90%;
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  column-gap: 5%;
  border-radius: 15px;
  border: solid 2px;

  div:nth-child(1){
    width:100%;
    padding:1%;

    img {
    width:100%;
    border-radius: 15px;
  }
  }

  div:nth-child(2){
    padding-top: 10%;

    p{
      margin-top:1%;
      margin-bottom: 1%;
    }

    h2 {
      margin-top:5%;
      margin-bottom:2%;
    }
  }
`