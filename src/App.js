import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');

  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const response = await Axios.get(
      `http://hn.algolia.com/api/v1/search?query=${query}`
    );

    setResults(response.data.hits);
  };

  const handleSearch = event => {
    event.preventDefault();
    getResults();
  };

  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>
          Clear
        </button>
      </form>

      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href="{result.url}">{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
