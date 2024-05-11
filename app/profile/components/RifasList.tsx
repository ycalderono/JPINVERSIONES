// components/RifasList.tsx
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";

// Define el tipo de datos de las rifas (ajusta según tu esquema de datos)
interface Raffle {
  id: number;
  raffleType: string;
  paymentMethod: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string; // o Date si ya es un objeto Date
}

const RifasList: React.FC = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los datos de las rifas desde una API (ajusta la URL a la API correcta)
  const fetchRaffles = async () => {
    try {
      const response = await fetch('/api/raffles'); // Ajusta la URL según tu API
      if (!response.ok) {
        throw new Error('Error al cargar las rifas');
      }

      const data = await response.json();
      setRaffles(data); // Asegúrate de que el formato del JSON es compatible
      setIsLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  // Llama a `fetchRaffles` cuando el componente se monta
  useEffect(() => {
    fetchRaffles();
  }, []);

  if (isLoading) {
    return <p>Cargando rifas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Table aria-label="Tabla de Rifas">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Tipo de Paquete</TableColumn>
        <TableColumn>Método de Pago</TableColumn>
        <TableColumn>Monto Total</TableColumn>
        <TableColumn>Estado de Pago</TableColumn>
        <TableColumn>Fecha de Creación</TableColumn>
      </TableHeader>
      <TableBody>
        {raffles.map((raffle) => (
          <TableRow key={raffle.id}>
            <TableCell>{raffle.id}</TableCell>
            <TableCell>{raffle.raffleType}</TableCell>
            <TableCell>{raffle.paymentMethod}</TableCell>
            <TableCell>{raffle.totalAmount.toFixed(2)}</TableCell>
            <TableCell>{raffle.paymentStatus}</TableCell>
            <TableCell>{new Date(raffle.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RifasList;




