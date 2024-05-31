
import React from "react";
import { Progress } from "@nextui-org/progress";

function ProgressBar({ value }) {
    return (
        <Progress
            label="Total Completado para la promocion.
            Ganador con la loteria del Huila"
            size="lg"
            value={value}
            color="success"
            showValueLabel={true}
            className="w-full text-left align-center"  // Solo necesitas esta clase aquí para ancho completo
            classNames={{
                base: "w-full",  // Asegura que la base también ocupe todo el ancho
                track: "w-full drop-shadow-md  ", // Asegura que el track ocupe todo el ancho
                indicator: "bg-gradient-to-r from-white to-custom-pink",
                label: "text-xs sm:text-xs md:text-xs lg:text-base w-2/3",
                value: "text-custom-pink text-xl sm:text-xs md:text-xs lg:text-base font-bold text-center align-center",
            }}
        />
    );
}

export default ProgressBar;
