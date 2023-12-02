//center card component to render each center where tehre are many 


import styled from "styled-components"
import { Link } from "react-router-dom"

export const CenterCard = ({center}) => {

  console.log(center);

  return (  
          <CenterCardStyling>
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

          </CenterCardStyling> 
          
        )

}

const CenterCardStyling = styled.div`
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