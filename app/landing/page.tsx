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
import ParticipateButton from './components/rifaSection/ParticipateButton';
import Button from '@nextui-org/button';
import WallpaperModal from './components/wallpaperModal/WallpaperModal';
export default function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPackage, setSelectedPackage] = useState('');
  const [wallpaperModalOpen, setWallpaperModalOpen] = useState(false);
  const [wallpaperCount, setWallpaperCount] = useState(1);

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

  const handleWallpaperPurchase = () => {
    setWallpaperModalOpen(true);
  };

  const scrollToTenWallpaperOption = () => {
    const tenWallpaperOption = document.getElementById('ten-wallpaper-option');
    if (tenWallpaperOption) {
      tenWallpaperOption.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-screen-lg mx-2 lg:mx-16 px-4 lg:px-0 gap-2 lg:gap-0">
        <div className="flex flex-col items-center justify-center w-full h-[200px] sm:h-[300px] md:h-[350px] lg:w-[540px] lg:h-[400px] order-3 lg:order-1">
          <ImageCard />
        </div>
        <div className="flex flex-col items-center lg:items-start justify-center w-full lg:w-1/2 order-1 lg:order-2">
          <div className="flex flex-col items-center lg:items-start justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black justify-center sm:text-center md:text-left leading-8">
              ¡Gana una <br /> increíble Moto Crypton FI 2025!
            </h1>
          </div>
          <div className="flex flex-col items-center lg:items-start justify-center">
            <HeroSection />
          </div>
          <div className="hidden lg:flex flex-col items-center lg:items-start justify-center w-full lg:mt-4">
            <ParticipateButton scrollToOption={scrollToTenWallpaperOption} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full py-4 order-4">
          <ProgressCard />
        </div>
        <div className="flex flex-col items-center lg:hidden justify-center w-full order-5">
          <ParticipateButton scrollToOption={scrollToTenWallpaperOption} />
        </div>
      </div>
      <div id="optionCardsSection" className="flex flex-col lg:flex-row items-center justify-center max-w-screen-lg mx-2 lg:mx-16 px-4 lg:px-0 gap-2 lg:gap-0">
        <h2 className="text-lg lg:text-3xl font-bold text-center my-4">
          ¡<span className="text-custom-pink">Adquiere</span> tu paquete exclusivo de fondos de pantalla!
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center my-5 gap-7">
          {packageOptions.map((option) => (
            <OptionCard
              key={option.title}
              title={option.title}
              tickets={option.tickets}
              price={option.price}
              isPopular={option.isPopular}
              discount={option.discount}
              onPurchaseClick={() => handlePurchaseClick(option)}
              id={option.title === 'Gran Premio Royale' ? 'ten-wallpaper-option' : null}
            />
          ))}
        </div>
        
        <span 
          className="text-sm py-4 underline cursor-pointer"
          onClick={handleWallpaperPurchase}
        >
          ¿Necesitas más? Compra la cantidad de fondos de pantalla premium que desees aquí.
        </span>
        
        <Card className='flex flex-col justify-center items-center w-full h-24'>
          <div className="flex flex-row justify-center items-center my-5 gap-5">
              <AhorroAlaMano className="size-32 my-5" />
              <Nequi className="size-16 my-5" />
          </div>
        </Card>
      </div>
      <RaffleModal isOpen={isOpen} onOpenChange={onClose} packageDetails={selectedPackage} />
      <WallpaperModal isOpen={wallpaperModalOpen} onClose={() => setWallpaperModalOpen(false)} setWallpaperCount={setWallpaperCount} />
    </React.Fragment>
  );
}