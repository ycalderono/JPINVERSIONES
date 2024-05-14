
import React from "react";
import { Progress } from "@nextui-org/progress";

function ProgressBar({ value }) {
    return (
        <Progress
            label="Total Vendido"
            size="lg"
            value={value}
            color="success"
            showValueLabel={true}
            className="w-full"  // Solo necesitas esta clase aquí para ancho completo
            classNames={{
                base: "w-full",  // Asegura que la base también ocupe todo el ancho
                track: "w-full drop-shadow-md  ", // Asegura que el track ocupe todo el ancho
                indicator: "bg-gradient-to-r from-white to-custom-pink",
                label: "text-md",
                value: "text-custom-pink text-base font-bold",
            }}
        />
    );
}

export default ProgressBar;
