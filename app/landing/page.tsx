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

      <div className="flex flex-row items-center justify-center max-w-screen-lg mx-16 px-4  sm:px-8 md:px-12 lg:px-0">
        <div className="flex flex-col items-center justify-center w-[540px] h-[400px] px-4 sm:px-8 md:px-12 lg:px-0 ">
          <ImageCard />
        </div>

        <div className="flex flex-col w-1/2 px-4 sm:px-8 md:px-12 lg:px-0 mx-5 ">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-6xl font-black justify-center text-left ">
              ¡Gana una <br /> increíble Moto Crypton FI 2025!
            </h1>
          </div>          
          <div className="flex flex-col items-end justify-center ">
            <HeroSection />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center py-10 justify-center mx-16 px-4 sm:px-8 md:px-12 lg:px-0 ">
            <ProgressCard />
      </div>

      <div id="optionCardsSection" className="flex flex-col items-center justify-center my-5 max-w-6xl mx-16">
        <h2 className="text-3xl font-bold text-center my-5">
          ¡<span className="text-custom-pink">Compra</span> tus puestos fácilmente!
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center my-5 gap-7">
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
