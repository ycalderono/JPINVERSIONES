// components/RaffleModal/FooterButtons.js
import React from 'react';
import { Button } from '@nextui-org/button';

export default function FooterButtons({ onClose, onSubmit, disabled }) {
    return (
        <>
            <Button color="gray" variant="flat" onClick={onClose}>
                Cancelar
            </Button>
            <Button className="bg-custom-pink" onClick={onSubmit} disabled={disabled}>
                Siguiente
            </Button>
        </>
    );
}
