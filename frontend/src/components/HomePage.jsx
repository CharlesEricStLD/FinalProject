//Home Page component rendering the Home Page 
import { useNavigate } from "react-router-dom";
import { Typeahead } from "./Typeahead"
import {styled} from "styled-components"


export const HomePage = () => {

const navigate = useNavigate();

const regions = ["Laurentides", "Estrie", "Mauricie"]

const handleChange = (domElement => {
const regionSelected = domElement.target.value; 
navigate(`region/${regionSelected}`)
})

return (
  <HomePageStyled>
  <img src="./homePageBanner.jpg"></img>
  <h1>Quebec CrossCountry Finder!</h1>
  <FinderElementContainer>
  <Typeahead/>
  <select onChange={(domElement) => {handleChange(domElement)}}>
  <option>Filter by region</option>
    {regions.map(region => 
    <option key={region}>{region}</option>)}
  </select>
  </FinderElementContainer>
  </HomePageStyled>
)

}

const HomePageStyled = styled.div`
height:auto;
width:auto;

h1{
  text-align: center;
  width:85%;
  margin: auto;
  padding-top: 10%;
  font-size: 4em;
}

img{
  position:fixed;
  z-index: -1;
}
`

const FinderElementContainer = styled.div`
margin-top:2%;
margin-right:2%;
margin-left: 2%;
display:grid;
grid-template-columns: 0.75fr 0.25fr;
height: max-content;
height:auto;
border-radius:15px;
border: solid black;
font-size: 1.5em;

select {
  background-color: rgba(0, 0, 0, 0);
  border: none;
  outline: none;
  margin:0;
}

option{
  background-color: rgba(0, 0, 0, 0);
  text-decoration: none;
}

`