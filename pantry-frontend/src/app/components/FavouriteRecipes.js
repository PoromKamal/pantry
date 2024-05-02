'use client'

import React, {useState} from 'react';
import RecipeCard from './RecipeCard';
import { Card, Container, Row, Text, Grid} from "@nextui-org/react";

function FavouriteRecipes({data}) {
  const [recipes, setRecipes] = useState(data);
  return (
    <div className='w-full flex flex-col h-fit pt-5'>
      <div className='text-2xl font-medium'>Favourite Recipes</div>
      <div className="grid grid-cols-5 overflow-scroll h-96 p-5 overflow-y-scroll overflow-x-hidden">
        {
          recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe}/>
          ))
        }
      </div>
    </div>
  );
}

export default FavouriteRecipes;

//gap-2 grid grid-cols-5