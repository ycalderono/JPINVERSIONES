// components/RaffleModal/SuggestionsList.js
import React from 'react';

export default function SuggestionsList({ suggestions, onSelect }) {
    return (
        suggestions.length > 0 && (
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {suggestions.map((city) => (
                    <li key={city.id} onClick={() => onSelect(city)} style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                        {city.name}
                    </li>
                ))}
            </ul>
        )
    );
}
