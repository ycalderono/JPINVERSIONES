// components/utils/numberHelpers.tsx
export const generateSuggestedNumbers = (setSuggestedNumbers: (numbers: string[]) => void) => {
    const numbers: string[] = [];
    for (let i = 0; i < 5; i++) {
        const randomNumber = String(Math.floor(1000 + Math.random() * 9000)); // Número de 4 cifras
        numbers.push(randomNumber);
    }
    setSuggestedNumbers(numbers);
};

export const addPreferredNumber = (
    preferredNumber: string,
    selectedNumbers: string[],
    setSelectedNumbers: (numbers: string[]) => void,
    setPreferredNumber: (number: string) => void
) => {
    if (preferredNumber.length === 4 && !selectedNumbers.includes(preferredNumber)) {
        setSelectedNumbers([...selectedNumbers, preferredNumber]);
        setPreferredNumber('');
    }
};

export const selectSuggestedNumber = (
    number: string,
    selectedNumbers: string[],
    setSelectedNumbers: (numbers: string[]) => void
) => {
    if (!selectedNumbers.includes(number)) {
        setSelectedNumbers([...selectedNumbers, number]);
    }
};
