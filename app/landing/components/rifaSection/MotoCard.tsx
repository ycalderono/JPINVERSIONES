'use client';

import React from "react";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import ProgressCard from "./ProgressCard";  // Importa el componente ProgressCard

function ImageCard() {
  return (
    <div className="order-1 md:order-2 w-full h-96">
      <Card isFooterBlurred radius="lg" className="border-none h-full">
        <div className="relative w-full h-full">
          <Image
            alt="Moto NKD"
            className="object-cover w-full h-full"
            src="/FRAY6280.png"
          />
          <CardFooter className="absolute bottom-0 w-full justify-between bg-white/10 border-white/10 border-1 py-1 shadow-small z-10">
            <ProgressCard />  {/* Ubicación de ProgressCard en el footer de la tarjeta */}
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}

export default ImageCard;
