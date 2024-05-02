'use client'
import React, {useState, useEffect} from 'react';
import FinanceGraph from '@/app/components/FinanceGraph';
import FinanceTable from '@/app/components/FinanceTable';
import FinanceRankingTable from '@/app/components/FinanceRankingTable';
import {Skeleton} from "@nextui-org/react"

function Finance() {
  const [purchaseHistoryData, setPurchaseHistoryData] = useState(null);
  const [purchaseRankingList, setPurchaseRankingList] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isRankingLoaded, setIsRankingLoaded] = useState(false);
  useEffect(() =>{
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

    const getPurchaseRanking = async () => {
      try {
        const response = await fetch('http://localhost:5000/finance/getTopItems', {credentials: 'include'});
        const data = await response.json();
        if(data.topItems){
          setPurchaseRankingList(data.topItems);
          setIsRankingLoaded(true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getPurchaseHistory();
    getPurchaseRanking();
  }, []);

  const renderSkeleton = () =>{
    return (
      <div class="grid grid-rows-2 grid-cols-3 gap-4 w-full h-full">
        <Skeleton className='col-span-2 bg-stone-50 rounded-lg shadow-lg w-full h-full'/>
        <Skeleton disableAnimation className='row-span-2 bg-stone-50 rounded-lg shadow-lg w-full h-full'/>
        <Skeleton  className='col-span-2 bg-stone-50 rounded-lg shadow-lg w-full h-full'/>
      </div>
    )
  }
  
  return (
    <div className='w-full flex h-full max-h-[88vh] justify-around'>
      {!isDataLoaded ? renderSkeleton() :  
        <div className='flex flex-col items-center max-h-full w-7/12'> 
          <FinanceGraph title={"Spending YTD."} width={1100} height={300} data={purchaseHistoryData} />
          <FinanceTable data={purchaseHistoryData}/>
        </div>
      }
      {
        !isRankingLoaded ? <p></p> : <FinanceRankingTable data={purchaseRankingList}/>
      }
    </div>
  );
}

export default Finance;