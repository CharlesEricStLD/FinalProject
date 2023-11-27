//This component is use to render the comment part on each specific center Page 

import { useState } from "react"

export const AddComments = ({centerId, centerName}) => {

  const [comment, setComment] = useState("");


  const handleChange = (event) => {
    setComment(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/addcomment", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
  },
  body: JSON.stringify({comment :
    {username: "boby", "centerId" : centerId, text : comment, date: Date().toLocaleString(), accepted : false }})
    //makeBetterVery
    //store the data a Context errorLog so I can watch it in admin mode
  })
  .then(response => response.json())
  .then(data)
}

  return (
    <form>
      <p>{Date().toLocaleString() + ""}</p>
      <p>{centerName}</p>
      <label>Your update/Review</label>
      <input onChange={(event) => handleChange(event)} type="text" placeholder="The condition today was ...."></input>
      <button type="submit" onClick={(event) => handleSubmit(event)}>Submit</button>
    </form>
  )


}