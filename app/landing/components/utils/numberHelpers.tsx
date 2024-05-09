// components/utils/numberHelpers.js
export const generateSuggestedNumbers = (setSuggestedNumbers) => {
    const numbers = [];
    for (let i = 0; i < 5; i++) {
        const randomNumber = String(Math.floor(1000 + Math.random() * 9000)); // Número de 4 cifras
        numbers.push(randomNumber);
    }
    setSuggestedNumbers(numbers);
};

export const addPreferredNumber = (preferredNumber, selectedNumbers, setSelectedNumbers, setPreferredNumber) => {
    if (preferredNumber.length === 4 && !selectedNumbers.includes(preferredNumber)) {
        setSelectedNumbers([...selectedNumbers, preferredNumber]);
        setPreferredNumber('');
    }
};

export const selectSuggestedNumber = (number, selectedNumbers, setSelectedNumbers) => {
    if (!selectedNumbers.includes(number)) {
        setSelectedNumbers([...selectedNumbers, number]);
    }
};
