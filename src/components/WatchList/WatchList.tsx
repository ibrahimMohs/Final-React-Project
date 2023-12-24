import React, { useState, useEffect } from 'react';
import { API_URL } from '../../consts';

type Movie = {
  id: number;
  title: string;
  // ... other movie properties
};

const parseJwt = (token: string) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      setUserId(decodedToken.userId); 
    }
  }, []);

   const addToWatchlist = async (movieId: number) => {
    if (userId === null) {
      console.error('User ID is not available.');
      return;
    }
    const apiEndpoint = `${API_URL}/api/movies/watch-list`;
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          mediaId: movieId,
          // ... other required fields
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setWatchlist([...watchlist, result]);
    } catch (error) {
      console.error('Failed to add movie to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (movieId: number) => {
    if (userId === null) {
      console.error('User ID is not available.');
      return;
    }
    const apiEndpoint = 'your-api-base-url/api/movies/watch-list';
    try {
      const response = await fetch(apiEndpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          mediaId: movieId,
          // ... other required fields
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setWatchlist(watchlist.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Failed to remove movie from watchlist:', error);
    }
  };

  return (
    <div>
      <h1>My Watchlist</h1>
      <ul>
        {watchlist.map(movie => (
          <li key={movie.id}>
            {movie.title}
            <button onClick={() => removeFromWatchlist(movie.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* This is a placeholder. In a real app, you would have a way to select movies to add */}
      <button onClick={() => addToWatchlist(1)}>Add a Movie</button>
    </div>
  );
};

export default Watchlist;
