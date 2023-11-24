//This is the navigation Bar component

import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { useState, useEffect } from "react";

export const Header = () => {


    //put username into a global state;

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
    <Wrapper>
            <NavBar>
                <NavItem to="/">Home</NavItem>
                {accessAllowed ? 
                (<NavItem onClick={handleLogout}>Log out </NavItem> ) : (
                <NavItem to="/login">Log in </NavItem>)}
                
            </NavBar>
    </Wrapper>
)

}


const NavItem = styled(NavLink)`
    text-decoration: none;
    border: solid 3px black;
    padding: 5px;
    font-weight: bold;
    color: black;
    background-color: white;

    &.active {
        background: rgb(66,133,91);
    }
`;

const NavBar = styled.div`
    position: absolute;
    z-index: 1;
    top: 85%;
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    font-size: 2em;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    background: rgb(66,133,91);
    margin-bottom: 100px;
    `