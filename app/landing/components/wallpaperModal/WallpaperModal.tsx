import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import FooterButtons from '../modalForm/FooterButtons';

export default function WallpaperModal({ isOpen, onClose, setWallpaperCount }) {
  const [count, setCount] = useState(1);

  const handleNext = () => {
    setWallpaperCount(count);
    onClose();
    // Aquí puedes manejar la transición al siguiente paso, como abrir otro modal o cambiar de vista
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Seleccionar Fondos de Pantalla</ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center">
                <label className="mb-4">¿Cuántos fondos de pantalla premium deseas obtener?</label>
                <input 
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  min="1"
                  className="p-2 border rounded"
                />
                <p className="mt-2">Precio por fondo de pantalla: $10000</p>
                <p className="mt-2">Total: ${count * 10000}</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <FooterButtons
                onClose={onClose}
                onSubmit={handleNext}
                submitText="Siguiente"
                disabled={count < 1}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
