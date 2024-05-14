'use client';

import React from "react";
import HeroText from "./HeroText";
import ProgressCard from "./ProgressCard";
import ParticipateButton from "./ParticipateButton";


function HeroSection() {
    return (
        <div className="flex flex-col  md:items-start order-2 md:order-1 w-full " >
            <HeroText />
            <ParticipateButton />
        </div>
    );
}

export default HeroSection;
