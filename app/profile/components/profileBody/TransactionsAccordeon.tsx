'use client';

import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import TransactionLogo from '@/public/menutransaccionlogo.svg';
import { useSession } from 'next-auth/react';

interface Transaction {
  id: number;
  raffleType: string;
  paymentMethod: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;
  selectedNumbers: { number: string }[];
}

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (session) {
        try {
          const response = await fetch('/api/transactions');
          if (response.ok) {
            const data = await response.json();
            setTransactions(data);
          } else {
            console.error('Error al obtener las transacciones');
          }
        } catch (error) {
          console.error('Error al obtener las transacciones:', error);
        }
      }
    };

    fetchTransactions();
  }, [session]);

  return (
    <Accordion 
      className="px-0 max-w-[400px]"
      variant="splitted"
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
          aria-label={`Transacción #${transaction.id}: ${transaction.raffleType}`}
          title={
            <div className='flex flex-row gap-3'>
              <div className='items-center justify-center flex'>
                <TransactionLogo className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-col">
                  <span className='text-base truncate ...'>{`Transacción #${transaction.id}: ${transaction.raffleType}`}</span>
                  <div className='flex flex-row items-center'>
                    <span className="text-sm text-default-500">{new Date(transaction.createdAt).toLocaleDateString()}</span>
                    <div className='ml-1'>
                      <Chip radius='full' variant="bordered" size="sm" className={transaction.paymentStatus === 'completed' ? "text-green-500 border-green-500" : "text-yellow-500 border-yellow-500"}>
                        {transaction.paymentStatus === 'completed' ? 'Completado' : 'Pendiente'}
                      </Chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          style={{
            backgroundColor: 'rgba(113, 113, 122, 0.3)',
          }}
        >
          <div>
            <p>Números seleccionados: {transaction.selectedNumbers.map(n => n.number).join(', ')}</p>
            <p>Método de pago: {transaction.paymentMethod}</p>
            <p>Total: {transaction.totalAmount} COP</p>
            <div className="mt-4 space-x-2">
              <Button size="sm" color="secondary">Promociones</Button>
              <Button size="sm" color="secondary" variant="bordered">Ver detalles</Button>
            </div>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TransactionList;