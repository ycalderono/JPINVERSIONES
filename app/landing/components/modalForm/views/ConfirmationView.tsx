// ConfirmationView.js
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ConfirmationView = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <h3>¡Orden de Compra Guardada con Éxito!</h3>
      <p>Será redirigido a su perfil para monitorear sus rifas y números comprados.</p>
    </div>
  );
};

export default ConfirmationView;

