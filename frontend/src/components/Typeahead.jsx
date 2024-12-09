//component of the Typeahead
import {ComboBox, Item, Section, View} from '@adobe/react-spectrum'
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

// todo Style the Combox input: https://react-spectrum.adobe.com/react-aria/ComboBox.html#state
//todo : see that : https://argos-ci.com/blog/react-aria-migration


const filteredCentersArray =
  centersData.filter((center) => {
        return center.name.toLowerCase();
      })

const ComboboxStyling = {
    background: "rgba(0, 0, 0, 0)",
    backgroundColor:"blue",
    border: "none",
    outline: "none",
    alignItems: "left",
    padding:"0.25em",
    height: "2em",
    fontSize: "1.2em",
    width:"400%",
  }


return (
  centersData ? (
  
  <TypeaheadStyle>
  {/* {console.log(filteredCentersArray)} */}
  {/* <div className='combobox-container'> */}
  
  <ComboBox width='size-6000' flex="5" padding="size-6000" backgroundColor="" aria-labelledby="Search for center"
        defaultItems={filteredCentersArray}
        onSelectionChange={(key) => {
          const selectedCenter = filteredCentersArray.find(center => center._id === key);
          if (selectedCenter) {
              navigate(`/center/${selectedCenter._id}`);
          }
      }} >
        {center => <Item key={center._id}>{center.name}</Item>}
  </ComboBox> 
  {/* </div>  */}
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
    justify-content:start;
    margin:none;
    padding:0.5em;
    width:50%;
    margin:auto;

input {
    border: none;
    outline: none;
    font-size: 1.2em;
}

input:focus-visible {
  border:none;
  outline:none;
}

/* Link{
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
} */

/* ul > li:hover {
font-weight: bold;
border:none;
background-color: #0062ff46;
text-decoration: none;
} */

select{
  width:max-content;
  margin-left:2%;
  height: 2em;
  font-size: 1.2em;
  border: none;
  outline: none;
  align-items: left;
}

`

