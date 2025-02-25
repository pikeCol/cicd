import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Tabs, Tab, Button, MenuItem } from '@mui/material'
import { DropdownMenu, NavbarWrapper, ProfileContainer, StyledMenuItem } from '../styles/Header.modules'
import logo from '../assets/PGL-DarkModeLogo.png'
import npc from '../assets/npc.png'
import searchIcon from '../assets/search.png'
import purptangle from '../assets/PURPTANGLE@2x.png'
import styled from 'styled-components'

const navTabs = [
  {name: "Home", path:"/"},
  {name: "Dashboard"},
  {name: "Lessons"},
  {name: "My Playlist", path:'/myplaylist'}
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleClickOutside = (e: MouseEvent) => {
    // Check if the click is outside the dropdown container
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false); // Close the dropdown if click is outside
    }
  };

  useEffect(() => {
    // Attach the event listener to detect outside clicks
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      // Remove the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <NavbarWrapper>
        <AppBar sx={{padding:"7px", backgroundColor:"#3C096C"}}>
          <Toolbar>
          <Link to="/">
            <img className="logogo" src={logo} alt='PGL Logo' style={{cursor: 'pointer' , height:'70px', width: 'auto'}}></img>
            </Link>
            <div className='inputboxes'>
            <form action="/search" method="GET" className="search-form">
            <input type="text" placeholder="Search..." aria-label="Search" className="search-input" />
          <button type="submit" className="search-button">
        <img src={searchIcon} alt="Search" className="custom-search-icon" />
    </button>
            </form>
            </div>
              <div className='navLinks'>
              {/*  
              The following is an efficient way of having the "Home", "Dashboard", etc Tabs displayed 
              on the Navigation Bar at the top of the website. This approach ensures we don't go against 
              the DRY (don't repeat yourself) principle. Instead of defining each tab as <Tab />... 
              repeatedly, we use an array navTabs ^^^ and map a property/spec on them
              */}
              {navTabs.map((nav, index) =>(
                <Link key={index} to={nav.path} className="links">
                <Tab className="linksa" label={nav.name}></Tab>
                </Link>
              ))}
              </div>
      
              <ProfileContainer ref={dropdownRef}>
              <img className='npc' src={npc} onClick={toggleDropdown}></img>
              <DropdownMenu open={isOpen}>
                <Link to="/login">
                <StyledMenuItem className='LogReg'>Login</StyledMenuItem>
                </Link>
                <StyledMenuItem>Settings</StyledMenuItem>
                {/* <MenuItem>Other Option</MenuItem> */}
                <StyledMenuItem className='Logout'>Logout</StyledMenuItem>
              </DropdownMenu>
              </ProfileContainer>
          </Toolbar>
        </AppBar>

    </NavbarWrapper>
  )
}

export default Header

