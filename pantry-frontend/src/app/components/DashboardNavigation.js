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
    Avatar,
} from "@nextui-org/react";

function DashboardNavigation() {
    return (
        <>
            <Navbar maxWidth='full' isBordered='true'>
                <NavbarBrand>
                    <h1>PANTRY</h1>
                </NavbarBrand>
                <NavbarContent justify='end'>
                    <NavbarItem>
                        <Avatar name="SR" />
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    );
}

export default DashboardNavigation;