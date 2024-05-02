'use client'

import DailyRecipe from '@/app/components/DailyRecipe';
import FavouriteRecipes from '@/app/components/FavouriteRecipes';
import React, {useState, useEffect} from 'react';
import toast, { Toaster } from 'react-hot-toast';
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

  return (
    <div className='w-full flex max-h-[88vh] flex-col'>
      <Toaster/>
      {
        !isDailyLoaded ? <p>Loading...</p> : 
        <div className='flex flex-col h-full max-h-full'> 
          <DailyRecipe reload={setIsFavouriteLoaded} data={getDailyRecommendation}/>
          { !isFavouriteLoaded ? <p>Loading...</p> : <FavouriteRecipes data={favouriteRecipes}/>}
        </div>
      }
    </div>
  );
}

export default Recipe;