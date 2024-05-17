'use client';

import React from "react";
import HeroText from "./HeroText";
import ProgressCard from "./ProgressCard";
import ParticipateButton from "./ParticipateButton";


function HeroSection() {
    return (
    <div className="flex flex-col  md:items-start order-2 md:order-1 w-full " >
        <div className="flex flex-col  md:items-start order-2 md:order-1 w-full h-2/3 my-5" >
            <HeroText />
        </div>           
    </div>
    );
}

export default HeroSection;
