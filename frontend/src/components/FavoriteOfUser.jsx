//Userfavorite component 

import { useContext, useState } from "react";
import { UserContext } from "../routes/RoutesIndex";

export const FavoriteOfUser = ({data, userFavorites,SetUserFavorites, favoriteRemove, setFavoriteRemove}) => {

  // const {user, setUser} = useContext(UserContext)

  const user = sessionStorage.getItem("user")

  const handleRemoveFavorite = () => {
    fetch("/api/removefavorite",  { 
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({favorite : {username : user, centerId : data._id } })
  })
  SetUserFavorites(userFavorites.filter(favorite => favorite !== data._id))
}

return (
<>
              <h1>{data.name}</h1>
              <p>region :{data.region} </p>
              <button onClick={handleRemoveFavorite}>Remove from favorite</button>
              <img src={data.image}></img>
              <p><a>{data.url}</a></p>
              <p> adresss :<a href={`https://www.google.com/maps/place/${data.address}`} target="blank"> {data.address}</a></p>
              <h2>Contact</h2>
              <p>{data.contact.email}</p>
              <p>{data.contact.facebook}</p>
              <p>{data.contact.phone}</p> 
              </>
)

}

