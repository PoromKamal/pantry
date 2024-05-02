'use client'

import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardNavigation from '../components/DashboardNavigation';

function DashboardLayout({ children }) {
    return (
        <>
            <DashboardNavigation />
            <div className="flex pt-3 w-full max-h-[91vh] min-h-[91vh]">
                <Sidebar />
                <div className='w-[88%] pt-4 pl-10 max-h-screen'>{children}</div>
            </div>
        </>
    );
}

export default DashboardLayout;