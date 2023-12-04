//This is the navigation Bar component

import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { UserContext } from "../routes/RoutesIndex";

export const Header = () => {

    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);
    
    const [accessAllowed,setAccessAllowed] = useState(false);

    let sessionData = "" ; 
    sessionData = sessionStorage.getItem("user");

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        sessionData = "";
        setUser(null);
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