'use client';

import React from "react";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import ProgressCard from "./ProgressCard";  // Importa el componente ProgressCard

function ImageCard() {
  return (
    <div className="order-1 md:order-2 w-full h-auto sm:w-[100px] sm:h-[100px] md:w-[250px] md:h-[250px] lg:w-[540px] lg:h-[400px]">
      <Card isFooterBlurred radius="lg" className="border-2 border-white/10 h-full w-full">
        <div className="w-full h-full">
          <Image
            alt="Moto NKD"
            className="object-cover w-full h-full sm:w-[100px] sm:h-[100px] md:w-[100px] md:h-[100px] lg:w-[540px] lg:h-[400px]"
            src="/FRAY6280.png"
          />
          {/* <CardFooter className="absolute bottom-0 w-full justify-between bg-white/10 border-white/10 border-1 py-1 shadow-small z-10">
            <ProgressCard />  
          </CardFooter> */}
        </div>
      </Card>
    </div>
  );
}

export default ImageCard;

