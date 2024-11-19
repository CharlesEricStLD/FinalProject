//Compopnents to render the Page for each center by ID of center

import { useEffect, useState, useContext} from "react"
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import parse from 'html-react-parser';
import { AddComments } from "../components/AddComments";
import {UserContext} from "../routes/RoutesIndex"
import { Comment } from "../components/Comment";
import { LeafletMap } from "../components/LeafletMap";
import { LoginModal } from "../components/LoginModal"
import { Loader } from "../components/Loader";
import { Tooltip } from 'antd';
import { GoBookmarkFill } from "react-icons/go";
import { Weather } from "../components/Wheather";


export const CenterPage = () => {

  const [center, SetCenter] = useState(null);
  const [centerConditonUrl, setcenterConditonUrl] = useState(null);
  const [lattitude, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [OpenAddComment, setOpenAddComment] = useState(false);

  const {centerId} = useParams();

  const [user, setUser] = useContext(UserContext);

  //Fetch the centers informations from database
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

  //Fetch the centers condition url information from the database
  useEffect(() => {
    if (center) {
      fetch(`/api/centersCondition/${center.name}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.message = "center sucessfully found: ") {
          setcenterConditonUrl(data.data.scrapping.conditionUrl)
        }
      })
      .catch((error) => {
        console.error(`Error fetching center details for ID ${center.name}:`, error);
    });
  }
  },[center]);

//set location for center
  useEffect(() => {
    if (center && center.location) {
      setLattitude(center.location.lat)
      setLongitude(center.location.lng)
    // fetch(`https://nominatim.openstreetmap.org/search?q=${center.name}&format=json`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.length > 0) {
    //       setLattitude(data[0].lat);
    //       setLongitude(data[0].lon);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(`Error fetching center details for ID ${centerId}:`, error);
    // });
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

      .then(response => response.json())
      .then((data) => {
      if (data.status !== 200 || data.message !== "This favorite already exist in your favorite list :)") {

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

    if(FavoriteIcon.style.fill === "blue") {
      setIsFavorite(false);
      setErrorMessage("");
      setValidationMessage("");
      FavoriteIcon.style.fill = "white";
    } else {
      setIsFavorite(true);
      setErrorMessage("");
      setValidationMessage("");
      FavoriteIcon.style.fill = "blue";
    }
  }

  const onCreate = (values) => {
    setOpen(false);
  };

  const onCreateAddComment = (values) => {
    setOpenAddComment(false);
  };

  let commentsToShow = [];

  if (center && center.comments) {
    (commentsToShow = (center.comments).filter((comment) => comment.accepted === true))
  }

  return (

    <PageContainer>
    {!center? <Loader/> : (
      <>
      <ImageAndName>
      <h1>{center.name}</h1>
      <Favorite><GoBookmarkFill onClick={(event) => favoriteCLick(event)}></GoBookmarkFill></Favorite>
      <LoginModal
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}></LoginModal>

      {<p>{validationMessage || errorMessage}</p> }
      <p>Region : {center.region} </p>
      <img src={center.image}></img>
      </ImageAndName>

      <CenterDetails>
      <p><a href={center.url} target="blank">{center.url}</a></p>
      <p> adresss :<a href={`https://www.google.com/maps/place/${center.address}`} target="blank"> {center.address}</a></p>

      <h2>Contact</h2>
      <p>{center.contact.email}</p>
      <p>{center.contact.facebook}</p>
      <p>{center.contact.phone}</p>
      <Tooltip title="To view on TrailFork website" placement="bottomLeft">
      {lattitude && longitude && (<p> <a href={`https://www.trailforks.com/map/?ping=${lattitude},${longitude}`} target="blank"> Interactive Map on TrailFork App </a> </p>) }
      </Tooltip>
      <p className="note">You need to have a trailFork account to access this link</p>
      </CenterDetails>

      <Map>
      {lattitude && longitude && <LeafletMap lattitude={lattitude} longitude={longitude}></LeafletMap>}
      </Map>

      <>
      <Conditions>
      <h3>Conditions</h3>
      {center.condition? 
      <ConditionTable>
        <tbody>
        <tr>
        <th>OUVERT/FERME</th>
        <th>Pistes Fermées</th>
        <th>Conditions de neige</th>
        <th>Avertissements importants</th>
        <th>Dernière mise à jour</th>
        </tr>
        <tr>
        {
        Object.values(center.condition).map((data) =>
        <td>{data ?data: "Information non fournie par le centre de ski de fond"}</td>
        )
        };
        </tr>
        </tbody>
      </ConditionTable> : <h3>Condition indisponible pour le moment...</h3>}
      <p>Pour plus détails, vous pouvez visiter le site internet du centre <a target="_blank" href={centerConditonUrl}>ici</a>.</p>
      </Conditions>
      </>

      <Comments>
      <h2>Review</h2>
      <button onClick={() => setOpenAddComment(true)}>Add Review</button>
      {commentsToShow && commentsToShow.map(comment => <Comment comment={comment} key={comment._id}/>) }
      <AddComments onCreateAddComment={onCreateAddComment} onCancelAddComment={() => {
          setOpenAddComment(false)}} centerId = {centerId} OpenAddComment={OpenAddComment} centerName = {center && center.name}/>
      </Comments>


      <Meteo>
        {lattitude && longitude && <Weather address = {center.address} lattitude={lattitude} longitude={longitude} />}
      </Meteo>
      </>
    ) }
    </PageContainer>
  )

}

const PageContainer = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap:1em;
  justify-content: center;
  margin: 4vw 4vh;
  padding:1em;
  padding-top:0;
  padding-bottom: 1em;
  font-size: 1.2em;
  border-radius: 15px;
  border: 2px solid;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;  background-color:#ffffff;
`
const ImageAndName = styled.div`
grid-column: span 2;
grid-row : 1;

  h1, p{
    display: block;
    position: relative;
    font-weight: bold;
    z-index: 2;
    padding-left: 5%;
    color:black;
    top: 150px;
  }

  p{
    margin: 1% 0;
    font-size: 1em;
  }

  img {
    width:100%;
    height:400px;
    object-fit: cover;
    object-position: 0 64%;
    border-radius: 15px;
    position: relative;
    top:-150px;
    z-index : 1;
  }
`

const CenterDetails = styled.div`
grid-column: 1;
grid-row:2;
padding:4%;
border-radius: 15px;
border: solid 2px;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
background-color:#ffffff;


a{
  font-size: 0.7em;
}

h2{
  margin-top: 5%;
}


p.note {
  font-size: 0.7em;
}
`

const Map = styled.div`
grid-column: 2;
grid-row:2;
`

//todo need to make the page  agrid and make the condition two grid space

const Conditions = styled.div`
  grid-column: span 2;
  grid-row:3;
  border-radius: 15px;
border: solid 2px;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
background-color:#ffffff;
`

const ConditionTable = styled.table`
  width:100%;
  table-layout: fixed;
  border-spacing : 1em;

  th, tr,td {
  word-wrap: break-word;
  font-size: 0.9em;
  width:100%;
  text-align: center;
  }
`
const Comments = styled.div`
  border-radius: 15px;
  border: solid 2px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;  background-color:#ffffff;

  h2{
  padding:2%;
  display: inline-block;
  }

  button {
    background-color: #0181C2;
    font-size: 1em;
    text-align: center;
    width:25%;
    padding:1%;
    margin:4% 4%;
    color:white;
  }
`

const Meteo = styled.div`
  grid-column: 1;
  grid-row:4;
`
const Favorite = styled.button`
  border:1px;
  display: inline-block;
  margin-left:2%;
  background-color: rgb(0,0,0,0);
  font-size: 2em;
  fill:none;
  position: relative;
  top:50px;
  z-index: 2;

  & > svg :active {
    fill:white;
  }

`
