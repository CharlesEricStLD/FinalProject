//component to render each the comment

import styled from "styled-components"

export const Comment = ({comment}) => {

  console.log(comment);

  return (
    <CommentContainer>
    <p>Comment made by :  {comment.username}, {comment.date} </p>
    <p>{comment.text}</p>
    </CommentContainer>
  )
}

const CommentContainer = styled.div`
  margin:2%;
  padding:2%;
  border-radius: 15px;
  border: solid 2px;
`
