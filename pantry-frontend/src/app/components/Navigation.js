'use client'

import React from 'react';

import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@nextui-org/react";

function Navigation() {
    return (
        <>
            <Navbar>
                <NavbarBrand>
                    <h1>PANTRY</h1>
                </NavbarBrand>
                <NavbarContent justify='end'>
                    <NavbarItem>
                        <Link href="http://localhost:5000/user/sign-in">
                            <Button>Login</Button>
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/signup">
                            <Button color='primary'>
                                <h1>Sign Up</h1>
                            </Button>
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    );
}

export default Navigation;