//component to render each the comment
import { useContext } from "react"
import { NewCommentContext } from "../routes/RoutesIndex"

export const AdminComment = ({comment}) => {

  //makebetter
  //Make comment into an array of object of each on each center So like that we can 
  //more easily render it

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