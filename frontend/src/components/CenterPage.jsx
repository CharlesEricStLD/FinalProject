//Compopnents to render the Page for each center by ID of center 

import { useEffect, useState, useContext} from "react"
import { useParams } from 'react-router-dom'; 
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";
import { AddComments } from "./AddComments";
import {NewCommentContext} from "../routes/RoutesIndex"
import { Comment } from "./Comment";

export const CenterPage = () => {

  const [center, SetCenter] = useState(null); 
  const [lattitude, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const {newComments, setNewComments} = useContext(NewCommentContext)
  
  const {centerId} = useParams();

  //Fetch data from server
  useEffect(() => {
    if (centerId) { 
      console.log("FETCH DONE");
      fetch(`/api/center/${centerId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message = "center sucessfully found: ") {
          SetCenter(data.data)
        }
      })
      .catch((error) => {
        console.error(`Error fetching center details for ID ${centerId}:`, error);
    });
  }

  },[]);

  //Fetch to Nominative GoogleStreet API
  useEffect(() => {
    if (center) {
    fetch(`https://nominatim.openstreetmap.org/search?q=${center.name}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message = "center sucessfully found: ") {
          console.log(data[0])
          setLattitude(data[0].lat);
          setLongitude(data[0].lon);
        }
      })
      .catch((error) => {
        console.error(`Error fetching center details for ID ${centerId}:`, error);
    });
  }
  }, [center])

  useEffect(() => {
    if (isFavorite) {
        fetch("/api/addfavorite",  { 
        method: 'PATCH',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({favorite : {username : (sessionStorage.getItem("user")), centerId : centerId }  })
        }) 

        //makebetter
        //Remove .then 

      .then(response => response.json())
      .then((data) => {
        console.log(data);
      if (data.message === "Request sucessfull: ") {
        setValidationMessage("Add to favorite !")
      } else {
        setErrorMessage(data.message);
      }
      })
    }
  }, [isFavorite])

  const favoriteCLick = (event) => {
    const FavoriteIcon = event.target.parentElement;

    if(FavoriteIcon.style.fill === "red") {
      setIsFavorite(false);
      FavoriteIcon.style.fill = "black";
    } else {
      setIsFavorite(true);
      FavoriteIcon.style.fill = "red";
    }
  }



  return (
    <>
    <div>
    <h1>THIS IS THE PAGE TO RENDER THE CENTER PAGE WITH IT"S ID</h1>
    {!center? <p>loading ....</p> : (
      <>
      <h1>{center.name}</h1>
      <Favorite><FaHeart onClick={(event) => favoriteCLick(event)}></FaHeart></Favorite>
      {<p>{validationMessage || errorMessage}</p> }
      <p>region :{center.region} </p>
      <img src={center.image}></img>
      <p><a>{center.url}</a></p>
      <p> adresss :<a href={`https://www.google.com/maps/place/${center.address}`} target="blank"> {center.address}</a></p>
      <h2>Contact</h2>
      <p>{center.contact.email}</p>
      <p>{center.contact.facebook}</p>
      <p>{center.contact.phone}</p> 
      {/* //makebetter : add a message on trailfork, if you are trailfork member */ }
      <p> <a href={`https://www.trailforks.com/map/?ping=${lattitude},${longitude}`} target="blank"> InteractiveMAp on TrailFork </a> </p> 
      </> 
    ) }
    </div>
    <AddComments centerId = {centerId} centerName = {center && center.name}/> 
    {newComments && newComments.centerId === centerId && <Comment comment={newComments}/>}
    </>
  ) 

}


// #root > div:nth-child(2) > button > svg
document.querySelector("#root > div:nth-child(2) > button > svg")

const Favorite = styled.button`
  border:none;
  
  & > svg :active {
    background-color: pink;
    border: solid yellow;
    fill:red;
  }
  
`