import React, { useContext, useState } from 'react';
import {Form, Input, Modal } from 'antd';
import { UserContext } from '../routes/RoutesIndex';

export const LoginModal = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const [validationMessage, setValidationMessage] = useState(null);
  const [verificationInProgress, setVerificationInProgress] = useState(null);
  const [user, setUser] = useContext(UserContext);


  const handleLogIn = (event) => {
    event.preventDefault();
    logInVerification()
  }

  const logInVerification = () => {
    setErrorMessage("");
    setValidationMessage("");
    setVerificationInProgress(true);

    fetch("/api/login",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({user : {username : user.username, password : user.password}})
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      setVerificationInProgress(false);
      if (data.message === "Request sucessfull: ") {
        setValidationMessage(`Welcome back !`)
        sessionStorage.setItem("user", user.username)
        console.log(data.data.favorites);
        setUser({username : data.data.username, favorites : data.data.favorites} )
        onCancel();
      } else {
        setErrorMessage(data.message);
      }
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      const valueStore = value.toLowerCase();
      setUser({...user,[name] : valueStore})
    }   
      setUser({...user, [name] : value})
      console.log(user);
      setErrorMessage("");
      setValidationMessage("");
  }

  return (
    <Modal
      open={open}
      title="Log in"
      okText="Log In"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={(event) => {
        handleLogIn(event);
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
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input a username!',
            },
          ]}
          onChange={(event) =>handleChange(event)}
        >
          <Input name='username'/>
        </Form.Item>
        <Form.Item name="password" label="password"
        rules={[
            {
              required: true,
              message: 'Please input a password',
            },
          ]} onChange={(event) =>handleChange(event)}>
          <Input type="password" name='password' />
          {validationMessage  && <p> {validationMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </Form.Item>
        <Form.Item name="modifier" className="collection-create-form_last-form-item">
        </Form.Item>
      </Form>
    </Modal>
  );
}


