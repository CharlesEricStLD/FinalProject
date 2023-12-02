//This is the navigation Bar component

import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { useState, useEffect } from "react";
import { LuUserCircle2 } from "react-icons/lu";

export const Header = () => {

    const navigate = useNavigate();
    
    const [accessAllowed,setAccessAllowed] = useState(false)

    let sessionData = "" ; 
    sessionData = sessionStorage.getItem("user");

    const handleLogout = () => {
        console.log("SESSIONCLEAR");
        sessionStorage.clear();
        sessionData = "";
        navigate("/")
    }

    //todo
    //mettre le session storage en global state.

    useEffect(() => {
        if (sessionData) {
            console.log("session DATA IS TRUE");
            setAccessAllowed(true);
        } else {
            setAccessAllowed(false);
        }
        }, [sessionData]);



return (
            <NavBar>
                <NavItem to="/">Home</NavItem>
                {accessAllowed ? 
                <>
                <NavItem as={"button"} onClick={handleLogout}>Log out </NavItem>
                <NavItem to={`/user/${sessionData}`}>My profile</NavItem>
                </>
                : (
                <NavItem to="/login"> <LuUserCircle2/> </NavItem>)}
                
            </NavBar>
)

}


const NavItem = styled(NavLink)`
    text-decoration: none;
    border: none;
    font-weight: bold;
    color: black;
`;

const NavBar = styled.div`
    z-index: 1;
    width: 50%;
    margin-left:20% ;
    margin-top:1%;
    display: flex;
    justify-content: space-between;
    font-size: 2.5em;
`