'use client';

import React, { useRef } from 'react';
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { FaGift, FaUpload } from 'react-icons/fa';
import { Transaction } from '@/types/transaction';
import { useRouter } from 'next/navigation';

interface TransactionDetailsProps {
  transaction: Transaction;
}



const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleViewPromotion = () => {
    router.push('/landing');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Aquí puede manejar la lógica para subir el archivo
      console.log('Archivo seleccionado:', file.name);
      // Implemente aquí la lógica para subir el archivo a su servidor
    }
  };

  return (
    <div className="space-y-4 py-3">
      {transaction.isPromotion && (
        <div>
          <p className="text-sm font-semibold mb-1">Números para la promoción:</p>
          <p className="text-sm">{transaction.selectedNumbers.map(n => n.number).join(', ')}</p>
        </div>
      )}
      <div>
        <p className="text-sm font-semibold mb-1">Método de pago:</p>
        <p className="text-sm">{transaction.paymentMethod}</p>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <div className="flex justify-between items-center">
          <Button 
            size="sm" 
            className="bg-[#fe41f0] text-white flex-grow mr-2"
            startContent={<FaGift />}
            onClick={handleViewPromotion}
          >
            Ver promoción
          </Button>
          <Button size="sm" variant="bordered" className="flex-grow">
            Ver fondos
          </Button>
        </div>
        {transaction.paymentMethod.toLowerCase().includes('bancolombia') || 
         transaction.paymentMethod.toLowerCase().includes('nequi') ? (<>
          <Button 
            size="sm" 
            variant="flat" 
            color="warning"
            className="w-full"
            startContent={<FaUpload />}
            onClick={handleUploadClick}
          >
            Subir comprobante de pago
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </>
        ) : null}
      </div>
    </div>
  );
};

export default TransactionDetails;
