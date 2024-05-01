'use client'

import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardNavigation from '../components/DashboardNavigation';

function DashboardLayout({ children }) {
    return (
        <>
            <DashboardNavigation />
            <div className="flex pt-6">
                <Sidebar />
                <div className='pt-4 pl-10'>{children}</div>
            </div>
        </>
    );
}

export default DashboardLayout;