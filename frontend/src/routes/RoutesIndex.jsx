//Component that contain all the routes 



import {Routes, Route } from "react-router-dom";
import { useState, createContext } from "react";

import {MapOfAllCenters} from "../Pages/MapOfAllCenters.jsx"
import { HomePage } from "../Pages/HomePage.jsx";
import { CenterPage } from "../Pages/CenterPage.jsx";
import { AllCenterInRegion } from "../components/AllCenterInRegion";
import { LoginPage } from "../Pages/LogInPage.jsx";
import { UserPage } from "../Pages/UserPage.jsx";
import { SignInPage } from '../Pages/SignInPage.jsx';
import { AdminPage } from '../Pages/AdminPage.jsx';
import {App} from '../App.jsx'

export const NewCommentContext = createContext();

export const UserContext = createContext();
export const DataContext = createContext();

export const RoutesIndex = () => {

  const emptyUser = {
    username : "", 
    password : "",
  }

  const emptyData = [];


const emptyComment = {
  username : "",
  centerID: "",
  text : "",
  date : "",
  accepted : false
  }

const [newComments, setNewComments] = useState(emptyComment)

const [user, setUser] = useState(emptyUser)

const [centersData, setCentersData] = useState(emptyData)

  return (
    <DataContext.Provider value = {[centersData, setCentersData]}>
    <UserContext.Provider value = {[user, setUser]}>
      
            <App/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/map" element={<MapOfAllCenters/>} />
                <Route path="/center/:centerId" element={<CenterPage/>} />
                <Route path="/admin" element={<AdminPage/>}/>


                <Route path="/region/:region" element={<AllCenterInRegion/>} />
                <Route path="/login" element={<LoginPage/>}/> 
                <Route path="/signin" element={<SignInPage/>}/> 
                <Route path="/user/:username" element={<UserPage/>}/>
            </Routes>
  </UserContext.Provider>
  </DataContext.Provider>
  )

}
