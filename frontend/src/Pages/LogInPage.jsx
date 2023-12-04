//This is the login Page 
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import { UserContext } from "../routes/RoutesIndex";

export const LoginPage = () => {

  //user name should be context state
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);


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
    body: JSON.stringify({user : {username : user.username, password : user.password}})
    })
    .then(response => response.json())
    .then((data) => {
      setVerificationInProgress(false);
      if (data.message === "Request sucessfull: ") {
        setValidationMessage(`Welcome back !, you will be redirected to your User page in a few sec !`)
        sessionStorage.setItem("user", user.username)
        setUser({username : data.data.username, favorites : data.data.favorites} )
        
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

  return (
    <LoginPageStyle>
    <img className="image2" src="LoginBackground (5).jpg" alt="Lady doing some cross country" />
    <img className="image1" src="LoginBackground (3).jpg" alt="Lady doing some cross country" />
    <form>
    <LoginInputs>
      <h1>Log in</h1>
      <label>Username :
      <input type="text" name="username" onChange={(event) =>handleChange(event)}></input> 
      </label>
      <label>Password :
        <input type="password" name="password" onChange={(event) =>handleChange(event)}></input>
      </label>
      <button onClick = {handleLogIn} disabled={verificationInProgress}>Log in</button>
      {/* <button onClick = {handleLogInAsGuest} disabled={verificationInProgress}>log in as Guest</button> */}
      {!validationMessage && <p>Doesn't have an account ? You can  <a href="/signin" disabled={verificationInProgress}> sign in here </a>.</p>}
      {errorMessage? <p>{errorMessage}</p> : <p>{validationMessage}</p>}
    </LoginInputs>
    </form>
    </LoginPageStyle>
  )
}

const LoginPageStyle = styled.div`
border: solid 2px;
height:90vh;
position: relative;


  .image1 {
  height:100%;
  width:50%;
  z-index: -1;
  position: absolute;
  left:50%;
  }

  .image2 {
  height:100%;
  width:50%;
  z-index: -1;
  position: absolute;
  object-fit: fill;
  }
`

const LoginInputs = styled.div`
  background-color: #ffffffd4;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;  margin:5% auto;
  width:30%;
  height:70vh;
  display:flex;
  flex-direction: column;
  justify-content:center;
  text-align: center;
  font-size: 2em;
  padding:0 2%;
  border-radius: 15px;

  h1 {
    margin:3% 0;
    position: relative;
    top:-5%;
  }

  label {
    font-size: 1em;
    margin-bottom: 3%;
    margin-right:1%;
  }

  input {
    margin-top: 2%;
    width:100%;
    text-align: center;
    font-size: 1.5em;
  }

  button{
    background-color: #2b381f;
    font-size: 1.5em;
    padding:1%;
    text-align: center;
    width:100%;
    margin:4% auto;
  }

  p{
    margin-top:2%;
  }
`