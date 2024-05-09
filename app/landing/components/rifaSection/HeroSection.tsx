import React from "react";
import HeroText from "./HeroText";
import ProgressCard from "./ProgressCard";
import ParticipateButton from "./ParticipateButton";


function HeroSection() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center my-5 w-full">
            <div className="flex flex-col md:items-start items-center justify-center order-2 md:order-1 w-full  px-4">
                <HeroText />
                <ParticipateButton />
            </div>
        </div>
    );
}

export default HeroSection;
