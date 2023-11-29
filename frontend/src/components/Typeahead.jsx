//component of the Typeahead
import { Combobox } from '@headlessui/react'
import {useState, useEffect} from "react"


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
  <Combobox value={selectedoption} onChange={setSelectedoption} nullable>
    <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
    <Combobox.Options>
      {query? filteredPeople.map((option) => (
        <Combobox.Option key={option.name} value={option.name}>
          <a href={`/center/${option._id}`}>{option.name} {option.region}</a>
        </Combobox.Option>
      )) : "" }
    </Combobox.Options>
  </Combobox>
)

}