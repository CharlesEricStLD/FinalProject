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
    body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      setVerificationInProgress(false);
      if (data.message === "Request sucessfull: ") {
        setValidationMessage(`Welcome back ${data.data}!, your will be redirected to your User page in a few sec !`)
        sessionStorage.setItem("user", user.username)
        console.log(data.data.favorites);
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


  const handleLogInAsGuest = (event) => {
    setUser({username : "Guest1", password : "toyota1525**"})
    event.preventDefault();
    logInVerification();
  }

  return (
    <LoginPageStyle>
    <img src="LoginBackground (3).jpg" alt="Lady doing some cross country" />
    <form>
    <LoginModal>
      <h1>Log in</h1>
      <label>Username :
      <input type="text" name="username" onChange={(event) =>handleChange(event)}></input> 
      </label>
      <label>Password :
        <input type="password" name="password" onChange={(event) =>handleChange(event)}></input>
      </label>
      <button onClick = {handleLogIn} disabled={verificationInProgress}>Log in</button>
      {/* <button onClick = {handleLogInAsGuest} disabled={verificationInProgress}>log in as Guest</button> */}
      <p>Doesn't have an account ? You can  <a href="/signin" disabled={verificationInProgress}> sign in here </a>.</p>
      {errorMessage? <p>{errorMessage}</p> : <p>{validationMessage}</p>}
    </LoginModal>
    </form>
    </LoginPageStyle>
  )
}

const LoginPageStyle = styled.div`
border: solid 2px;
height:90vh;
position: relative;


  img {
  width: 100%;
  height:100%;
  z-index: -1;
  position: absolute;
  object-fit: fill;
  }
`

const LoginModal = styled.div`
  background-color: #ffffff7a;
  margin:5% auto;
  border: 2px solid;
  width:30%;
  height:75vh;
  display:flex;
  flex-direction: column;
  justify-content:center;
  text-align: center;
  font-size: 2em;
  padding:0 2%;
  border-radius: 15px;

  h1 {
    margin:2% 0;
  }

  label {
    font-size: 1em;
    margin-bottom: 3%;
    margin-right:1%;
  }

  input {
    margin-top: 2%;
    font-size: 1em;
    width:100%;
    text-align: center;
    font-size: 1em;
  }

  button{
    font-size: 1em;
    text-align: center;
    width:100%;
    margin:4% auto;
  }

  p{
    margin-top:2%;
  }
`