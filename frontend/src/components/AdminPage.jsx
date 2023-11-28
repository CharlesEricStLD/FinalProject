//Admin Page where we see all comments 

import { useEffect, useState} from "react"
import { Comment } from "./Comment";
import { NewCommentContext } from "../routes/RoutesIndex";

export const AdminPage = () => {

const [allComments, setAllComments] = useState(null);

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
    <Comment key={comment._id} comment = {comment}/>
    )
    }
    </>

  )

}