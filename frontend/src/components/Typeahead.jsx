//component of the Typeahead
import {ComboBox, Item, Section} from '@adobe/react-spectrum'
import {useState, useEffect, useContext} from "react"
import {styled} from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import {DataCentersContext} from "../routes/RoutesIndex"

export const Typeahead = ( ) => {

const navigate = useNavigate();
const [options, setOptions] = useState([]);
const [centersData, setCentersData] = useContext(DataCentersContext);
const [center, setCenter] = useState(null);

//Fetch from server to get all center
useEffect(() => {

  fetch("/api/allcentersinformation")
  .then(response => response.json())
  .then(data => {
    if (data.message === "Request sucessfull: ") {
      setCentersData(data.data)
    } else {
      console.err(data.message);
    }
  })

},[])

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



// todo Check aria-Label and delete Headless UI : https://react-spectrum.adobe.com/react-aria/ComboBox.html#state

const filteredCentersArray =
  centersData.filter((center) => {
        return center.name.toLowerCase();
      })

return (
  centersData ? (
  
  <TypeaheadStyle>
  {console.log(filteredCentersArray)}
  {/* <div className='combobox-container'> */}
  <ComboBox
        defaultItems={filteredCentersArray}
        onSelectionChange={setCenter}>
        {center => <Item key={center._id}>{center.name}</Item>}
  </ComboBox>  
  {/* <Link to={`/center/${option._id}`}>{option.name}, {option.region}</Link> */}  
  <select onChange={(domElement) => {handleChange(domElement)}}>
    <option value="" disabled>Filter by region</option>
    {regions && regions.map(region => 
    <option key={region}>{region}</option>)}
  </select>
  </TypeaheadStyle>
  ) : <Loader/>
)
}

const TypeaheadStyle = styled.div`
    border:solid black;
    border-radius: 15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: none;
    margin:none;
    padding:0.5em;

    div.combobox-container{
      display: flex;
      flex-direction: column;
      width:75%;
    }

input {
    background: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
    align-items: left;
    padding:0.5%;
    height: 2em;
    object-fit: fill;
    font-size: 1.2em;
    width:75%;
}

input:focus-visible {
  border:none;
  outline:none;
}

Link{
  text-decoration: none;
}

ul, a, li {
  list-style: none;
  font-size: 1em;
  padding:0.5%;
}

a {
  text-decoration: none;
  color:black;
}

ul > li:hover {
font-weight: bold;
border:none;
background-color: #0062ff46;
text-decoration: none;
}

select{
  width:max-content;
  margin-left:0.5em;
  height: 2em;
  font-size: 1.2em;
  border: none;
  outline: none;
  align-items: left;
}

`

