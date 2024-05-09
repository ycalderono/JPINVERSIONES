// components/RaffleModal/IDNumberInput.js
import React from 'react';
import { Input } from '@nextui-org/input';

export default function IDNumberInput({ value, onChange }) {
    return (
        <Input
            label="Cédula de Identidad"
            placeholder="Ingresa tu número de cédula"
            type="number"
            value={value}
            onChange={onChange}
            variant="bordered"
        />
    );
}
