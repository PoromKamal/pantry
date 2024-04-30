import React, {useState, useEffect} from "react";
import Link from 'next/link'
import {  
  Navbar,   
  NavbarBrand,   
  NavbarContent,   
  NavbarItem,   
  NavbarMenuToggle,  
  NavbarMenu,  
  NavbarMenuItem
} from "@nextui-org/navbar";

import { Button } from "@nextui-org/button";
import axios from "axios";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const baseUrl = "http://localhost:5000/"

  const handleLogin = async () => {
    try {
      // Assuming 'login' endpoint in your backend initiates Auth0 authentication
      const response = await axios.get(baseUrl + 'login', { withCredentials: true });
  
      // Auth0 might handle everything and just need to redirect or set session on the frontend
      // Check the response or session data as per your backend setup
  
      console.log("Login initiated, check backend response for redirection or session setup.");
    } catch (err) {
      console.log('An error occurred during the login process.', err);
    }
  };
  
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <h1>PANTRY</h1>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="/dashboard">Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/features">Features</Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button color="primary" onClick={handleLogin} variant="solid">
              Sign In
            </Button>
            {/* <a href="http://localhost:5000/login">Sign In</a> */}
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="solid">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}
