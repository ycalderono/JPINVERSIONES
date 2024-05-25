'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from './components/rifaSection/HeroSection';
import ImageCard from './components/rifaSection/MotoCard';
import OptionCard from './components/optionsBuySection/cardOption';
import AhorroAlaMano from '../../public/bancolombia.svg';
import Nequi from '../../public/nequi-2.svg';
import RaffleModal from './components/modalForm/ModalForm';
import { useDisclosure } from '@nextui-org/modal';
import ProgressCard from "./components/rifaSection/ProgressCard";
import { Card } from "@nextui-org/card";
import ParticipateButton from './components/rifaSection/ParticipateButton';
import WallpaperModal from './components/wallpaperModal/WallpaperModal';
import { Button } from "@nextui-org/button";
import { Input } from '@nextui-org/input';

interface PackageDetails {
  title: string;
  tickets: number;
  price: number;
  isPopular: boolean;
  discount: number;
}

export default function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPackage, setSelectedPackage] = useState<PackageDetails | null>(null);
  const [wallpaperModalOpen, setWallpaperModalOpen] = useState(false);
  const [wallpaperCount, setWallpaperCount] = useState(1);
  const [customTicketCount, setCustomTicketCount] = useState(''); // Cadena vacía en lugar de número
  const [isMounted, setIsMounted] = useState(false);

  const packageOptions = [
    { title: 'Doble Oportunidad', tickets: 2, price: 6000, isPopular: false, discount: 0 },
    { title: 'Combo de la Fortuna', tickets: 5, price: 6000, isPopular: false, discount: 0 },
    { title: 'Gran Premio Royale', tickets: 10, price: 6000, isPopular: true, discount: 20 },
  ];

  const handlePurchaseClick = (packageDetails: PackageDetails) => {
    setSelectedPackage(packageDetails);
    onOpen();
  };

  const handleCustomPurchaseClick = () => {
    const customPackage: PackageDetails = {
      title: 'Custom Package',
      tickets: Number(customTicketCount), // Convertir la cadena a número
      price: 10000 * Number(customTicketCount), // Assuming each ticket costs 10000
      isPopular: false,
      discount: 0,
    };
    setSelectedPackage(customPackage);
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

  const countdownStyle = (value: number): React.CSSProperties => ({
    '--value': value,
  } as React.CSSProperties);

  const calculateTimeLeft = () => {
    const targetDate = new Date('2024-06-01T00:00:00'); // Change this date to the target date
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

        <div className="flex flex-col items-center justify-center w-full py-4 order-5">
          {isMounted && (
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl" style={countdownStyle(timeLeft.days)}>
                  <span>{timeLeft.days}</span>
                </span>
                days
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl" style={countdownStyle(timeLeft.hours)}>
                  <span>{timeLeft.hours}</span>
                </span>
                hours
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl" style={countdownStyle(timeLeft.minutes)}>
                  <span>{timeLeft.minutes}</span>
                </span>
                min
              </div>
              <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                <span className="countdown font-mono text-5xl" style={countdownStyle(timeLeft.seconds)}>
                  <span>{timeLeft.seconds}</span>
                </span>
                sec
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center lg:hidden justify-center w-full order-6">
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
          <Card className='flex flex-col justify-center items-center w-full w-80'>
            <div className="flex flex-col justify-center items-center p-4 gap-4">
              <span className="text-sm underline text-center">¿Necesitas más? Compra la cantidad de fondos de pantalla premium que desees aquí.</span>
              <div className="flex w-full gap-2">
                <Input
                  label="Cantidad"
                  type="number"
                  value={customTicketCount}
                  onChange={(e) => setCustomTicketCount(e.target.value)}
                  placeholder="Cantidad de fondos de pantalla"
                  variant="bordered"
                  className="text-black dark:text-white font-medium text-base sm:text-base md:text-base lg:text-lg border-gray-300 dark:border-gray-700"
                />
                <Button 
                  className="text-black dark:text-white font-medium text-base sm:text-base md:text-base lg:text-lg text-center bg-custom-pink border border-gray-300 dark:border-gray-700" 
                  radius="lg" 
                  size="lg"
                  onPress={handleCustomPurchaseClick} // Usar onPress en lugar de onClick para NextUI
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </Card>
        </div>

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
