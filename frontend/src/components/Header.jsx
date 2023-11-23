//This is the navigation Bar component

import { NavLink } from "react-router-dom";
import styled from "styled-components"

export const Header = () => {

  return (
    <Wrapper>
            <NavBar>
                <NavItem to="/">Home</NavItem>
                <NavItem to="/login">Log in </NavItem>
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