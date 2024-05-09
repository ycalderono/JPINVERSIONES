// components/RaffleModal/LoginWithIdView.js
import React, { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

export default function LoginWithIdView({ email, onSubmit }) {
  const [idNumber, setIdNumber] = useState('');

  const handleLogin = () => {
    if (!idNumber) {
      alert("Por favor, ingresa tu número de documento.");
      return;
    }
    onSubmit(idNumber); // Llama a la función de inicio de sesión proporcionada
  };

  return (
    <div>
      <h3>Correo ya registrado</h3>
      <p>El correo {email} ya está registrado. Por favor, introduce tu número de documento para continuar.</p>
      <Input
        label="Número de Identificación"
        placeholder="Introduce tu número de documento"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
        variant="bordered"
      />
      <Button onClick={handleLogin}>Iniciar Sesión</Button>
    </div>
  );
}
