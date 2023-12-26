import '../SearchResultsPage/SearchResultsPage.scss';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  media_type: string;
}

const SearchResultsPage: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const location = useLocation();

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get('query');
    if (searchQuery) {
      fetchSearchResults(searchQuery);
    }
  }, [location]);

  const fetchSearchResults = async (query: string) => {
    const apiKey = 'f1a02268af3a2e076dc84ca1a6aaaefe';
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`,
      );
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle error
    }
  };

  return (
    <div className="search-main">
      {results.map((result) => (
        <Link to={`/${result.media_type === 'movie' ? 'movies' : 'tv-shows'}/${result.id}`}>
          <h3>{result.title || result.name}</h3>
          <img className="search-image" src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`} alt={result.title || result.name} />
        </Link>
      ))}
    </div>
  );
};

export default SearchResultsPage;
