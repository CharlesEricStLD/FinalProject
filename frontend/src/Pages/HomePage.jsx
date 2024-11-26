//Home Page component rendering the Home Page 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Typeahead } from "../components/Typeahead"
import {styled} from "styled-components"
import { NavLink } from "react-router-dom";


export const HomePage = () => {

const navigate = useNavigate();

const [regions, setRegions] = useState(null);

useEffect(() => {
  fetch(`/api/allRegions`)
  .then((response) => response.json())
  .then((data) => {
    if (data.message = "Request sucessfull: ") {
      setRegions(data.data)
    }
  })
  .catch((error) => {
    console.error(`Error fetching center details for all region:`, error);
});
},[])

const handleChange = (domElement => {
const regionSelected = domElement.target.value; 
navigate(`region/${regionSelected}`)
})

return (
  <HomePageStyled>
  <InputAndImageBlock>
  <div className="flex1">
  <p>Quebec CrossCountry Finder!</p>
  {/* //todo Add the toggle when sign in/Sin out between log IN and My account */}
  <button>
  <NavLink role="button" to="/login"></NavLink>Log In
  </button>
  </div>
  <div className="flex2">

  </div>

  </InputAndImageBlock>
  <FeaturesBlock></FeaturesBlock>
  <HowItWorkBlock></HowItWorkBlock>




  {/* <img src="./homePageBanner.jpg"></img>
  <h1>Quebec CrossCountry Finder!</h1>
  <FinderElementContainer>
  <Typeahead/>
  <select onChange={(domElement) => {handleChange(domElement)}}>
  <option>Filter by region</option>
    {regions && regions.map(region => 
    <option key={region}>{region}</option>)}
  </select>
  </FinderElementContainer> */}
  </HomePageStyled>
)

}

const HomePageStyled = styled.div`
height:200vh;
font-size: 1.2em;
border: solid pink;
overflow: hidden;
display: grid;
grid-template-rows: 1.5fr 1.25fr 2fr;

h1{
  text-align: center;
  width:85%;
  margin: auto;
  padding-top: 10%;
  font-size: 3.2em;
}

img{
  width: 99%;
  height: 100%;
  position:absolute;
  top:-0.2%;
  z-index: -1;
  opacity: 80%;
}
`
const InputAndImageBlock = styled.div`
  border:solid 2px;
  display: flex;
  flex-direction: column;

  div.flex1{
    padding: 1em 1em;
    
    p{
      display: inline;
    }

    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }

  button{
    color:white;
    width:10%;
    padding:0.5em;
  }

`
const FeaturesBlock = styled.div`
  border:solid 2px;
`

const HowItWorkBlock = styled.div`
  border:solid 2px;
`



const FinderElementContainer = styled.div`
margin-top:2%;
margin-right:2%;
margin-left: 2%;
display:grid;
grid-template-columns: 0.75fr 0.25fr;
height: max-content;
border-radius:15px;
border: solid black;
font-size: 1.5em;
position: relative;

select {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  margin:0;
  font-size: 1.2em;
  position:absolute;
  right:9%;
  top:20%
}

option{
  background-color: rgba(0, 0, 0, 0);
  text-decoration: none;
}

`
