// components/RaffleModal/AddressInput.js
import React from 'react';
import { Input } from '@nextui-org/input';

export default function AddressInput({ value, onChange }) {
    return (
        <Input
            label="Dirección"
            placeholder="Escribe tu dirección"
            value={value}
            onChange={onChange}
            variant="bordered"
        />
    );
}
