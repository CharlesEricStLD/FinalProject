//Compopnents to render the Page for each center by ID of center 

import { useEffect, useState, useContext} from "react"
import { useParams } from 'react-router-dom'; 
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";
import { AddComments } from "./AddComments";
import {NewCommentContext, UserContext} from "../routes/RoutesIndex"
import { Comment } from "./Comment";
import { LeafletMap } from "./LeafletMap";
import { LoginModal } from "./LoginModal"

export const CenterPage = () => {

  const [center, SetCenter] = useState(null); 
  const [lattitude, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [OpenAddComment, setOpenAddComment] = useState(false);
  
  const {centerId} = useParams();

  const [user, setUser] = useContext(UserContext);

  //Fetch data from server
  useEffect(() => {
    if (centerId) { 
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
        console.log(data);
        if (data.length > 0) {
          setLattitude(data[0].lat);
          setLongitude(data[0].lon);
        }
      })
      .catch((error) => {
        console.error(`Error fetching center details for ID ${centerId}:`, error);
    });
  }
  }, [center])

  //Modify favorite if user is connected
  useEffect(() => {
    if (isFavorite) {
        fetch("/api/addfavorite",  { 
        method: 'PATCH',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
      },
      body: JSON.stringify({favorite : {username : user.username, centerId : centerId }  })
        }) 

        //makebetter
        //Remove .then 

      .then(response => response.json())
      .then((data) => {
        console.log(data);
      if (data.status === 200 || data.message === "This favorite already exist in your favorite list :)") {
        setValidationMessage("Add to favorite !")
      } else {
        setOpen(true);
        <LoginModal
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
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

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  const onCreateAddComment = (values) => {
    console.log('Received values of form: ', values);
    setOpenAddComment(false);
  };

  let commentsToShow = [];

  if (center && center.comments) {
    (commentsToShow = (center.comments).filter((comment) => comment.accepted === true))
  }

  return (
    <PageContainer>
    {!center? <p>loading ....</p> : (
      <>
      <CenterInformation>
      <h1>{center.name}</h1>
      <Favorite><FaHeart onClick={(event) => favoriteCLick(event)}></FaHeart></Favorite>
      <LoginModal
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}></LoginModal>
      
      {<p>{validationMessage || errorMessage}</p> }
      <p>Region : {center.region} </p>
      <img src={center.image}></img>
      </CenterInformation>
      
      <CenterDetails>
      
      <FirstBlock>
      <p><a href={center.url} target="blank">{center.url}</a></p>
      <p> adresss :<a href={`https://www.google.com/maps/place/${center.address}`} target="blank"> {center.address}</a></p>

      <h2>Contact</h2>
      <p>{center.contact.email}</p>
      <p>{center.contact.facebook}</p>
      <p>{center.contact.phone}</p> 
      {/* //makebetter : add a message on trailfork, if you are trailfork member */ }
      {lattitude && longitude && (<p> <a href={`https://www.trailforks.com/map/?ping=${lattitude},${longitude}`} target="blank"> Interactive Map on TrailFork </a> </p>) }
      </FirstBlock>

      <SecondBlock>
      {lattitude && longitude && <LeafletMap lattitude={lattitude} longitude={longitude}></LeafletMap>}
      </SecondBlock>

      <ThirdBlock>
      <h2>Review</h2>
      <button onClick={() => setOpenAddComment(true)}>Add Review</button>
      {commentsToShow && commentsToShow.map(comment => <Comment comment={comment} key={comment._id}/>) }
            <AddComments onCreateAddComment={onCreateAddComment} onCancelAddComment={() => {
          setOpenAddComment(false)}} centerId = {centerId} OpenAddComment={OpenAddComment} centerName = {center && center.name}/> 
      </ThirdBlock>

      </CenterDetails>
      </>
    ) }
    </PageContainer>
  ) 

}

const PageContainer = styled.div`
  margin: 0 2%;
  font-size: 1.5em;
  border-radius: 15px;
  border: 2px solid;
  background-color: #767f878b;
`
const CenterInformation = styled.div`
  padding:2%;

  h1{
    display: inline-block;
    margin-top: 1%;
  }

  p{
    margin: 1% 0;
  }
  
  img {
    width:100%;
    height:400px;
    object-fit: cover;
    object-position: 0 64%;
    border-radius: 15px;
  }
`
const CenterDetails = styled.div`
  display:grid;
  padding:2%;
  font-size: 1.2em;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 3%;

`

const FirstBlock = styled.div`
padding:2%;
h2{
  margin-top: 5%;
}
border-radius: 15px;
border: solid 2px;
`

const SecondBlock = styled.div`
border-radius: 15px;
border: solid 2px;
`

const ThirdBlock = styled.div`
  border-radius: 15px;
  border: solid 2px;
  
  h2{
  padding:2%;
  display: inline-block;
  }

  button {
    background-color: #4d71e7;
    font-size: 1em;
    text-align: center;
    width:25%;
    margin:4% 4%;
  }
`

const Favorite = styled.button`
  border:none;
  display: inline-block;
  margin-left:2%;
  background-color: rgb(0,0,0,0);
  font-size: 1.5em;
  
  & > svg :active {
    fill:red;
  }
  
`