// components/RaffleModal/EmailInput.js
import React from 'react';
import { Input } from '@nextui-org/input';

export default function EmailInput({ value, onChange }) {
    return (
        <Input
            label="Correo Electrónico"
            placeholder="Ingresa tu correo electrónico"
            type="email"
            value={value}
            onChange={onChange}
            variant="bordered"
        />
    );
}
