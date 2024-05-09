// components/RaffleModal/PaymentMethodsView.js
import React from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/card';

export default function PaymentMethodsView({ onBancolombiaClick }) {
    return (
        <>
            <h3>Métodos de Pago</h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Card isHoverable isPressable onClick={onBancolombiaClick}>
                    <CardHeader>
                        <h4>Bancolombia/Nequi</h4>
                    </CardHeader>
                    <CardBody>
                        <p>Realiza pagos usando Bancolombia o Nequi.</p>
                    </CardBody>
                </Card>

                <Card
                    isHoverable
                    className="opacity-50 cursor-not-allowed" // Estilos para indicar que está deshabilitada
                >
                    <CardHeader>
                        <h4>Tarjeta de Crédito/Débito</h4>
                    </CardHeader>
                    <CardBody>
                        <p>Paga con tu tarjeta de crédito o débito (deshabilitada).</p>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
