import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import ProgressBar from "./ProgressBar";


function ProgressCard() {
    return (
        <div className="order-1 md:order-2 w-full">
            <div className="w-full">
                <ProgressBar value={73} />
            </div>
        </div>
    );
}

export default ProgressCard;

