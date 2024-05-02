'use client'

import React, {useState} from 'react';
import RecipeCard from './RecipeCard';
import { Card, Container, Row, Text, Grid} from "@nextui-org/react";

function DailyRecipe({data}) {
  const [recipes, setRecipes] = useState(data);
  return (
    <div className='w-11/12 flex flex-col h-fit'>
      <div className='text-2xl font-medium'>Today's Recipes</div>
      <div className="flex gap-10 overflow-scroll h-5/6 p-5 overflow-y-hidden">
        {
          recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe}/>
          ))
        }
      </div>
    </div>
  );
}

export default DailyRecipe;

//gap-2 grid grid-cols-5