'use client'

import React, { useEffect, useState } from 'react';
import {  
    Table,  
    TableHeader,  
    TableBody,  
    TableColumn,  
    TableRow,  
    TableCell,
    Card,
    CardBody,
    Chip
} from "@nextui-org/react";

function ExpirationTable() {
    const [data, setData] = useState([]);

    async function fetchPantry() {
        try {
            const res = await fetch('http://localhost:5000/pantry/items/expiring', { credentials: 'include' });
            const data = await res.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchPantry();
    }, []);

    return (
        <>
            <Card>
                <CardBody>
                    <div className='max-h-[335px] overflow-y-auto m-5' id='style-4'>
                        <Table isHeaderSticky removeWrapper  aria-label="Pantry Items Table">
                            <TableHeader>
                            <TableColumn><h1>NAME</h1></TableColumn>
                            <TableColumn><h1>QUANTITY</h1></TableColumn>
                            <TableColumn><h1>PRICE ($)</h1></TableColumn>
                            <TableColumn><h1>EXPIRATION</h1></TableColumn>
                            <TableColumn><h1>CREATED</h1></TableColumn>
                            </TableHeader>
                            <TableBody>
                            {data.map(item => {
                                const expirationDate = new Date(item.expiration_date);
                                const oneWeekFromNow = new Date();
                                oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
                                const twoWeeksFromNow = new Date();
                                twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
                                const isExpiringSoon = expirationDate < oneWeekFromNow;
                                const isExpiringInTwoWeeks = expirationDate >= oneWeekFromNow && expirationDate < twoWeeksFromNow;

                                let color;
                                if (isExpiringSoon) {
                                    color = 'danger';
                                } else if (isExpiringInTwoWeeks) {
                                    color = 'warning';
                                } else {
                                    color = 'success';
                                }

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>
                                            {item.expiration_date == null ? "N/A" : <Chip color={color}>{expirationDate.toLocaleDateString()}</Chip>}
                                        </TableCell>
                                        <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default ExpirationTable;