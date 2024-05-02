'use client'

import React from 'react';
import { usePathname } from 'next/navigation'

import {
    Link,
    Button,
} from "@nextui-org/react";

function Sidebar() {
    
    const pathname = usePathname()

    return (
        <div className='flex flex-col items-stretch justify-start h-full w-48 justify-center content-center'>
            <div className='flex justify-center content-center p-2'>
                <Link href="/dashboard">
                    <Button className="w-32" variant={`${pathname === "/dashboard" ? "solid" : "light"}`} color={`${pathname === "/dashboard" ? "primary" : ""}`} radius="sm">Home</Button>
                </Link>
            </div>
            <div className='flex justify-center content-center p-2'>
                <Link href="/dashboard/pantry">
                    <Button className="w-32" variant={`${pathname === "/dashboard/pantry" ? "solid" : "light"}`} color={`${pathname === "/dashboard/pantry" ? "primary" : ""}`} radius="sm">Pantry</Button>
                </Link>
            </div>
            <div className='flex justify-center content-center p-2'>
                <Link href="/dashboard/recipe">
                    <Button className="w-32" variant={`${pathname === "/dashboard/recipe" ? "solid" : "light"}`} color={`${pathname === "/dashboard/recipe" ? "primary" : ""}`} radius="sm">Recipe</Button>
                </Link> 
            </div>
            <div className='flex justify-center content-center p-2'>
                <Link href="/dashboard/finance">
                    <Button className="w-32" variant={`${pathname === "/dashboard/finance" ? "solid" : "light"}`} color={`${pathname === "/dashboard/finance" ? "primary" : ""}`} radius="sm">Finance</Button>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;