import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Header} from "../src/components/Header.jsx";
import { HomePage } from "../src/components/HomePage";
import { CenterPage } from "../src/components/CenterPage";
import { AllCenterInRegion } from "../src/components/AllCenterInRegion";
import { LoginPage } from "../src/components/LogInPage";
import {UserPage} from "../src/components/UserPage.jsx"
import { SignInPage } from './components/SignInPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/center/:centerId" element={<CenterPage/>}></Route>
                <Route path="/region/:region" element={<AllCenterInRegion/>} />
                <Route path="/login" element={<LoginPage/>}> </Route>
                <Route path="/signin" element={<SignInPage/>}> </Route>
                <Route path="/user/:username" element={<UserPage/>}></Route>
                {/* <Route path="admin/orders/:orderId" element={<Admin/>}></Route> */}
            </Routes>
        </BrowserRouter>
)


