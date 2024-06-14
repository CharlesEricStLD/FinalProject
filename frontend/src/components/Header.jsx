//This is the navigation Bar component

import { NavLink, useNavigate} from "react-router-dom";
import styled from "styled-components"
import { useState, useEffect, useContext } from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { UserContext } from "../routes/RoutesIndex";

export const Header = () => {

    const navigate = useNavigate();

    const [user, setUser] = useContext(UserContext);
    
    const [accessAllowed,setAccessAllowed] = useState(false);

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        setUser("");
        navigate("/")
    }

    useEffect(() => {
        if (user.username) {
            setAccessAllowed(true);
        } else {
            setAccessAllowed(false);
        }
        }, [user]);



return (
            <NavBar>
                <NavItem to="/">Home</NavItem>
                {accessAllowed ? 
                <>
                <NavItem as={"button"} onClick={handleLogout}>Log out </NavItem>
                <NavItem to={`/user/${user.username}`}>My profile</NavItem>
                <NavItem to={`/map`}>Map</NavItem>
                </>
                : (
                <>
                <NavItem to="/login"> <LuUserCircle2/> </NavItem>
                <NavItem to={`/map`}>Map</NavItem>
                </>
                )
                
                }
                
            </NavBar>
)

}

const NavBar = styled.div`
    z-index: 1;
    width: 50%;
    margin-left:20% ;
    margin-top:1%;
    display: flex;
    justify-content: space-between;
    font-size: 2.5em;
    border-bottom: 4px solid;
    padding: 1%;

    button {
        font: inherit;
        font-size: 1em;
        border: none;
        font-weight: bold;
    }
`
const NavItem = styled(NavLink)`
    text-decoration: none;
    border: none;
    font-weight: bold;
    color: black;

    svg {
        font-size: 1.5em;
    }
`
