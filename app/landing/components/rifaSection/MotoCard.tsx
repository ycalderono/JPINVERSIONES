'use client';

import React from "react";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

function ImageCard() {
  return (
    <Card isFooterBlurred radius="lg" className=" h-full w-full">
      <div className="w-full h-full">
        <Image
          alt="Moto NKD"
          className="object-cover w-full h-full object-top lg:object-cover"
          src="/FRAY6280.png"
        />
      </div>
    </Card>
  );
}

export default ImageCard;
