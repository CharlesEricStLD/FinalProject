//component of the Typeahead
import { Combobox } from '@headlessui/react'
import {useState, useEffect} from "react"
import {styled} from "styled-components"
import { Link } from "react-router-dom";


export const Typeahead = ( ) => {

// const options = [{name:"TEST", region : "somewhere"}, {name : "test2", region: "canada"}];

const [options, setOptions] = useState([]);
const [selectedoption, setSelectedoption] = useState("")
const [query, setQuery] = useState('')


//Fetch from server to get all center
useEffect(() => {

  fetch("/api/allcentersinformation")
  .then(response => response.json())
  .then(data => {
    if (data.message === "Request sucessfull: ") {
      setOptions(data.data)
    } else {
      console.err(data.message);
    }
  })

},[])



const filteredPeople =
  options.filter((option) => {
        return option.name.toLowerCase().includes(query.toLowerCase())
      })

return (
  <TypeaheadStyle>
  <Combobox value={selectedoption} onChange={setSelectedoption} nullable>
    <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
    <Combobox.Options>
      {query? filteredPeople.map((option) => (
        <Combobox.Option key={option.name} value={option.name}>
          <Link to={`/center/${option._id}`}>{option.name} {option.region}</Link>
        </Combobox.Option>
      )) : "" }
    </Combobox.Options>
  </Combobox>
  </TypeaheadStyle>
)

}

const TypeaheadStyle = styled.div`
  padding: 0 2%;


input {
    background: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
    align-items: left;
    width:100%;
    height: 3em;
    object-fit: fill;
}

ul > li:hover {
font-weight: bold;
}

`

