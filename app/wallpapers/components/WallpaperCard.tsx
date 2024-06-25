'use client';

import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import AddToCartButton from './/AddToCartButton';
import { Wallpaper } from '../utils/wallpaperData';

type WallpaperCardProps = {
  wallpaper: Wallpaper;
};

export default function WallpaperCard({ wallpaper }: WallpaperCardProps) {
  return (
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
        <AddToCartButton />
      </CardFooter>
    </Card>
  );
}