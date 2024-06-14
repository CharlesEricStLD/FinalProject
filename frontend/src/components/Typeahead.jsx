//component of the Typeahead
import { Combobox } from '@headlessui/react'
import {useState, useEffect, useContext} from "react"
import {styled} from "styled-components"
import { Link } from "react-router-dom";
import {DataCentersContext} from "../routes/RoutesIndex"

export const Typeahead = ( ) => {

const [options, setOptions] = useState([]);
const [centersData, setCentersData] = useContext(DataCentersContext);
const [selectedoption, setSelectedoption] = useState("")
const [query, setQuery] = useState('')


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


const filteredOptions =
  centersData.filter((option) => {
        return option.name.toLowerCase().includes(query.toLowerCase())
      })

return (
  options ? (
  <TypeaheadStyle>
  <Combobox value={selectedoption} onChange={setSelectedoption} nullable>
    <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
    <Combobox.Options>
      {query? filteredOptions.map((option) => (
        <Combobox.Option key={option.name} value={option.name}>
          <Link to={`/center/${option._id}`}>{option.name}, {option.region}</Link>
        </Combobox.Option>
      )) : "" }
    </Combobox.Options>
  </Combobox>
  </TypeaheadStyle>
  ) : <Loader/>
)

}

const TypeaheadStyle = styled.div`


input {
    background: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
    align-items: left;
    padding:0.5%;
    width:100%;
    height: 2em;
    object-fit: fill;
    font-size: 1.2em;
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
background-color: #0062ff46;
text-decoration: none;
}

`

