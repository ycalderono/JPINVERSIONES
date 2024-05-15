"use client";
import React from "react";
import { Button } from "@nextui-org/button";

function ParticipateButton() {
    const scrollToOptions = () => {
        const optionsSection = document.getElementById('optionCardsSection');
        if (optionsSection) {
            optionsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Button 
            className="text-black font-medium  text-base sm:text-base  md:tex-base lg:text-lg text-center text-white bg-custom-pink" 
            radius="lg" 
            size="lg"
            onPress={scrollToOptions}  // Cambiando de onClick a onPress
        >
            Participar Ahora
        </Button>
    );
}

export default ParticipateButton;
