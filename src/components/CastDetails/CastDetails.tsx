import '../CastDetails/CastDetails.scss';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CastMemberDetails {
  id: number;
  title: string;
  character: string;
  poster_path: string;
  release_date: string;
  media_type: 'movie' | 'tv';
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for images

const CastDetails = () => {
  const { castId } = useParams<{ castId: string }>();
  const [movies, setMovies] = useState<CastMemberDetails[]>([]);
  const [tvShows, setTvShows] = useState<CastMemberDetails[]>([]);

  useEffect(() => {
    const fetchCastDetails = async () => {
      try {
        const apiKey = 'f1a02268af3a2e076dc84ca1a6aaaefe';
        const response = await axios.get(`https://api.themoviedb.org/3/person/${castId}/combined_credits?api_key=${apiKey}&language=en-US`);
        console.log('Cast details:', response.data);

        const castData: CastMemberDetails[] = response.data.cast;

        const moviesData = castData.filter((item: CastMemberDetails) => item.media_type === 'movie');
        const tvShowsData = castData.filter((item: CastMemberDetails) => item.media_type === 'tv');

        setMovies(moviesData);
        setTvShows(tvShowsData);
      } catch (error) {
        console.error('Error fetching cast details:', error);
      }
    };

    fetchCastDetails();
  }, [castId]);

  return (
    <div>
      <div>
        <h2>Movies</h2>
        <div className="moviesList">
          {movies.length ? (
            movies.map((movie) => (
              <Link to={`/movies/${movie.id}`}>
                <h3>{movie.title}</h3>
                <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                <p>{movie.character}</p>
              </Link>
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </div>
      <div>
        <h2>TV Shows</h2>
        <div className="tvShowsList">
          {tvShows.length ? (
            tvShows.map((tvShow) => (
              <Link to={`/tv-shows/${tvShow.id}`}>
                <h3>{tvShow.title}</h3>
                <img src={`${IMAGE_BASE_URL}${tvShow.poster_path}`} alt={tvShow.title} />
                <p>{tvShow.character}</p>
              </Link>
            ))
          ) : (
            <p>No TV shows found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CastDetails;
