import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    setLoading(true);

    try {
      const response = await Axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );

      setResults(response.data.hits);
    } catch (error) {
      setError(error);
      console.error(error);
    }
    setLoading(false);
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
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <img
        src="https://icon.now.sh/react/c0c"
        alt="React Logo"
        className="float-right h-12"
      />
      <h1 className="text-grey-darkest font-thin">Hook News</h1>
      <form className="mb-2" onSubmit={handleSearch}>
        <input
          className="border p1 rounded"
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
          ref={searchInputRef}
        />
        <button type="submit" className="bg-orange rounded m-1 p-1 ">
          Search
        </button>
        <button
          type="button"
          className="bg-teal text-white p-1 rounded"
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>
      {loading ? (
        <div className="font-bold text-orange-dark">Loading results ....</div>
      ) : (
        <ul className=" list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a
                href="{result.url}"
                className="text-indigo-dark hover:text-indigo-darkest"
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}

      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
}

export default App;
