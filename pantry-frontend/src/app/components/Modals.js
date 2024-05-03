'use client'

import React, { useEffect, useState } from 'react';

import {CalendarDate, getLocalTimeZone, parseDate, today} from "@internationalized/date";

import { IoTrashOutline, RiFunctionLine } from 'react-icons/io5';

import {  
    Table,  
    TableHeader,  
    TableBody,  
    TableColumn,  
    TableRow,  
    TableCell
} from "@nextui-org/react";

import {
    Modal, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Button, 
    useDisclosure,
    Input,
    DateInput,
    DatePicker,
    Link,
    Checkbox,
    CheckboxGroup,
    Card,
    CardBody,
    Skeleton
} from "@nextui-org/react";

function Pantry() {
    const { isOpen: isAddItemOpen, onOpen: onAddItemOpen, onOpenChange: onAddItemOpenChange } = useDisclosure();
    const { isOpen: isScanItemOpen, onOpen: onScanItemOpen, onOpenChange: onScanItemOpenChange } = useDisclosure();
    const { isOpen: isScanCartOpen, onOpen: onScanCartOpen, onOpenChange: onScanCartOpenChange } = useDisclosure();

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [expiration, setExpiration] = useState(null);

    const [file, setFile] = useState(null);

    const [recieptItems, setRecieptItems] = useState(
        [
            {
                "name": "Lorem",
                "quantity": 1,
                "price": "$6.50",
                "expiration_date": null
            },
            {
                "name": "Ipsum",
                "quantity": 1,
                "price": "$7.50",
                "expiration_date": null
            },
            {
                "name": "Dolor Sit",
                "quantity": 1,
                "price": "$48.00",
                "expiration_date": null
            },
            {
                "name": "Amet",
                "quantity": 1,
                "price": "$9.30",
                "expiration_date": null
            },
            {
                "name": "Consectetur",
                "quantity": 1,
                "price": "$11.90",
                "expiration_date": null
            },
            {
                "name": "Adipiscing Elit",
                "quantity": 1,
                "price": "$1.20",
                "expiration_date": null
            },
            {
                "name": "Sed Do",
                "quantity": 1,
                "price": "$0.40",
                "expiration_date": null
            }
        ]
    );
    
    const [selectedKeys, setSelectedKeys] = useState([]);

    async function fetchPantry() {
        try {
            const res = await fetch('http://localhost:5000/pantry/items/', { credentials: 'include' });
            const data = await res.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function addItem() {
        console.log(
            "name",name,
            "quantity",quantity,
            "price",price,
            "expiration",expiration,
        )
        try {
            const {year , month, day} = expiration;
            const expiration_date = new Date(year, month - 1, day);

            const res = await fetch('http://localhost:5000/pantry/item/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    quantity: quantity,
                    price: price,
                    expiration_date: expiration_date,
                    created_at: ''
                }),
                credentials: 'include'
            });
            if (res.ok) {
                emptyPantry();
            }
            const response = await res.json();
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    async function scanReceipt() {
        console.log(file);
        try {
            const formData = new FormData();
            formData.append('receiptBuffer', file);
    
            const res = await fetch('http://localhost:5000/pantry/scan/', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            if (res.ok) {
                emptyFile();
            }
            const response = await res.json();
            setRecieptItems(response);
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function addItems() {
        console.log("recieptItems",recieptItems)
        // only add items that are selected
        const selectedItems = recieptItems.filter((item, index) => selectedKeys.includes(index.toString()));
        console.log("adding following items",selectedItems);
        try {
            const res = await fetch('http://localhost:5000/pantry/items/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedItems),
                credentials: 'include'
            });
            if (res.ok) {
                setRecieptItems([]);
                fetchPantry();
            }
            const response = await res.json();
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function deleteItem(name) {
        try {
            const res = await fetch(`http://localhost:5000/pantry/item/${name}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.ok) {
                fetchPantry();
            }
            const response = await res.json();
            console.log(response);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function emptyPantry() {
        fetchPantry();
        setName('');
        setQuantity(0);
        setPrice(0);
        setExpiration(null);
    }

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        console.log(file);
    }

    function emptyFile() {
        setFile(null);
    }
    

    useEffect(() => {
        fetchPantry();
    }, []);

    return (
        <>
            <Modal
                isOpen={isAddItemOpen}
                onOpenChange={onAddItemOpenChange}
                placement='top-center'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Add Item</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Name"
                                    placeholder="Enter item name"
                                    variant='bordered'
                                    isRequired
                                    isInvalid={!name}
                                    errorMessage="Please enter a name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                    label="Quantity"
                                    placeholder="Enter item quantity"
                                    variant='bordered'
                                    isInvalid={isNaN(quantity)}
                                    errorMessage="Please enter a valid number"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                                <Input
                                    label="Price"
                                    placeholder="Enter item price"
                                    variant='bordered'
                                    isInvalid={isNaN(price)}
                                    errorMessage="Please enter a valid number"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <DateInput 
                                    label={"Expiration Date"} 
                                    placeholderValue={new CalendarDate(2024, 6, 12)}
                                    value={expiration}
                                    onChange={setExpiration}
                                    minValue={today(getLocalTimeZone())}
                                    className="max-w-sm"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" 
                                        variant='flat' 
                                        onPress={
                                            () => {
                                                onClose();
                                                emptyPantry();
                                            }
                                        }
                                >
                                    Close
                                </Button>
                                <Button onPress={
                                    () => {
                                        onClose();
                                        addItem();
                                    }
                                } color="primary"
                                isDisabled={!name || isNaN(price) || isNaN(quantity)}
                                >
                                    Add
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isScanItemOpen}
                onOpenChange={onScanItemOpenChange}
                placement='top-center'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Scan Reciept</ModalHeader>
                            <ModalBody>
                                <input type="file" id="fileUpload" style={{ display: 'none' }} onChange={handleFileChange} />
                                <Button onPress={() => document.getElementById('fileUpload').click()}>
                                    {file ? file.name : 'Upload Receipt'}
                                </Button>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" 
                                        variant='flat' 
                                        onPress={
                                            () => {
                                                onClose();
                                            }
                                        }
                                >
                                    Close
                                </Button>
                                <Button onPress={
                                    () => {
                                        onClose();
                                        scanReceipt();
                                        onScanCartOpen();
                                    }
                                } color="primary"
                                isDisabled={!file}
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isScanCartOpen}
                onOpenChange={onScanCartOpenChange}
                placement='top'
                size='4xl'
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>Scan Reciept</ModalHeader>
                            <ModalBody>
                            <div className="flex flex-col gap-3">
                                <Table 
                                    color="primary"
                                    defaultSelectedKeys={[]} 
                                    aria-label="Scanned Reciept Items Table"
                                >
                                    <TableHeader>
                                        <TableColumn> 
                                            <Checkbox
                                                isSelected={selectedKeys.length === recieptItems.length}  // Check if all checkboxes are selected
                                                onValueChange={(isSelected) => setSelectedKeys(isSelected ? recieptItems.map((item, index) => index.toString()) : [])}
                                                value="all"
                                            />
                                        </TableColumn>
                                        <TableColumn>NAME</TableColumn>
                                        <TableColumn>QUANTITY</TableColumn>
                                        <TableColumn>PRICE</TableColumn>
                                        <TableColumn>EXPIRATION</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {recieptItems.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Checkbox
                                                        isSelected={selectedKeys.includes(index.toString())}
                                                        onValueChange={(isSelected) => setSelectedKeys(isSelected ? [...selectedKeys, index.toString()] : selectedKeys.filter(key => key !== index.toString()))}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        aria-label='Name'
                                                        value={recieptItems[index].name}
                                                        onChange={(e) => {
                                                            const localItems = [...recieptItems];
                                                            localItems[index].name = e.target.value;
                                                            setRecieptItems(localItems);
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        aria-label='Quantity'
                                                        value={recieptItems[index].quantity}
                                                        onChange={(e) => {
                                                            const localItems = [...recieptItems];
                                                            localItems[index].quantity = e.target.value;
                                                            setRecieptItems(localItems);
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        aria-label='Price'
                                                        value={recieptItems[index].price}
                                                        onChange={(e) => {
                                                            const localItems = [...recieptItems];
                                                            localItems[index].price = e.target.value;
                                                            setRecieptItems(localItems);
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <DatePicker  
                                                        aria-label="Expiration Date"
                                                        showMonthAndYearPickers
                                                        onChange={(e) => {
                                                            const localItems = [...recieptItems];
                                                            localItems[index].expiration_date = e;
                                                            setRecieptItems(localItems);
                                                        }}
                                                        minValue={today(getLocalTimeZone())}
                                                        className="max-w-sm"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" 
                                        variant='flat' 
                                        onPress={
                                            () => {
                                                onClose();
                                                //console.log(selectedKeys);
                                                //const selectedItems = recieptItems.filter((item, index) => selectedKeys.includes(index.toString()));
                                                //console.log(selectedItems);
                                            }
                                        }
                                >
                                    Close
                                </Button>
                                <Button onPress={
                                    () => {
                                        onClose();
                                        addItems();
                                    }
                                } color="primary"
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default Modals;