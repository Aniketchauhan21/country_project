import React, { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch('http://localhost:5005/countries')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      })
      .catch(err => console.error(err));
  };

  const fetchStates = (countryId) => {
    fetch(`http://localhost:5005/states/${countryId}`)
      .then(res => res.json())
      .then(data => {
        setStates(data);
      })
      .catch(err => console.error(err));
  };

  const fetchCities = (stateId) => {
    fetch(`http://localhost:5005/cities/${stateId}`)
      .then(res => res.json())
      .then(data => {
        setCities(data);
      })
      .catch(err => console.error(err));
  };

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setSelectedCountry(countryId);
    setSelectedState(null);
    fetchStates(countryId);
  };

  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setSelectedState(stateId);
    fetchCities(stateId);
  };

  return (
    <div>
      <div>
        <h2>Select a Country:</h2>
        <select onChange={handleCountryChange}>
          <option value="">Select a country</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
      </div>
      
      {selectedCountry && (
        <div>
          <h2>Select a State:</h2>
          <select onChange={handleStateChange}>
            <option value="">Select a state</option>
            {states.map(state => (
              <option key={state.id} value={state.id}>{state.name}</option>
            ))}
          </select>
        </div>
      )}

      {selectedState && (
        <div>
          <h2>Cities:</h2>
          <ul>
            {cities.map(city => (
              <li key={city.id}>{city.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
