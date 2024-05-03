import React from 'react';
import {
    Button,
    Card, 
    CardBody, 
    CardFooter, 
    CardHeader,
    Image
} from "@nextui-org/react";

import { IoReceiptOutline, IoAddCircleOutline } from "react-icons/io5";


function QuickActions() {
    return (
        <div className='flex flex-col justify-center'>
            <div className='text-3xl font-semibold pl-10' ><p style={{ letterSpacing: '0.01px' }}>Quick Actions</p></div>
            <div>
                <div className='flex justify-center shrink m-5'>
                    <div className='p-5'>
                        <Card isPressable className="col-span-12 sm:col-span-4 h-[200px]">
                            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                <h4 className="text-white font-medium text-large" style={{ textShadow: '5px 5px 8px rgba(0, 0, 0, 1)' }}>
                                    Insert Item
                                </h4>
                                <p className="text-tiny text-white/100 uppercase font-bold" style={{ textShadow: '5px 2px 8px rgba(0, 0, 0, 1)' }}>
                                    Manual Entry
                                </p>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Card background"
                                className="z-0 w-full h-full object-cover"
                                src="/add0.jpg"
                            />
                        </Card>
                    </div>
                    <div className='p-5'>
                        <Card isPressable className="col-span-12 sm:col-span-4 h-[200px]">
                            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                <h4 className="text-white font-medium text-large" style={{ textShadow: '5px 5px 8px rgba(0, 0, 0, 1)' }}>
                                    Scan Reciept
                                </h4>
                                <p className="text-tiny text-white/100 uppercase font-bold" style={{ textShadow: '5px 2px 8px rgba(0, 0, 0, 1)' }}>
                                    Take a picture
                                </p>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Card background"
                                className="z-0 w-full h-full object-cover"
                                src="https://cdn.pixabay.com/photo/2024/02/16/12/36/supermarket-8577513_1280.jpg"
                            />
                        </Card>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default QuickActions;