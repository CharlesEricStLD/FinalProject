//component of the Typeahead
import { Combobox } from '@headlessui/react'
import {useState} from "react"


export const Typeahead = ( ) => {

const options = [{name:"TEST", region : "somewhere"}, {name : "test2", region: "canada"}];

const [selectedoption, setSelectedoption] = useState("")
const [query, setQuery] = useState('')

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
          <a href='/admin'>{option.name} {option.region}</a>
        </Combobox.Option>
      )) : "" }
    </Combobox.Options>
  </Combobox>
)

}