// ConfirmationView.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ConfirmationView = ({ onClose, userId, raffleType, selectedNumbers, paymentMethod, totalAmount, onPurchaseSubmission }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true); // Indica que se está procesando el envío
    try {
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          raffleType,
          selectedNumbers,
          paymentMethod,
          totalAmount,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Compra guardada con éxito:', data.purchase);
        onPurchaseSubmission(); // Marca la compra como enviada
        onClose();
        router.push('/profile'); // Redirige al perfil
      } else {
        console.error('Error al guardar la compra:', data.error);
      }
    } catch (error) {
      console.error('Error al guardar la compra:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3>¡Orden de Compra Guardada con Éxito!</h3>
      <p>Será redirigido a su perfil para monitorear sus rifas y números comprados.</p>
    </div>
  );
};

export default ConfirmationView;

