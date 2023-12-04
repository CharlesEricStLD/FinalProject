//PAge where user can Sign in

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { UserContext } from "../routes/RoutesIndex";

export const SignInPage = () => {

  const navigate = useNavigate();
  
  const [user, setUser] = useContext(UserContext);
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
      console.log(data);
      if (data.message === "Request sucessfull: ") {
        setValidationMessage(`Welcome ${data.data}!, your will be redirected to your User page in a few sec !`)
        setUser({username : data.data, favorites : []} )
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
    <SignInPageStyle>
    <img className="image2" src="LoginBackground (5).jpg" alt="Lady doing some cross country" />
    <img className="image1" src="LoginBackground (3).jpg" alt="Lady doing some cross country" />
    <form>
      <SignInInput>
      <h1>Sign In</h1>
      <label> UserName :
      <input type="text" name="username" onChange={(event) =>handleChange(event)}></input> 
      </label>
      <label> Password
        <input type="password" name="password" onChange={(event) =>handleChange(event)}></input>
      </label>
      
      <button onClick={handleSubmit} disabled={verificationInProgress}>Register </button>
      {errorMessage? <p>{errorMessage}</p> : <p>{validationMessage}</p>}
      </SignInInput>
    </form>
    </SignInPageStyle>
  )
}

const SignInPageStyle = styled.div`
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

const SignInInput = styled.div`
  background-color: #ffffffd4;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;  margin:5% auto;
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
    margin:3% 0;
    position: relative;
    top:-5%;
  }

  label {
    font-size: 1.2em;
    margin-bottom: 3%;
    margin-right:1%;
  }

  input {
    margin-top: 2%;
    width:100%;
    text-align: center;
    font-size: 1em;
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
    font-size: 0.8em;
    color:red;
    margin-top:2%;
  }
  `