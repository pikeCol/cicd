import React, {useState} from "react";
import styled from "styled-components"
//import { MenuItem } from "@mui/material";


//custom tag "Navbarwrapper" which is a div tag element
export const NavbarWrapper = styled.div`

.logogo{
color:#000000
}
.logogo:hover {
  filter: drop-shadow(0 0 1em #646cffaa);
}

.navLinks, .profilePic {
    margin-left: auto;
}


.navLinks {
}

.links{
    opacity: 1;
}
.linksa{
    font-family: "Madeleina Sans" !important ;
    font-size: 27px;
    color: #FFB96A !important;
    padding: 0 2 0 2;
}

.search-form {
    display: flex;
    margin-left: 40px;
    align-items: center;
    background-color: #CEACD0;
    border-radius: 30px; 
    padding: 5px 15px; 
    width: 400px; 
}

.search-input {
    border: none; 
    outline: none; 
    background: transparent; 
    color: #3C096C; 
    font-family: 'Madeleina Sans' ;
    font-size: 26px; 
    flex: 1; 
    margin-left: 10px; 
}

.search-input::placeholder {
    color: #3C096C; /* Change color of placeholder text */
    font-size: 26px; /* Change font size */
    font-family: 'Madeleina Sans' ; /* Set the font family */
}


.search-button{
  background: none;
}

.custom-search-icon{
  width: 20px; /* Set appropriate width */
  height: 20px; /* Set appropriate height */
  object-fit: contain; /* Prevent image from distorting */
}

.purptangle {
    width: 100%; /* Set to the exact width to test */
    height: auto; 
    height: auto; /* Maintain aspect ratio */
display: block; /* Ensure there's no inline spacing */}

//enables the page to be responsive to 
//changes in window's dimensions
@media (max-width:1160px) {
 
  .links{
    font-size: 18px;
  }
  .npc{
    width: 45px;
    height: 45px;
  }

  .search-form{
    width: 350px;
  }
}

.npc {
  width: 60px;
  height: 60px;
  cursor: pointer;
}
`

interface DropdownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

export const ProfileContainer = styled.div`
  position: relative;
  display: inline-block;

`;

export const DropdownMenu = styled.div<DropdownMenuProps>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #FFB96A;
  font-family: 'Newake';
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  overflow: hidden;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-10px)')};
`;

export const MenuItem = styled.div`
  /* font-family: 'Newake' !important; */
  /* color: yellow !important; */
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  font-family: 'Newake' !important;
  color: #3C096C;
  padding: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;