//Component of the User Page 

import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../routes/RoutesIndex";
import { FavoriteOfUser } from "./FavoriteOfUser";
import styled from "styled-components";


export const UserPage = () => {

const [user, setUser] = useContext(UserContext)

const [userFavorites, SetUserFavorites] = useState(user.favorites);
const [accessAllowed, setAccessAllowed] = useState(false);
const [allFavorites, setAllFavorites] = useState([]);

const navigate = useNavigate();

const {username} = useParams();

useEffect(() => {
  const sessionData = sessionStorage.getItem("user");

  if (username === user.username) {
    setAccessAllowed(true);
  } else {
    navigate("/login");
  }
}, [navigate, username]);

useEffect(() => {
  if(userFavorites) {

    const allFetch = (userFavorites.map(centerId =>
        fetch(`/api/center/${centerId}`)))

        Promise.all(allFetch)
        .then((responses) => Promise.all(responses.map(response => response.json())))
        .then(datas => {

          if ( datas.every((data) => (data.message = "center sucessfully found: ")) ) { 
            setAllFavorites(datas)
          }
        })
        .catch((error) => {
          console.error(`Error fetching center details:`, error);
      })      
    }

}, [userFavorites]);

  return (
    <>
      {accessAllowed && (
          <AllFavorites>
          <h1>HI {username} ! </h1>
          {allFavorites ? (
            allFavorites.map((data => (
              <div key={data.data.name}>
              <FavoriteOfUser userFavorites={userFavorites} SetUserFavorites={SetUserFavorites} data = {data.data} allFavorites={allFavorites}/>
              </div>
            )))
          ) : (
            <p>You have no favorites yet</p>
          )}
          </AllFavorites>
      )}
    </>
  );
}

const AllFavorites = styled.div`
  margin:2%;
  font-size: 1.5em;
  
  p{
    font-size: 1.2em;
  }

  h1{
    font-size: 3em;
    margin-bottom: 1%;
  }
`