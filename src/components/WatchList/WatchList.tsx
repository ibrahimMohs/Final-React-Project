import React, { useEffect, useState } from 'react';
import { API_URL, apiKey } from '../../consts';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface FetchWatchListRequestBody {
  userId: number;
}

interface WatchListItem {
  mediaId: number;
  title: string; // Assuming this is the name of the movie
  imageUrl: string;
}

interface UserDetailsWatchListItem {
  mediaId: number;
}

const WatchList: React.FC = () => {
  const [watchList, setWatchList] = useState<WatchListItem[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const parseJwt = (token: string): any => {
    console.log('token', token);
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      fetchWatchList(token);
    } else {
      setLoading(false);
      setError('No authentication token found.');
    }
  }, []);

  const fetchMovieDetailsFromTMDB = async (mediaId: number) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${mediaId}?api_key=${apiKey}`);
      return {
        title: response.data.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${response.data.poster_path}`,
      };
    } catch (error) {
      console.error('Error fetching from TMDB:', error);
      return null;
    }
  };

  const fetchWatchList = async (token: string) => {
    try {
      setLoading(true);

      const payload = parseJwt(token);
      const userId = parseInt(payload.Id, 10); // Ensure the payload has the 'Id' property

      if (!userId) {
        throw new Error('User ID not found in token.');
      }

      // Update the fetch call to use the correct endpoint to get user details by ID
      // The watchlist is a part of the user details according to the API documentation
      const response = await fetch(`${API_URL}/api/movies/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Assuming the watchlist is part of the user details response
      const userDetails = await response.json();
      console.log('User details received:', userDetails);

      if (userDetails && userDetails.watchList && Array.isArray(userDetails.watchList)) {
        const watchListWithDetails = await Promise.all(
          userDetails.watchList.map(async (item: UserDetailsWatchListItem) => {
            const tmdbDetails = await fetchMovieDetailsFromTMDB(item.mediaId);
            return tmdbDetails ? { ...item, ...tmdbDetails } : item;
          }),
        );
        setWatchList(watchListWithDetails);
      } else {
        setWatchList([]);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('An error occurred while fetching the user details:', message);
      setError(`Failed to load user details: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!watchList) {
    return <div>No watchlist data.</div>;
  }

  return (
    <div>
      <h1>My WatchList</h1>
      {watchList && watchList.length > 0 ? (
        <div className='watchlist'>
          {watchList.map((item, index) => {
            return (
              <>
                {item.title && (
                  <div key={index}>
                    {' '}
                    {/* Using index as key for now, replace with a proper unique key */}
                    <p>
                      <strong>{item.title || 'No title available'}</strong>
                    </p>
                    <Link style={{ textDecoration: 'none', color: '#000000 !imortant' }} to={`/movies/${item.mediaId}`}>
                      <img src={item.imageUrl || 'placeholder-image-url.jpg'} alt={item.title || 'No title'} />
                    </Link>
                    <div>
                      <hr style={{ border: '1px solid black', marginBottom: '20px', width: '50%' }} />
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      ) : (
        <div>No watchlist data.</div>
      )}
    </div>
  );
};

export default WatchList;
