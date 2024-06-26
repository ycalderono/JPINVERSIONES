'use client';

import { Button } from "@nextui-org/button";

interface AddToCartButtonProps {
  onAddToCart: () => void;
}

export default function AddToCartButton({ onAddToCart }: AddToCartButtonProps) {
  return (
    <Button 
      className="text-tiny bg-custom-pink" 
      radius="full" 
      size="sm"
      onClick={onAddToCart}
    >
      Agregar al carrito
    </Button>
  );
}