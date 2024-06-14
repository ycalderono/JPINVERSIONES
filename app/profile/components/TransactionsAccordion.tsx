"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { useEffect, useState } from "react";
import { Card } from "@nextui-org/card";

// Definición del tipo para transacciones
type Transaction = {
  id: number;
  title: string;
  amount: string;
};

// Simulación de una llamada a API para obtener transacciones
const fetchTransactions = async (): Promise<Transaction[]> => {
  return [
    { id: 1, title: "Transacción 1", amount: "$100" },
    { id: 2, title: "Transacción 2", amount: "$200" },
    // Más transacciones...
  ];
};

const TransactionsAccordion = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await fetchTransactions();
      setTransactions(data);
    };

    loadTransactions();
  }, []);

  return (
    <>
    <Accordion className="w-[400px] h=[56px]" variant="splitted" >
      {transactions.map((transaction) => (
        <AccordionItem  key={transaction.id} title={transaction.title}>
          <Card className="p-4">
            <p>{transaction.amount}</p>
          </Card>
        </AccordionItem>
      ))}
    </Accordion>
    </>
  );
};

export default TransactionsAccordion;
