// components/RaffleModal/SummaryView.tsx
import React from 'react';

interface SummaryViewProps {
  raffleType?: string;
  selectedNumbers?: string[];
  wallpaperTitle?: string;
  price?: number;
  paymentMethod?: string;
}

export default function SummaryView({ 
  raffleType, 
  selectedNumbers, 
  wallpaperTitle, 
  price, 
  paymentMethod 
}: SummaryViewProps) {
  const isWallpaper = !!wallpaperTitle;

  return (
    <>
      <h3>Resumen de la Compra</h3>
      <div>
        {isWallpaper ? (
          <>
            <p><strong>Wallpaper:</strong> {wallpaperTitle || 'Wallpaper sin título'}</p>
            <p><strong>Precio:</strong> ${price?.toFixed(2) || 'N/A'}</p>
          </>
        ) : (
          <>
            <p><strong>Paquete:</strong> {raffleType}</p>
            <p><strong>Número de Tickets/Puestos:</strong> {selectedNumbers?.length || 0}</p>
            <p><strong>Números Seleccionados:</strong> {selectedNumbers?.join(', ') || 'Ninguno'}</p>
          </>
        )}
        <p><strong>Método de Pago:</strong> {paymentMethod || 'No seleccionado'}</p>
      </div>
    </>
  );
}