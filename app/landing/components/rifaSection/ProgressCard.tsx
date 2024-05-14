import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import ProgressBar from "./ProgressBar";


function ProgressCard() {
    return (
        <div className="order-1 md:order-2 w-full">
            <h3 className="w-full text-xl  font-semibold mb-2">Venta de Puestos/Tickets</h3>
            <div className="w-full">
                <ProgressBar value={73} />
            </div>
            <div className="w-full flex justify-between w-full mt-2">
                <p className="text-sm font-meidum font-style: italic">Total de puestos</p>
                <p className="text-sm font-medium text-custom-pink font-style: italic">10000</p>
            </div>

        </div>
    );
}

export default ProgressCard;

