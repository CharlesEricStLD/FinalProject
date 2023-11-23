//PAge where user can Sign in

import { useState } from "react";
import styled from "styled-components"

export const SignInPage = () => {

  const [user, SetUser] = useState(null);
  const [password, setPassword] = useState(null)

  const handleSubmit = () => {
    console.log("form Submit");
  }

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
      <h1>Sign In</h1>
      <InputContainer>
      <label> UserName :
      <input type="text"></input> 
      </label>
      <label> Password
        <input type="password"></input>
      </label>
      <button onClick={handleSubmit}>Register</button>
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