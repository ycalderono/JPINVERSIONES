import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";

export default function Home() {
	return (
		<section className="relative flex flex-col items-center justify-center gap-4  md:py-10 bg-black text-white">
		<h1 className="text-3xl font-bold mb-8 mt-8">JP Wallpapers</h1>
		<div className=" flex justify-center mb-4">
        <video
			src="home.mp4"
			className="h-[500px] w-[500px] object-cover" 
			autoPlay
			loop
			muted
			playsInline
			/>
		</div>

		<div className="flex flex-col mb-8 mt-8 ">

			<span className="text-center text-xs font-bold ">Transforma tu dispositivo con lujo y elegancia.</span>
			<span className="text-xs font-normal text-center ">Fondos premium para quienes buscan exclusividad y estilo único.</span>
		</div>
		<div className="flex gap-4">
			<Button
				className="text-black leading-6 font-medium  text-base sm:text-base  md:tex-base lg:text-lg text-center text-white bg-custom-pink w-[147px]" 
				radius = "lg"
				size = "md"
			>
				Promociones
		  	</Button>
			<Button
				className="text-black font-medium leading-6  text-base sm:text-base  md:tex-base lg:text-lg text-center text-white bg-custom-pink w-[147px]" 
				radius = "lg"
				size = "md">
				Comprar ahora
		  	</Button>
		</div>
	  </section>
	);
  }
  
  
  
  
