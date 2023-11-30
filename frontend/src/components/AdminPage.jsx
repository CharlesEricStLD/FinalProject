//Admin Page where we see all comments 

import { useEffect, useState} from "react"
import { AdminComment } from "./AdminComment";
import { NewCommentContext } from "../routes/RoutesIndex";

export const AdminPage = () => {

const [allComments, setAllComments] = useState(null);

//makebetter
//Pass allComments to my subcomponent and modify this array in the 
//adminComment component so I rerender


//fetchAllCommentsAndShowThem
useEffect(() => {
fetch("/api/admin/allcomments")
.then(response => response.json())
.then((data) => {
  if (data.message === "Request sucessfull: ") {
    setAllComments(data.data)
  }
})
}, [])

  return (
    <>
    <h1>Admin PaGE</h1>
    {allComments && allComments.map(comment => 
    <AdminComment key={comment._id} comment = {comment}/>
    )
    }
    </>

  )

}