//This component is use to render the comment part on each specific center Page 

import { useContext, useState } from "react"
import { Form, Input, Modal} from 'antd';
import { UserContext } from "../routes/RoutesIndex";

export const AddComments = ({centerId, centerName, OpenAddComment, onCancelAddComment}) => {

  const [comment, setComment] = useState("");

  const [user] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setComment(event.target.value);
  }

  //Function to launch when user Submit a comment
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/api/addcomment", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
  },
  body: JSON.stringify({comment :
    {username : user.username, "centerId" : centerId, text : comment, date: new Date().toLocaleDateString(), accepted : false }
  })
  })
  .then(response => response.json())
  .then ((data) => {
    console.log(data);
    if (data.status === 401) {
      setErrorMessage("You need to be log in to add comment");
    } else 
    {
      onCancelAddComment();
    }
  })
}

const [form] = Form.useForm();
  return (

    <Modal
      open={OpenAddComment}
      title="Add a review"
      okText="Add Review"
      cancelText="Cancel"
      onCancel={onCancelAddComment}
      onOk={(event) => {
        handleSubmit(event)
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <p>{new Date().toLocaleDateString()}</p>
        <p>{centerName}</p>
        <Form.Item
          name="Review"
          label="Review"
          placeholder="The condition today was ...." 
          rules={[
            {
              required: true,
              message: 'Please input some information on your review!',
            },
          ]} onChange={(event) => handleChange(event)} 
        >
        <Input />
        {errorMessage && <p>{errorMessage}</p>}
        </Form.Item>
      </Form>
    </Modal>
  );
};
