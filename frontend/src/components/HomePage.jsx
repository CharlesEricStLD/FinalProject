//Home Page component rendering the Home Page 
import { useNavigate } from "react-router-dom";


export const HomePage = () => {

const navigate = useNavigate();

const regions = ["Laurentides", "Estrie", "Mauricie"]

const handleChange = (domElement => {
const regionSelected = domElement.target.value; 
navigate(`region/${regionSelected}`)
})

return (
  <>
  <img src="../public/homePageBanner.jpg"></img>
  <h1> HOME PAGE : Welcome on the Quebec CrossCountry Finder!</h1>
  <input type="text"></input>
  <select onChange={(domElement) => {handleChange(domElement)}}>
  <option>Filter by region</option>
    {regions.map(region => 
    <option key={region}>{region}</option>)}
  </select>
  </>
)

}