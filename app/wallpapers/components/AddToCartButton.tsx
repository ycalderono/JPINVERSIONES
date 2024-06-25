'use client';

import { Button } from "@nextui-org/button";

export default function AddToCartButton() {
  const handleAddToCart = () => {
    // Lógica para agregar al carrito
    console.log('Agregado al carrito');
  };

  return (
    <Button 
      className="text-tiny bg-custom-pink" 
      radius="full" 
      size="sm"
      onClick={handleAddToCart}
    >
      Agregar al carrito
    </Button>
  );
}