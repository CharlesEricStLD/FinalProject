//PAge where user can Sign in

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { UserContext } from "../routes/RoutesIndex";

export const SignInPage = () => {

  const emptyUser = {
    username : "", 
    password : ""
  }

  const navigate = useNavigate();
  
  const {user, setUser} = useContext(UserContext);
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);





  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMessage("");
    setValidationMessage("");
    setVerificationInProgress(true);
    fetch("/api/signin",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then((data) => {
      setVerificationInProgress(false);
      if (data.message === "Request sucessfull: ") {
        setValidationMessage(`Welcome ${data.data}!, your will be redirected to your User page in a few sec !`)
        sessionStorage.setItem("user", user.username)
        setTimeout(() => {
          navigate(`/user/${user.username}`)
        }, 3000)
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
      setErrorMessage("");
      setValidationMessage("");
  }

  return (
    <form>
      <h1>Sign In</h1>
      <InputContainer>
      <label> UserName :
      <input type="text" name="username" onChange={(event) =>handleChange(event)}></input> 
      </label>
      <label> Password
        <input type="password" name="password" onChange={(event) =>handleChange(event)}></input>
      </label>
      
      <button onClick={handleSubmit} disabled={verificationInProgress}>Register </button>
      </InputContainer>
      {errorMessage? <p>{errorMessage}</p> : <p>{validationMessage}</p>}
    </form>
  )
}


const InputContainer = styled.div `
  display:flex;
  flex-direction : column;
  justify-content: left;

  button {
  width:50%;
  margin-top:2%;
  }
`