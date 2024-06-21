// realizando las importaciones necesarias para la vista de wallpapers
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";

type Wallpaper = {
    src: string;
    title: string;
};

const wallpapers: Wallpaper[] = [
    { src: "https://jpwallpapers-content.s3.us-east-2.amazonaws.com/wallpapers-muestra-develop/adrian-newell-oyQrW45UXks-unsplash.jpg", title: "Lamborghini" },
    { src: "https://jpwallpapers-content.s3.us-east-2.amazonaws.com/wallpapers-muestra-develop/talia-cJUOTDjqBTk-unsplash.jpg", title: "" },
    { src: "https://jpwallpapers-content.s3.us-east-2.amazonaws.com/wallpapers-muestra-develop/reinhart-julian-VsXHzSdwuik-unsplash.jpg", title: "" },
    { src: "https://jpwallpapers-content.s3.us-east-2.amazonaws.com/wallpapers-muestra-develop/nikldn-t-6GW8T6Jsc-unsplash.jpg", title: "" },
    { src: "https://jpwallpapers-content.s3.us-east-2.amazonaws.com/wallpapers-muestra-develop/levi-ventura-HH_YmUHe_n4-unsplash.jpg", title: "" },
    { src: "https://jpwallpapers-content.s3.us-east-2.amazonaws.com/wallpapers-muestra-develop/giorgio-trovato-WyxqQpyFNk8-unsplash.jpg", title: "" },
    { src: "https://jpwallpapers-content.s3.us-east-2.amazonaws.com/wallpapers-muestra-develop/dean-bennett-7RCjjvfIQ1k-unsplash.jpg", title: "" },
    { src: "https://jpwallpapers-content.s3.us-east-2.amazonaws.com/wallpapers-muestra-develop/danilo-capece-Mn5vLHPLTuw-unsplash.jpg", title: "" },
    { src: "https://jpwallpapers-content.s3.us-east-2.amazonaws.com/wallpapers-muestra-develop/adrien-vajas-S5mzqeIOBB0-unsplash.jpg", title: "" },
];

export default function Wallpapers() {
  return (
    <div>
        <div className="flex justify-center mb-4">
            <h1 className="text-xl font-bold text-center">Fondos de pantalla exclusivos para ti</h1>
        </div>
        <div>
            {wallpapers.reduce<Wallpaper[][]>((rows, wallpaper, index) => {
                if (index % 2 === 0) {
                rows.push([wallpaper]);
                } else {
                rows[rows.length - 1].push(wallpaper);
                }
                return rows;
            }, []).map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-4 mb-4">
                    {row.map((wallpaper, index) => (
                        <Card
                            key={index}
                            className="w-[191px] h-[264px] flex-none"
                            shadow="sm"
                        >
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
                                <Button className="text-tiny bg-custom-pink"  radius="full" size="sm">
                                    Agregar al carrito
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ))}
        </div>
    </div>
  );
}
