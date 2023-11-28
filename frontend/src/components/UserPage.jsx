//Component of the User Page 

import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../routes/RoutesIndex";


export const UserPage = () => {

const [userFavorites, SetUserFavorites] = useState(null);
const [accessAllowed, setAccessAllowed] = useState(false);
const [allFavorites, setAllFavorites] = useState([]);

const {user, setUser} = useContext(UserContext)

const navigate = useNavigate();

const {username} = useParams();

useEffect(() => {
  const sessionData = sessionStorage.getItem("user");

  if (username === sessionData) {
    setAccessAllowed(true);
  } else {
    navigate("/login");
  }
}, [navigate, username]);


//makebetter
//make the user object context state so it can be faster to fecth from it.

//Here we will fetch the favorite and list it. 
useEffect(() => {
  fetch("/api/showfavorites", {
    method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({username : sessionStorage.getItem("user")})
      })
      .then(response => response.json())
    .then((data) => {
      if (data.message === "Request sucessfull: ") {
        SetUserFavorites(data.data)
      }
      else {
        console.error(data.message)
      }
    })
},[])

useEffect(() => {
  if(userFavorites) {

    const allFetch = (userFavorites.map(centerId =>
        fetch(`/api/center/${centerId}`)))

        Promise.all(allFetch)
        .then((responses) => Promise.all(responses.map(response => response.json())))
        .then(datas => {
          console.log(datas);
          //todo 
          //this is an array treat it like that ! yeah! 
          if ( datas.every((data) => (data.message = "center sucessfully found: ")) ) { 
            setAllFavorites(datas)
          }
        })
        .catch((error) => {
          console.error(`Error fetching center details:`, error);
      })      
    }

}, [userFavorites])

//user will also be able to see all their comments

  return (
    <>
      {accessAllowed && (
        <div>
          <h1>HI {username} ! </h1>
          {allFavorites ? (
            allFavorites.map((data => (
              <div key={data.data.name}>
              <h1>{data.data.name}</h1>
              <p>region :{data.data.region} </p>
              <img src={data.data.image}></img>
              <p><a>{data.data.url}</a></p>
              <p> adresss :<a href={`https://www.google.com/maps/place/${data.data.address}`} target="blank"> {data.data.address}</a></p>
              <h2>Contact</h2>
              <p>{data.data.contact.email}</p>
              <p>{data.data.contact.facebook}</p>
              <p>{data.data.contact.phone}</p> 
              </div>
            )))
          ) : (
            <p>You have no favorites yet</p>
          )}
        </div>
      )}
    </>
  );
}