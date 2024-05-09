import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmationView({ onClose }) {
  const router = useRouter();

  // Redirigir después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Cierra el modal
      router.push('/profile'); // Redirige a la página de perfil
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose, router]);

  return (
    <div>
      <h3>¡Orden de Compra Guardada con Éxito!</h3>
      <p>Será redirigido a su perfil en 5 segundos para monitorear sus rifas y números comprados.</p>
    </div>
  );
}