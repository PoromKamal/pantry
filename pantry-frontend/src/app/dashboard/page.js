'use client'

import React, {useState, useEffect} from 'react';
import FinanceGraph from '@/app/components/FinanceGraph';

import {
    Button,
} from "@nextui-org/react";

function Dashboard() {
  const [purchaseHistoryData, setPurchaseHistoryData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    const getPurchaseHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/finance/getSpending', {credentials: 'include'});
        const data = await response.json();
        if(data.spending){
          console.log(data.spending);
          const newData = data.spending.map((item) => {
            return {
              created_at: item.created_at.split('T')[0],
              totalCost: item.totalcost,
              items: item.items
            }
          });
          setPurchaseHistoryData(newData);
          setIsDataLoaded(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getPurchaseHistory();
  }, []);
  
  return (
    <>
        {!isDataLoaded ? <p>Loading...</p> :
          <div class="grid grid-rows-2 grid-cols-3 gap-4 w-full h-full">
            <div className='col-span-2 bg-stone-50 rounded-lg shadow-lg'>
              <FinanceGraph title={"Spending YTD."} width={1050} height={250} data={purchaseHistoryData} />
            </div>
            <div class="bg-stone-50 rounded-lg shadow-lg">Recipe</div>
            <div class="bg-stone-50 col-span-1 rounded-lg shadow-lg">What do we put here</div>
            <div class="bg-stone-50 col-span-2 rounded-lg shadow-lg">Top X items that are about to expire/or oldest</div>
          </div> 
        }
    </>


  );
}

export default Dashboard;