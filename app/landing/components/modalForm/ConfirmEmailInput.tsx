import React from 'react';
import { Input } from '@nextui-org/input';

export default function ConfirmEmailInput({
  value,
  onChange,
  onBlur,
  isInvalid,
  errorMessage,
  placeholder = "Vuelve a ingresar tu correo electrónico"
}) {
  return (
    <Input
      type="email"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      variant="bordered"
      isInvalid={isInvalid} // Cambia el borde a rojo si `true`
      errorMessage={errorMessage} // Muestra un mensaje de error
      label="Confirmar Correo Electrónico"
      placeholder={placeholder}
      isRequired={true}
    />
  );
}
