import React from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

function FinanceRankingTable({data}) {

  return (
    <div className='flex flex-col w-3/12 max-h-full overflow-hidden'>
      <div className='w-10/12 text-2xl font-light'>Purchase Ranking</div>
      <Table isHeaderSticky className='w-full h-full pb-10 m-1' aria-label="Example empty table">
        <TableHeader>
          <TableColumn className='text-center w-4/12'>Name</TableColumn>
          <TableColumn className='text-center w-4/12'>Money Spent ($)</TableColumn>
          <TableColumn className='text-center w-4/12'>Total Items</TableColumn>
        </TableHeader>
        <TableBody>
            {data.map(item => (
                <TableRow key={item.id}>
                    <TableCell className='text-center'>{item.name}</TableCell>
                    <TableCell className='text-center'>{item.spent}</TableCell>
                    <TableCell className='text-center'>{item.items}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default FinanceRankingTable;