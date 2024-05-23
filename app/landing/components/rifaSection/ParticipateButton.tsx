import React from "react";
import { Button } from "@nextui-org/button";

function ParticipateButton({ scrollToOption }) {
    return (
        <Button 
            className="text-black font-medium  text-base sm:text-base  md:tex-base lg:text-lg text-center text-white bg-custom-pink" 
            radius="lg" 
            size="lg"
            onPress={scrollToOption}  // Cambiando de onClick a onPress
        >
            Participar Ahora
        </Button>
    );
}

export default ParticipateButton;
