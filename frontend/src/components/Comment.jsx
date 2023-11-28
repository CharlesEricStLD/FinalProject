//component to render each the comment

export const Comment = ({comment}) => {

  return (
    <>
    <h1>Comment</h1>
    <p>Comment made by {comment.username}</p>
    <p>Text : {comment.text}</p>
    <p>date : {comment.date}</p>
    </>
  )


}