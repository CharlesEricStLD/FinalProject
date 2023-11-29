//Home Page component rendering the Home Page 
import { useNavigate } from "react-router-dom";
import { Typeahead } from "./Typeahead";


export const HomePage = () => {

const navigate = useNavigate();

const regions = ["Laurentides", "Estrie", "Mauricie"]

const handleChange = (domElement => {
const regionSelected = domElement.target.value; 
navigate(`region/${regionSelected}`)
})

return (
  <>
  <img src="./homePageBanner.jpg"></img>
  <h1> HOME PAGE : Welcome on the Quebec CrossCountry Finder!</h1>
  {/* <input type="text"></input> */}
  <Typeahead/>
  <select onChange={(domElement) => {handleChange(domElement)}} style={{margin:20, display:"block"}}>
  <option>Filter by region</option>
    {regions.map(region => 
    <option key={region}>{region}</option>)}
  </select>
  </>
)

}