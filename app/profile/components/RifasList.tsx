// components/RifasList.tsx
import React, { useState, useEffect } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { MdUpload } from 'react-icons/md';
import {Tooltip} from "@nextui-org/tooltip";

// Define el tipo de datos de las rifas (ajusta según tu esquema de datos)
interface Raffle {
  id: number;
  raffleType: string;
  paymentMethod: string;
  totalAmount: number;
  paymentStatus: string;
  createdAt: string; // o Date si ya es un objeto Date
  acciones: string;
}

const RifasList: React.FC = () => {
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRaffle, setCurrentRaffle] = useState<Raffle | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { data: session } = useSession();

  const fetchRaffles = async () => {
    if (!session) return; // Asegúrate de que la sesión esté disponible
  
    try {
      const response = await fetch(`/api/raffles?userId=${session.user.id}`, { // Incluye el ID del usuario en la URL
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`, // Opcional: incluir token si lo usas para autenticación
        },
      });
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
  

  useEffect(() => {
    if (session) {
      fetchRaffles();
    }
  }, [session]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };

  // Función para obtener los datos de las rifas desde una API (ajusta la URL a la API correcta)




  if (isLoading) {
    return <p>Cargando rifas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Table aria-label="Tabla de Rifas">
      <TableHeader className='bg-gray-100 '>
        <TableColumn className='text-center'>ID</TableColumn>
        <TableColumn className='text-center'>Tipo de Paquete</TableColumn>
        <TableColumn className='text-center'>Método de Pago</TableColumn>
        <TableColumn  className='text-center'>Monto Total</TableColumn>
        <TableColumn className='text-center'>Estado de Pago</TableColumn>
        <TableColumn  className='text-center'>Fecha de Creación</TableColumn>
        <TableColumn className='text-center'>Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {raffles.map((raffle) => (
          <TableRow className='text-center' key={raffle.id}>
            <TableCell >{raffle.id}</TableCell>
            <TableCell>{raffle.raffleType}</TableCell>
            <TableCell>{raffle.paymentMethod}</TableCell>
            <TableCell>{raffle.totalAmount.toFixed(2)}</TableCell>            
            <TableCell>{raffle.paymentStatus}</TableCell>
            <TableCell>{new Date(raffle.createdAt).toLocaleString()}</TableCell>
            <TableCell>
              {raffle.paymentStatus === 'pending' ? (
                <Tooltip content="Subir comprobante">
                  <Button  onClick={() => alert("Subir comprobante")}>
                    <MdUpload size="1.5rem" />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip content="Subir comprobante">
                  <Button  disabled>
                    <MdUpload size="1.5rem" color="#ccc" />
                  </Button>
                  </Tooltip>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  );
};

export default RifasList;




