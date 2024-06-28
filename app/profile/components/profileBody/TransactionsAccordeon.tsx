'use client';

import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useSession } from 'next-auth/react';
import TransactionDetails from './TransactionDetails';
import TransactionHeader from './TransactionHeader';

interface Transaction {
  id: number;
  raffleType: string;
  paymentMethod: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string;
  selectedNumbers: { number: string }[];
  isPromotion: boolean;
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
      variant="shadow"
      itemClasses={{
        base: "py-0 w-full",
        title: "font-normal text-medium",
        trigger: "px-3 py-2 data-[hover=true]:bg-default-100 rounded-lg h-16 flex items-center",
        indicator: "text-medium",
        content: "text-small px-3",
      }}
    >
      {transactions.map((transaction) => (
        <AccordionItem
          key={transaction.id}
          aria-label={`Transacción #${transaction.id}: ${transaction.raffleType}`}
          title={<TransactionHeader transaction={transaction} />}
        >
          <TransactionDetails transaction={transaction} />
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TransactionList;
