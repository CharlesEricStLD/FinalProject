//This is the login Page 
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";


export const LoginPage = () => {

  //user name should be context state


  const navigate = useNavigate();

  const handleSignIn = () => {
      navigate("/signin")
  }

  const [user, SetUser] = useState(null);
  const [password, setPassword] = useState(null)
  
  //FETCH POST

  //BAckedn : 
  //Add user to db with : 
  // user = {
    // username : "BOB", (LOWERCASE in BACKEND)
    // password : "pass1" 
  //}
  //


  return (
    <form>
      <h1>LOGIN PAGE </h1>
      <InputContainer>
      <label> UserName :
      <input type="text"></input> 
      </label>
      <label> Password
        <input type="password"></input>
      </label>
      <button>log in</button>
      <button onClick = {handleSignIn}>Sign in</button>
      <button>log in as Guest</button>
      </InputContainer>
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