//This is the login Page 
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import { UserContext } from "../routes/RoutesIndex";


export const LoginPage = () => {

  //user name should be context state
  const navigate = useNavigate();

  const emptyUser = {
    username : "", 
    password : ""
  }

  const {user, setUser} = useContext(UserContext);

  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [validationMessage, setValidationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
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
    body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      setVerificationInProgress(false);
      if (data.message === "Request sucessfull: ") {
        setValidationMessage(`Welcome back ${data.data}!, your will be redirected to your User page in a few sec !`)
        sessionStorage.setItem("user", user.username)
        setUser({...user, username : user.username} )
        
        setTimeout(() => {
          navigate(`/user/${user.username}`)
        }, 3000)
      } else {
        setErrorMessage(data.message);
      }
    })
  }

  const handleLogIn = (event) => {
    event.preventDefault();
    logInVerification()
  }


  const handleLogInAsGuest = (event) => {
    setUser({username : "Guest1", password : "toyota1525**"})
    event.preventDefault();
    logInVerification();
  }

  return (
    <form>
      <h1>LOGIN PAGE </h1>
      <InputContainer>
      <label> UserName :
      <input type="text" name="username" onChange={(event) =>handleChange(event)}></input> 
      </label>
      <label> Password
        <input type="password" name="password" onChange={(event) =>handleChange(event)}></input>
      </label>
      <button onClick = {handleLogIn} disabled={verificationInProgress}>Log in</button>
      <button onClick = {handleLogInAsGuest} disabled={verificationInProgress}>log in as Guest</button>
      <a href="/signin" disabled={verificationInProgress}>Sign In</a>
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