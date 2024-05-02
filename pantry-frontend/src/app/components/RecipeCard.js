'use client'

import React, { useEffect } from 'react';
import {Card, CardHeader, CardBody, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image} from "@nextui-org/react";

function RecipeCard({recipe}){
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const attributes = ['fat', 'carbs', 'protein'];

  return (
    <div className='min-w-72 min-h-64 max-h-64 max-w-72'>
      <Card isPressable onPress={onOpen} className="flex flex-col items-center w-full h-full">
        <CardHeader className="flex-col items-start truncate font-medium">
          {recipe.name}
        </CardHeader>
        <Image
            removeWrapper={true}
            alt="Card background"
            className="object-cover rounded-xl w-11/12 h-5/6 pb-5"
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
                  Check out recipe <a className='font-semibold underline' href={recipe.url}>here</a>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default RecipeCard;