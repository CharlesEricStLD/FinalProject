import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Header} from "../src/components/Header.jsx";
import { HomePage } from "../src/components/HomePage";
import { CenterPage } from "../src/components/CenterPage";
import { AllCenterInRegion } from "../src/components/AllCenterInRegion";
import { LoginPage } from "../src/components/LogInPage";
import {UserPage} from "../src/components/UserPage.jsx"
import { SignInPage } from './components/SignInPage.jsx';
import { UserContext } from './components/UserContext.jsx';

function App() {

  const emptyUser = {
    username : "", 
    password : ""
  }

  const [user, setUser] = useState(emptyUser);


  return (
    <>
    <UserContext.Provider value = {user}>
    <Header/>
    <HomePage/>
    <CenterPage/>
    <LoginPage/>
    <UserPage/>
    <SignInPage/>
    <UserPage/>
    <AllCenterInRegion/>
    </UserContext.Provider>
    First line of Final Project CrossCountry  
    </>
  )
}

export default App
