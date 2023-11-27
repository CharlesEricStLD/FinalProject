//Component of the User Page 

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";


export const UserPage = () => {

const [userFavorites, SetUserFavorites] = useState(null);
const [accessAllowed, setAccessAllowed] = useState(false);

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


//Here we will fetch the favorite and list it. 


//user will also be able to see all their comments

  return (
    <>
      {accessAllowed && (
        <div>
          <h1>HI {username} ! </h1>
          {userFavorites ? (
            userFavorites.map((userFavorite) => (
              <p key={userFavorite.id}>{userFavorite}</p>
            ))
          ) : (
            <p>You have no favorites yet</p>
          )}
        </div>
      )}
    </>
  );
}