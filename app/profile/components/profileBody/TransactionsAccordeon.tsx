"use client";

import React from 'react';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";

interface TransactionDetails {
  itemsBought: number;
  unitPrice: number;
  totalPrice: number;
  paymentMethod: string;
}

interface Transaction {
  id: number;
  title: string;
  date: string;
  isPromotion: boolean;
  details?: TransactionDetails;
}

const TransactionList: React.FC = () => {
  const transactions: Transaction[] = [
    {
      id: 1,
      title: "Gran Premio Royale",
      date: "13 de junio 2024",
      isPromotion: true,
    },
    {
      id: 2,
      title: "Lamborghini wallpaper",
      date: "13 de junio 2024",
      isPromotion: false,
    },
    {
      id: 3,
      title: "Doble Oportunidad",
      date: "13 de junio 2024",
      isPromotion: true,
      details: {
        itemsBought: 2,
        unitPrice: 6000,
        totalPrice: 12000,
        paymentMethod: "Bancolombia a la mano/Nequi"
      }
    }
  ];

  return (
    <Accordion 
      className="px-0 max-w-[400px]"
      variant="shadow"
      itemClasses={{
        base: "py-0 w-full",
        title: "font-normal text-medium",
        trigger: "px-2 py-2 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2",
      }}
    >
      {transactions.map((transaction) => (
        <AccordionItem
          key={transaction.id}
          aria-label={`Transaccion #${transaction.id}: ${transaction.title}`}
          title={
            <div className="flex flex-col">
              <span>{`Transaccion #${transaction.id}: ${transaction.title}`}</span>
              <span className="text-small text-default-400">{transaction.date}</span>
            </div>
          }
          subtitle={
            transaction.isPromotion ? 
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              Promoción
            </span> : null
          }
          style={{
            backgroundColor: 'rgba(113, 113, 122, 0.3)',
          }}
        >
          {transaction.details && (
            <div>
              <p>Fondos de pantalla comprados: {transaction.details.itemsBought}</p>
              <p>Precio unidad: {transaction.details.unitPrice} COP</p>
              <p>Total compra: {transaction.details.totalPrice} COP</p>
              <p>Método de pago: {transaction.details.paymentMethod}</p>
              <div className="mt-4 space-x-2">
                <Button size="sm" color="secondary">Promociones</Button>
                <Button size="sm" color="secondary" variant="bordered">Ver fondos de pantalla</Button>
              </div>
            </div>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TransactionList;