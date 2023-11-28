//component to render each the comment
import { useContext } from "react"
import { NewCommentContext } from "../routes/RoutesIndex"

export const Comment = ({comment}) => {

  const {newComments, setNewComments} = useContext(NewCommentContext)

  const handleApproveComment = () => {
    comment.accepted = true;
    setNewComments(comment)
    console.log("NEW COMMENT ADD");
  }

  return (
    <>
    <h1>Comment</h1>
    <p>Comment made by {comment.username}</p>
    <p>comment made for {comment.centerId}</p>
    <p>Text : {comment.text}</p>
    <p>date : {comment.date}</p>
    <button onClick={handleApproveComment}>Approved</button>
    <button>Declined</button>
    </>
  )


}