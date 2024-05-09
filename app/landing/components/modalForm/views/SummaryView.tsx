// components/RaffleModal/SummaryView.js
import React from 'react';

export default function SummaryView({ raffleType, selectedNumbers }) {
    return (
        <>
            <h3>Resumen del Paquete</h3>
            <div>
                <p><strong>Paquete:</strong> {raffleType}</p>
                <p><strong>Número de Tickets/Puestos:</strong> {selectedNumbers.length}</p>
                <p><strong>Números Seleccionados:</strong> {selectedNumbers.join(', ')}</p>
            </div>
        </>
    );
}
