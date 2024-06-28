'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { FaGift, FaUpload, FaCheckCircle } from 'react-icons/fa';
import { Transaction } from '@/types/transaction';
import { useRouter } from 'next/navigation';
import { Tooltip } from "@nextui-org/tooltip";

interface TransactionDetailsProps {
  transaction: Transaction;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProofUploaded, setIsProofUploaded] = useState(false);

  useEffect(() => {
    checkPaymentProof();
  }, [transaction.id]);

  const checkPaymentProof = async () => {
    try {
      const response = await fetch(`/api/check-payment-proof/${transaction.id}`);
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      setIsProofUploaded(data.isUploaded);
    } catch (error) {
      console.error('Error al verificar el comprobante:', error);
    }
  };

  const handleViewPromotion = () => {
    router.push('/landing');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('purchaseId', transaction.id.toString());

      try {
        const response = await fetch('/api/upload-payment-proof', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();
        if (data.success) {
          console.log('Comprobante subido exitosamente:', data.paymentProof);
          setIsProofUploaded(true);
        } else {
          throw new Error(data.error || 'Error desconocido');
        }
      } catch (error) {
        console.error('Error al subir el comprobante:', error);
        alert('Error al subir el comprobante');
      } finally {
        setIsUploading(false);
      }
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
        {(transaction.paymentMethod.toLowerCase().includes('bancolombia') || 
         transaction.paymentMethod.toLowerCase().includes('nequi')) && (
          <>
            {isProofUploaded ? (
              <Tooltip content="Comprobante subido correctamente">
                <div className="w-full p-2 bg-green-100 border border-green-300 rounded-md flex items-center justify-center text-green-700">
                  <FaCheckCircle className="mr-2" />
                  Comprobante subido
                </div>
              </Tooltip>
            ) : (
              <>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="warning"
                  className="w-full"
                  startContent={<FaUpload />}
                  onClick={handleUploadClick}
                  disabled={isUploading}
                >
                  {isUploading ? 'Subiendo...' : 'Subir comprobante de pago'}
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionDetails;