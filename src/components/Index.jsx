//This is the route component 

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header"
import { HomePage } from "./HomePage";
import { CenterPage } from "./CenterPage";
import { AllCenterInRegion } from "./AllCenterInRegion";
import { LoginPage } from "./LogInPage";

export const Index = () => {

  return (

    <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/center/:Id" element={<CenterPage/>}></Route>
                <Route path="/region/:region/" element={<AllCenterInRegion/>} />
                <Route path="/login" element={<LoginPage/>}> </Route>
                <Route path="/:UserName" element={<UserPage/>}></Route>
                {/* <Route path="admin/orders/:orderId" element={<Admin/>}></Route> */}
            </Routes>
        </BrowserRouter>

  )


}

