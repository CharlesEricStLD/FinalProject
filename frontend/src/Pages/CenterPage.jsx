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
import { SnowConditionsTable } from "../components/ConditionsTable";


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


  //Todo Remove this when my condition center work from import
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
      <FavoriteAndTitleContainer>
      <Favorite><GoBookmarkFill onClick={(event) => favoriteCLick(event)}></GoBookmarkFill></Favorite>
        <h1>{center.name}</h1>
      </FavoriteAndTitleContainer> 
      <LoginModal
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}>
      {<p>{validationMessage || errorMessage}</p> }
      </LoginModal>
      
      <p>Region : {center.region} </p>
      {/* <img src={center.image}></img> */}
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
        {/* <SnowConditionsTable center={center}/> */}
      <h3>Conditions</h3>
      {center.condition? 
      <ConditionTable>
          <thead>
          <tr>
          <th className="col0">Open/Close</th>
          <th className="col1">Track Close</th>
          <th className="col2">Snow conditions</th>
          <th className="col3">Warnings</th>
          <th className="col4">Last Update</th>
          </tr>
          </thead>
        <tbody>
        <tr>{
        Object.values(center.condition).map((data,index) => (
        <td>{data ?data: "No data available from the ski center"}</td>
        ))
        }</tr>
        </tbody>
      </ConditionTable> : <h3>Conditions unavailable for the moment...</h3>}
      <p>For more details, you can visit the website directly <a target="_blank" href={centerConditonUrl}>here</a>.</p>

      {/* Pour plus détails, vous pouvez visiter le site internet du centre, ici */}

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
  grid-template-rows: 0.5fr 0.6fr 1fr 0.5fr;
  grid-gap:2em;
  justify-content: center;
  padding:4em;
  padding-top:0;
  padding-bottom: 3em;
  font-size: 1.2em;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;  
  background-color:#ffffff;
`
const ImageAndName = styled.div`
grid-column: span 2;
margin-top: 1em;
border-radius: 15px;
background-color: var(--box-bg-color);
display: flex;
flex-direction: column;
padding:2%;

h1, p{
    z-index: 2;
    color:black;
  }
`
const FavoriteAndTitleContainer = styled.div `
  display: flex;
  flex-direction: row;
  margin-right:2em;
  margin-bottom: 1em;
`
const Favorite = styled.button`
  border:1px;
  background-color: rgb(0,0,0,0);
  width:min-content;
  font-size: 2em;
  fill:none;
  z-index: 2;
  margin-right: 1em;

  & > svg :active {
    fill:white;
  }

`

const CenterDetails = styled.div`
grid-column: 1;
grid-row:2;
padding:4%;
border-radius: 15px;
box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
background-color: var(--box-bg-color);



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

const Conditions = styled.div`
grid-column: span 2;
grid-row:3;
display:grid;
grid-template-columns: 1fr;
grid-template-rows: 0.75fr 4fr 0.75fr;
padding:1em;
border-radius: 15px;
background-color:var(--box-bg-color);
box-shadow: var(--box-box-shadow);
h3 {
  font-size:2em;
}

`

const ConditionTable = styled.table`
  display: grid;
  min-width: 100%;
  grid-template-columns: 
  auto repeat(4, 1fr);
  grid-template-rows: 0.20fr 0.75fr;
  grid-gap: 0.5em;
  margin-bottom:0.5em;
  border-radius: 15px;
  background-color: var(--box-bg-color);
  font-weight:bold;

  thead,tbody{
    display: contents;
  }

  th {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    border:none;
    border-width: 0 0.3em 0.5em 0.3em;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px
  }

  td {
    border-radius: 15px;
    background-color: white;
  }

  tr{
    display:contents;
    border-radius: 15px;
  }

  
  th, tr,td {
  word-wrap: break-word;
  font-size: 1em;
  padding:0.5em;
  text-align: center;
  overflow: hidden;
  }
`
const Comments = styled.div`
  border-radius: 15px;
  background-color: var(--box-bg-color);
  padding:1em;

  h2{
  padding:2%;
  display: inline-block;
  }

  button {
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

