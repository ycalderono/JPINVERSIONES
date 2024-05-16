'use client';

import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';

function OptionCard({ title, tickets, price, discount, isPopular, totalTickets = 10000, onPurchaseClick }) {

    // Cálculo del precio final considerando el descuento
    const finalPrice = discount ? price * tickets * (1 - discount / 100) : price * tickets;

    // Resaltado de las tarjetas populares
    const popularBadge = isPopular ? (
        <span className="text-xs bg-yellow-400 text-white py-1 px-2 rounded-full">Popular</span>
    ) : null;


        

    return (
        <Card
            isHoverable
            isFooterBlurred
            radius="lg"
            className={`w-full h-96 w-80 flex flex-col ${isPopular ? 'border-2 border-yellow-500' : ''}`} // Resaltado opcional
        >
            <CardHeader className="flex flex-col justify-center items-start px-4 py-4 h-36">
                <div className="flex justify-between w-full items-center">
                    <p className="text-xl font-semibold">{title}</p>
                    {popularBadge}
                </div>
                <Divider className="w-full mt-4" />
                <p className="text-sm  mt-4"> Obtén {tickets} oportunidades de ganar con este paquete.</p> 
            </CardHeader>

            <CardBody className="flex flex-col justify-center items-center gap-2">
                <p className="text-3xl font-bold text-custom-blue">{tickets} Assets/Tickets</p>
                <p className="text-2xl font-bold">{`$${finalPrice.toLocaleString('es-CO')}`}</p>
                {discount > 0 && (
                    <p className="text-sm text-green-500 font-medium">{`${discount}% de descuento`}</p>
                )}

            </CardBody>
            <CardFooter className="flex justify-center py-6 text-white">
                <Button
    
                    size="lg"
                    className=" bg-custom-pink"
                    onClick={() => onPurchaseClick({
                        title,
                        price: finalPrice,
                        tickets
                    })}
                >
                    Comprar ahora
                </Button>
            </CardFooter>
        </Card>
    );
}

export default OptionCard;
