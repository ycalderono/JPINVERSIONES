import React from 'react';

export default function SuggestionsList({ suggestions, onSelect }) {
    return (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {suggestions.length > 0 ? (
                suggestions.map((city) => (
                    <li key={city.id} onClick={() => onSelect(city)} style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                        {city.name}
                    </li>
                ))
            ) : (
                <li>No suggestions available</li>
            )}
        </ul>
    );
}
