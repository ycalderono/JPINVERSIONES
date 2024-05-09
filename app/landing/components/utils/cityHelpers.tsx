// components/utils/cityHelpers.js
export const filterCities = (allCities, query) => {
    return allCities.filter((city) =>
        city.name.toLowerCase().includes(query.toLowerCase())
    );
};

export const selectCity = (city, setCityQuery, setSuggestions) => {
    setCityQuery(city.name);
    setSuggestions([]);
};
