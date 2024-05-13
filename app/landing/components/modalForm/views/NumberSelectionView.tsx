import React, { useEffect } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';

function NumberSelectionView({ preferredNumber, setPreferredNumber, selectedNumbers, addPreferredNumber, suggestedNumbers, selectSuggestedNumber, maxNumbers }) {

  // Función para verificar si se puede agregar más números
  const canAddMoreNumbers = selectedNumbers.length < maxNumbers;

  return (
    <>
      <Input
        label="Ingresa tu número preferido"
        placeholder="4 cifras"
        value={preferredNumber}
        onChange={(e) => setPreferredNumber(e.target.value)}
        type="number"
      />
      <Button
        className="custom-pink"
        onClick={addPreferredNumber}
        disabled={!canAddMoreNumbers || preferredNumber.length !== 4}
      >
        Añadir Número
      </Button>

      <div>
        <h4>Números Preferidos:</h4>
        {selectedNumbers.map((num) => (
          <Chip key={num}>{num}</Chip>
        ))}
      </div>

      <div>
        <h4>Números Sugeridos:</h4>
        {suggestedNumbers.map((num) => (
          <Chip key={num} onClick={() => selectSuggestedNumber(num)}>
            {num}
          </Chip>
        ))}
      </div>
    </>
  );
}

export default NumberSelectionView;
