//Userfavorite component 

import { useContext} from "react";
import { UserContext } from "../routes/RoutesIndex";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const FavoriteOfUser = ({data, userFavorites,SetUserFavorites}) => {

  const [user] = useContext(UserContext)

  const handleRemoveFavorite = () => {
    fetch("/api/removefavorite",  { 
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({favorite : {username : user.username, centerId : data._id } })
  })
  SetUserFavorites(userFavorites.filter(favorite => favorite !== data._id))
}

return (
  <CenterCardStyling>
          <div>
          <Link to={`/center/${data._id}`}>
          <img src={data.image}></img>
          </Link>
          </div>

          <div>
          <h2>{data.name}</h2>
          <p>Region : {data.region} </p>
          <p> <a href={data.url} target="blank">{data.url}</a></p>
          
          <h3>Contact</h3>
          <p>{data.contact.email}</p>
          <p>{data.contact.facebook}</p>
          <p>{data.contact.phone}</p> 
          <button onClick={handleRemoveFavorite}>Remove from favorite</button>
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

    button {
      font-size: 1em;
      padding:1%;
      margin-top: 1%;
    }
  }
`
