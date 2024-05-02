import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

function FinanceTable({data}) {

  return (
    <Table isHeaderSticky className='w-full max-h-full overflow-hidden' aria-label="Example empty table">
      <TableHeader>
        <TableColumn className='text-center w-4/12'>Date</TableColumn>
        <TableColumn className='text-center w-4/12'>Money Spent ($)</TableColumn>
        <TableColumn className='text-center w-4/12'>Items Purchased</TableColumn>
      </TableHeader>
      <TableBody>
          {data.map(item => (
              <TableRow key={item.id}>
                  <TableCell className='text-center'>{item.created_at}</TableCell>
                  <TableCell className='text-center'>{item.totalCost}</TableCell>
                  <TableCell className='text-center'>{item.items}</TableCell>
              </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default FinanceTable;