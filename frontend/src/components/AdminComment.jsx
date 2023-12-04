//component to render each the comment
import { useContext } from "react"
import { NewCommentContext } from "../routes/RoutesIndex"
import styled from "styled-components"

export const AdminComment = ({comment}) => {

  //makebetter ULTRA
  //make the comment disapear when it's approved and possibility 
  //of deleting it and sorting it by date.

  const handleApproveComment = () => {
      fetch("/api/approvedcomment",  { 
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment : {centerId : comment.centerId, _id : comment._id  }  })
      }) 
    }

  return (
    <CommentContainer>
    <h1>Comment </h1>
    {comment.accepted?<p style={{color:"green"}}>APPROVED</p>: <p>Waiting For approval...</p>}
    <p>Comment made by {comment.username}</p>
    <p>comment made for {comment.centerId}</p>
    <p>Text : {comment.text}</p>
    <p>date : {comment.date}</p>
    <button onClick={handleApproveComment}>Approved</button>
    <button>Declined</button>
    </CommentContainer>
  )


}

const CommentContainer = styled.div`
  margin:2%;
  padding:2%;
  border-radius: 15px;
  border: solid 2px;
`