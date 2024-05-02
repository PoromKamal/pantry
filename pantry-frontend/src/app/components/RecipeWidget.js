'use client'

import React, { useEffect } from 'react';
import {Card, CardHeader, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image} from "@nextui-org/react";
import toast, { Toaster } from 'react-hot-toast';

function RecipeWidget({recipe}){
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const attributes = ['calories', 'fat', 'carbs', 'protein'];

  const handleAddToFavourites = async (id) => {
    const response = await fetch('http://localhost:5000/recipe/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({recipeId: id})
    });
    if(response.ok){
      let data = await response.json();
      if(reload != null){
        reload(false);
      }
      console.log("TOAST MADE!");
      toast(data.message, {icon: '🎉', duration: 1500});
    }
  };

  return (
    <div className='h-full w-full bg-inherit'>
      <Card isPressable onPress={onOpen} className="bg-inherit flex flex-col items-center w-full h-full">
        <CardHeader className="flex-col items-start font-medium">
          <div className='text-2xl font-light'>
            Try out this recipe!
          </div>
          <div className='text-base font-medium text-start'>
            {recipe.name}
          </div>
        </CardHeader>
        <Image
            removeWrapper={true}
            alt="Card background"
            className="object-cover rounded-xl w-11/12 h-5/6 pb-8"
            src={recipe.image_regular}
          />
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}
        classNames={{
          header: "w-full",
          body: "flex flex-col"
        }}>
        <ModalContent>
          {(onClose) => (
            <>
              <Image
                  removeWrapper = {true}
                  alt="Card background"
                  className="z-0 object-cover rounded-xl w-full h-72 pb-5 max-w-full"
                  src={recipe.image_regular}
                />
              <ModalBody>
                <div className='text-xl font-semibold'>
                  {recipe.name}
                </div>
                <div className='flex justify-around'>
                  {
                    attributes.map(attribute => (
                      <div key={attribute} className='flex flex-col'>
                        <div className='text-base uppercase font-semibold'>{attribute}</div>
                        <div className='text-sm'>{recipe[attribute]}</div>
                      </div>
                    ))
                  }
                </div>
                <div className='text-lg'>
                  Check out recipe <a target='_blank' className='font-semibold underline' href={recipe.url}>here</a>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" variant="light" onPress={() => {handleAddToFavourites(recipe.id)}}>
                  Add to Favourites
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default RecipeWidget;