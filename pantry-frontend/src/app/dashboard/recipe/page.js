'use client'

import DailyRecipe from '@/app/components/DailyRecipe';
import FavouriteRecipes from '@/app/components/FavouriteRecipes';
import React, {useState, useEffect} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {Skeleton} from "@nextui-org/react"

function Recipe() {
  const [getDailyRecommendation, setDailyRecommendation] = useState(null);
  const [isDailyLoaded, setIsDailyLoaded] = useState(false);
  const [favouriteRecipes, setFavouriteRecipes] = useState(null);
  const [isFavouriteLoaded, setIsFavouriteLoaded] = useState(false);
 
  const retreiveFavourites = async () => {
    try {
      const response = await fetch('http://localhost:5000/recipe/favourites', {credentials: 'include'});
      const data = await response.json();
      if(data.recipes){
        // Convert fat, protein, and carbs to decimal
        data.recipes.forEach(recipe => {
          recipe.fat = parseFloat(recipe.fat).toFixed(2);
          recipe.protein = parseFloat(recipe.protein).toFixed(2);
          recipe.carbs = parseFloat(recipe.carbs).toFixed(2);
          recipe.calories = parseFloat(recipe.calories).toFixed(2);
        });
        setFavouriteRecipes(data.recipes);
        setIsFavouriteLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(isFavouriteLoaded){
      return;
    }
    retreiveFavourites();
  }, [isFavouriteLoaded])

  

  useEffect(() => {
    const getRecommendation = async () => {
      try {
        const response = await fetch('http://localhost:5000/recipe/', {credentials: 'include'});
        const data = await response.json();
        if(data.recipes){
          // Convert fat, protein, and carbs to decimal
          data.recipes.forEach(recipe => {
            recipe.fat = parseFloat(recipe.fat).toFixed(2);
            recipe.protein = parseFloat(recipe.protein).toFixed(2);
            recipe.carbs = parseFloat(recipe.carbs).toFixed(2);
            recipe.calories = parseFloat(recipe.calories).toFixed(2);
          });
          setDailyRecommendation(data.recipes);
          setIsDailyLoaded(true);
        }

      } catch (error) {
        console.error(error);
      }
    }
    getRecommendation();
  }, []);

  
  const renderSkeleton = () =>{
    return (
      <div class="grid grid-rows-2 grid-cols-3 gap-4 w-full h-full">
        <Skeleton className='col-span-3 bg-stone-50 rounded-lg shadow-lg w-full h-full'/>
        <Skeleton className='row-span-3 bg-stone-50 rounded-lg shadow-lg w-full h-full'/>
      </div>
    )
  }
  
  return (
    <div className='w-full h-full flex max-h-[88vh] flex-col'>
      <Toaster/>
      {
        !isDailyLoaded ? renderSkeleton() : 
        <div className='flex flex-col h-full max-h-full'> 
          <DailyRecipe reload={setIsFavouriteLoaded} data={getDailyRecommendation}/>
          { !isFavouriteLoaded ? <p>Loading...</p> : <FavouriteRecipes data={favouriteRecipes}/>}
        </div>
      }
    </div>
  );
}

export default Recipe;