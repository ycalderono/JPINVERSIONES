// components/RaffleModal/FullNameInput.js
import React from 'react';
import { Input } from '@nextui-org/input';

export default function FullNameInput({ value, onChange }) {
    return (
        <Input
            autoFocus
            label="Nombre Completo"
            placeholder="Ingresa tu nombre"
            value={value}
            onChange={onChange}
            variant="bordered"
        />
    );
}
