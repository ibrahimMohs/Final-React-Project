import React, { useState, useEffect } from 'react';
import { API_URL } from '../../consts';

type MovieRating = {
  id: number;
  title: string;
  rating: number;
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

const MyRatings: React.FC = () => {
  const [ratings, setRatings] = useState<MovieRating[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      setUserId(decodedToken.userId); 
      fetchRatings(decodedToken.userId);
    }
  }, []);

  const fetchRatings = async (userId: number) => {
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}/ratings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include authorization headers
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const userRatings = await response.json();
      setRatings(userRatings);
    } catch (error) {
      console.error('Failed to fetch ratings:', error);
    }
  };

  const addRating = async (movieId: number, rating: number) => {
    try {
      const response = await fetch(`${API_URL}/api/movies/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if required
        },
        body: JSON.stringify({
          userId,
          mediaId: movieId,
          rating,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newRating = await response.json();
      setRatings(currentRatings => [...currentRatings, newRating]);
    } catch (error) {
      console.error('Failed to add rating:', error);
    }
  };

  const updateRating = async (movieId: number, newRating: number) => {
    try {
      const response = await fetch(`${API_URL}/api/movies/rating`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if required
        },
        body: JSON.stringify({
          userId,
          mediaId: movieId,
          rating: newRating,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedRating = await response.json();
      setRatings(currentRatings =>
        currentRatings.map(r => r.id === movieId ? { ...r, rating: newRating } : r)
      );
    } catch (error) {
      console.error('Failed to update rating:', error);
    }
  };

  const removeRating = async (movieId: number) => {
    try {
      const response = await fetch(`${API_URL}/api/movies/rating`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include authorization headers if required
        },
        body: JSON.stringify({
          userId,
          mediaId: movieId,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRatings(currentRatings =>
        currentRatings.filter(r => r.id !== movieId)
      );
    } catch (error) {
      console.error('Failed to remove rating:', error);
    }
  };
  
  return (
    <div>
      <h1>My Ratings</h1>
      <ul>
        {ratings.map(movie => (
          <li key={movie.id}>
            {movie.title} - {movie.rating} Stars
            <button onClick={() => updateRating(movie.id, 4)}>Update Rating</button>
            <button onClick={() => removeRating(movie.id)}>Remove Rating</button>
          </li>
        ))}
      </ul>
      {/* Placeholder for adding/updating ratings */}
      <button onClick={() => addRating(1, 5)}>Rate a Movie</button>
    </div>
  );
};

export default MyRatings;
