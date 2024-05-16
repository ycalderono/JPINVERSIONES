'use client';

import React, { useState } from 'react';
import HeroSection from './components/rifaSection/HeroSection';
import ImageCard from './components/rifaSection/MotoCard';
import OptionCard from './components/optionsBuySection/cardOption';
import AhorroAlaMano from '../../public/bancolombia.svg';
import Nequi from '../../public/nequi-2.svg';
import RaffleModal from './components/modalForm/ModalForm';
import { useDisclosure } from '@nextui-org/modal';
import ProgressCard from "./components/rifaSection/ProgressCard";
import { Card, CardFooter } from "@nextui-org/card";

export default function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPackage, setSelectedPackage] = useState('');

  const packageOptions = [
    { title: 'Doble Oportunidad', tickets: 2, price: 6000, isPopular: false, discount: 0 },
    { title: 'Combo de la Fortuna', tickets: 5, price: 6000, isPopular: false, discount: 0 },
    { title: 'Gran Premio Royale', tickets: 10, price: 6000, isPopular: true, discount: 20 },
  ];

  const handlePurchaseClick = (packageDetails) => {
    console.log("Selected package:", packageDetails);
    setSelectedPackage(packageDetails);
    onOpen();
  };

  return (
    <React.Fragment>
       
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-screen-lg mx-2  lg:mx-16 px-4 lg:px-0 gap-4 lg:gap-0">
      


      <div className="flex flex-col w-full lg:w-1/2 px-4 sm:px-8 md:px-12 lg:px-0 mx-5 order-1 lg:order-2 sm:order-1 md:order-1">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black justify-center sm:text-center md:text-left leading-8">
          ¡Gana una <br /> increíble Moto Crypton FI 2025!
        </h1>
      </div>

        <div className="flex flex-col items-end justify-center">
          <HeroSection />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-[200px] h-auto sm:w-[200px] sm:h-[200px]  md:w-[250px] md:h-[250px] lg:w-[540px] lg:h-[400px]">
        <ImageCard />
      </div>

      </div>

      <div className="flex flex-col items-center py-10 justify-center mx-2  lg:mx-16 px-4 lg:px-0 gap-4 lg:gap-0  ">
            <ProgressCard />
      </div>

      <div id="optionCardsSection" className="flex flex-col items-center justify-center my-5 max-w-6xl mx-16">
        <h2 className="text-lg text-lg lg:text-3xl font-bold text-center my-5">
          ¡<span className="text-custom-pink ">Compra</span> tu paquete de assets fácilmente!
        </h2>
        <div className="flex flex-col  md:flex-row justify-center items-center my-5 gap-7">
          {packageOptions.map((option) => (
            console.log(option.title),
            <OptionCard
              key={option.title}
              title={option.title}
              tickets={option.tickets}
              price={option.price}
              isPopular={option.isPopular}
              discount={option.discount}
              onPurchaseClick={() => handlePurchaseClick(option)}
            />
          ))}
        </div>
        <Card className='flex flex-col justify-center items-center w-full h-24'>
        <div className="flex flex-row justify-center items-center my-5 gap-5">
            <AhorroAlaMano className="size-32 my-5" />
            <Nequi className="size-20 my-5" />
        </div>
        </Card>
      </div>
      <RaffleModal isOpen={isOpen} onOpenChange={onClose} packageDetails={selectedPackage} />
    </React.Fragment>
  );
}
