// components/RaffleModal/PhoneInput.js
import React from 'react';
import { Input } from '@nextui-org/input';

export default function PhoneInput({ value, onChange }) {
    return (
        <Input
            label="Número de Teléfono"
            placeholder="Ingresa tu número"
            type="tel"
            value={value}
            onChange={onChange}
            variant="bordered"
        />
    );
}
