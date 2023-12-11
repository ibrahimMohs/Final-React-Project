/* eslint-disable @typescript-eslint/naming-convention */
// HomePage.tsx
import './HomePage.scss';
import Carousel from '../../components/Carousel/Carousel';
import MediaGrid from '../../components/MediaGrid/MediaGrid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  backdrop_path?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  vote_average: number;
  overview: string;
  poster_path?: string;
}

interface TVShow {
  id: number;
  name: string;
  backdrop_path?: string;
  vote_average: number;
  overview: string;
  poster_path?: string;
}

const apiKey = 'f1a02268af3a2e076dc84ca1a6aaaefe';

export const HomePage: React.FC = () => {
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [newTVShows, setNewTVShows] = useState<TVShow[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // Fetch the necessary data
    const fetchMovies = async () => {
      const newMoviesResponse = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`);
      setNewMovies(newMoviesResponse.data.results);

      const newTVShowsResponse = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`);
      setNewTVShows(newTVShowsResponse.data.results);

      const upcomingMoviesResponse = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`);
      setUpcomingMovies(upcomingMoviesResponse.data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="home-page">
      <Carousel />
      <MediaGrid title="New Movies" items={newMovies} />
      <MediaGrid title="New TV Shows" items={newTVShows} />
      <MediaGrid title="Upcoming Movies" items={upcomingMovies} />
    </div>
  );
};
