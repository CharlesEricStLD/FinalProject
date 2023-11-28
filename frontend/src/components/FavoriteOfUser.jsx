//Userfavorite component 

import { useContext, useState } from "react";
import { UserContext } from "../routes/RoutesIndex";

export const FavoriteOfUser = ({data, favoriteRemove, setFavoriteRemove}) => {

  //makeBetter
  //make it so the ush of the button force a rerender of the userPage

  const {user, setUser} = useContext(UserContext)
  
  const handleRemoveFavorite = () => {
    fetch("/api/removefavorite",  { 
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({favorite : {username : user.username, centerId : data._id } })
  }) 
  setFavoriteRemove(true);
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

