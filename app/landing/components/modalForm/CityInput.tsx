// components/RaffleModal/CityInput.js
import React from 'react';
import { Input } from '@nextui-org/input';

export default function CityInput({ value, onChange }) {
    return (
        <Input
            label="Ciudad"
            placeholder="Escribe tu ciudad"
            value={value}
            onChange={onChange}
            variant="bordered"
        />
    );
}
