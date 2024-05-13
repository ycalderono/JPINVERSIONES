'use client';

import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import ProgressCard from "./ProgressCard";  // Importa el componente ProgressCard

function ImageCard() {
    return (
        <div className="order-1 md:order-2">
            <Card
            isFooterBlurred
            radius="lg"
            className="border-none"
            >
                <Image
                    alt="Moto NKD"
                    className="object-cover"
                    src="/NKD-125-1.png"
                /> 
                <CardFooter className="w-full  justify-between before:bg-white/10 border-white/10 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                    <ProgressCard />  {/* Ubicación de ProgressCard en el footer de la tarjeta */}
                </CardFooter>
            </Card>
        </div>
    );
}

export default ImageCard;
