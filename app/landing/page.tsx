'use client';

import React, { useState } from 'react';
import HeroSection from './components/rifaSection/HeroSection';
import ImageCard from './components/rifaSection/MotoCard';
import OptionCard from './components/optionsBuySection/cardOption';
import AhorroAlaMano from '../../public/bancolombia.svg';
import Nequi from '../../public/nequi-2.svg';
import RaffleModal from './components/modalForm/ModalForm';
import { useDisclosure } from '@nextui-org/modal';

export default function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPackage, setSelectedPackage] = useState('');

  const packageOptions = [
    { title: 'Doble Oportunidad', tickets: 2, price: 5000, isPopular: false, discount: 0 },
    { title: 'Combo de la Fortuna', tickets: 5, price: 5000, isPopular: false, discount: 0 },
    { title: 'Gran Premio Royale', tickets: 10, price: 5000, isPopular: true, discount: 20 },
  ];

  const handlePurchaseClick = (packageDetails) => {
    console.log("Selected package:", packageDetails);
    setSelectedPackage(packageDetails);
    onOpen();
  };

  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center max-w-screen-lg mx-auto px-4 sm:px-8 md:px-12 lg:px-0">
        <h1 className="text-6xl font-bold text-center my-5">
          ¡<span className="text-custom-pink">Gana</span> una Moto Crypton FI!
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center max-w-screen-lg mx-auto px-4 sm:px-8 md:px-12 lg:px-0">
        <HeroSection />
        <ImageCard />
      </div>
      <div id="optionCardsSection" className="flex flex-col items-center justify-center my-5 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center my-5">
          ¡<span className="text-custom-pink">Compra</span> tus puestos fácilmente!
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center my-5 gap-5">
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
        <div className="flex flex-row md:flex-row justify-center items-center my-5 gap-5">
          <AhorroAlaMano className="size-32 my-5" />
          <Nequi className="size-20 my-5" />
        </div>
      </div>
      <RaffleModal isOpen={isOpen} onOpenChange={onClose} packageDetails={selectedPackage} />
    </React.Fragment>
  );
}
