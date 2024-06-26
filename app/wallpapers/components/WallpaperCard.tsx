'use client';

import { useState } from 'react';
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import AddToCartButton from './AddToCartButton';
import RaffleModal from '@/app/landing/components/modalForm/ModalForm';
import WallpaperPurchaseModal from './modalForm/WallpaperPurchaseModal';  // Ajusta la ruta según sea necesario
import { Wallpaper } from '../utils/wallpaperData';

type WallpaperCardProps = {
  wallpaper: Wallpaper;
};

export default function WallpaperCard({ wallpaper }: WallpaperCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const packageDetails = {
    title: wallpaper.title,
    price: 18900,  // Asegúrate de que este precio venga de los datos del wallpaper
    tickets: 1,    // Ajusta según sea necesario
  };

  return (
    <>
      <Card className="w-[191px] h-[264px] flex-none" shadow="sm">
        <CardBody className="p-0">
          <Image
            src={wallpaper.src}
            alt={wallpaper.title}
            className="w-[191px] h-[264px] object-cover"
          />
        </CardBody>
        <CardFooter className="absolute bg-black/40 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-white text-tiny">$18900 COP</p>
          </div>
          <AddToCartButton onAddToCart={handleAddToCart} />
        </CardFooter>
      </Card>

      <WallpaperPurchaseModal 
      isOpen={isModalOpen} 
      onOpenChange={setIsModalOpen}
      wallpaperDetails={{
        title: wallpaper.title,
        price: 18900,  // Asegúrate de que este precio venga de los datos del wallpaper
      }}
    />
    </>
  );
}