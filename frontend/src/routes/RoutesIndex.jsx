//Component that contain all the routes 



import {Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";


import { HomePage } from "../components/HomePage";
import { CenterPage } from "../components/CenterPage";
import { AllCenterInRegion } from "../components/AllCenterInRegion";
import { LoginPage } from "../components/LogInPage";
import { UserPage } from "../components/UserPage.jsx";
import { SignInPage } from '../components/SignInPage.jsx';
import { AdminPage } from '../components/AdminPage.jsx';

export const NewCommentContext = createContext();

export const UserContext = createContext();

export const RoutesIndex = () => {

  const emptyUser = {
    username : "", 
    password : ""
  }


const emptyComment = {
  username : "",
  centerID: "",
  text : "",
  date : "",
  accepted : false
  }

const [newComments, setNewComments] = useState(emptyComment)

const [user, setUser] = useState(emptyUser)

  return (
    <NewCommentContext.Provider value={{newComments, setNewComments}}>
    <UserContext.Provider value = {{user, setUser}}>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/center/:centerId" element={<CenterPage/>}></Route>
                <Route path="/admin" element={<AdminPage/>}/>
                
                <Route path="/region/:region" element={<AllCenterInRegion/>} />
                <Route path="/login" element={<LoginPage/>}> </Route>
                <Route path="/signin" element={<SignInPage/>}> </Route>
                <Route path="/user/:username" element={<UserPage/>}></Route>
            </Routes>
  </UserContext.Provider>
  </NewCommentContext.Provider>
  )

}