'use client'

import React, {useState, useEffect} from 'react';
import FinanceGraph from '@/app/components/FinanceGraph';
import ExpirationTable from '@/app/components/ExpirationTable';
import QuickActions from '@/app/components/QuickActions';
import { Skeleton} from "@nextui-org/react";

import {
    Button,
    Table,  
    TableHeader,  
    TableBody,  
    TableColumn,  
    TableRow,  
    TableCell
} from "@nextui-org/react";
import RecipeWidget from '../components/RecipeWidget';

function Dashboard() {
  const [purchaseHistoryData, setPurchaseHistoryData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [isRecipeLoaded, setIsRecipeLoaded] = useState(false);

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

        // Fetch recipe
        const responseRecipe = await fetch('http://localhost:5000/recipe/', {credentials: 'include'});
        if(responseRecipe.ok){
          const data = await responseRecipe.json();
          if(data.recipes){
            let randomIndex = Math.floor(Math.random() * data.recipes.length);
            let randomRecipe = data.recipes[randomIndex];
            randomRecipe.fat = parseFloat(randomRecipe.fat).toFixed(2);
            randomRecipe.protein = parseFloat(randomRecipe.protein).toFixed(2);
            randomRecipe.carbs = parseFloat(randomRecipe.carbs).toFixed(2);
            randomRecipe.calories = parseFloat(randomRecipe.calories).toFixed(2);
            setRecipe(randomRecipe);
            setIsRecipeLoaded(true);
          }
        }

      } catch (error) {
        console.error(error);
      }
    }
    getPurchaseHistory();
  }, []);

  const renderSkeleton = () =>{
    return (
      <div class="grid grid-rows-2 grid-cols-3 gap-4 w-full h-full">
        <Skeleton className='col-span-2 bg-stone-50 rounded-lg shadow-lg w-full h-full'/>
        <Skeleton disableAnimation className='col-span-1 bg-stone-50 rounded-lg shadow-lg w-full h-full'/>
        <Skeleton disableAnimation className='col-span-1 bg-stone-50 rounded-lg shadow-lg w-full h-full'/>
        <Skeleton  className='col-span-2 bg-stone-50 rounded-lg shadow-lg w-full h-full'/>
      </div>
    )
  }
  
  return (
    <>
      {
        !(isDataLoaded && isRecipeLoaded) ? renderSkeleton() : 
        <div class="grid grid-rows-2 grid-cols-3 gap-4 w-full h-full">
          <div className='col-span-2 rounded-lg shadow-lg'>
            <FinanceGraph title={"Spending YTD."} width={1050} height={250} data={purchaseHistoryData} />
          </div>
          <div class="rounded-lg shadow-lg">
            <RecipeWidget recipe={recipe} />
          </div>
          <div class="flex justify-center col-span-1 rounded-lg shadow-lg">
            <QuickActions/>
          </div>
          <div className='col-span-2'>
            <ExpirationTable />
          </div>
        </div>
      }
    </>
  );
}

export default Dashboard;