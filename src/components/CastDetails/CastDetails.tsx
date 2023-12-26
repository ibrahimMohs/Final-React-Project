import '../CastDetails/CastDetails.scss';
import { Link, useParams } from 'react-router-dom';
import { apiKey } from '../../consts';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CastMemberDetails {
  id: number;
  title: string;
  character: string;
  poster_path: string;
  release_date: string;
  media_type: 'movie' | 'tv';
  name: string;
  profile_path: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  known_for_department: string;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for images

const CastDetails = () => {
  const { castId } = useParams<{ castId: string }>();
  const [castName, setCastName] = useState<string>('');
  const [movies, setMovies] = useState<CastMemberDetails[]>([]);
  const [tvShows, setTvShows] = useState<CastMemberDetails[]>([]);
  const [castPersonalDetails, setCastPersonalDetails] = useState<CastMemberDetails | null>(null);

  useEffect(() => {
    const fetchCastDetails = async () => {
      try {
        // Fetch the cast member's personal details

        const personalDetailsResponse = await axios.get(`https://api.themoviedb.org/3/person/${castId}?api_key=${apiKey}&language=en-US`);
        setCastPersonalDetails(personalDetailsResponse.data);

        // Fetch the cast member's movie and TV show credits
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/person/${castId}/combined_credits?api_key=${apiKey}&language=en-US`);
        const castData: CastMemberDetails[] = creditsResponse.data.cast;

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
    <div className="cast-details">
      <h1>{castPersonalDetails?.name}</h1>
      {castPersonalDetails && (
        <div className="cast-info">
          <img className="cast-image" src={`${IMAGE_BASE_URL}${castPersonalDetails.profile_path}`} alt={castPersonalDetails.name} />
          <div className='cast-text'>
            <h2 className="personal-info">Personal Info</h2>
            <p>Birthday: {castPersonalDetails.birthday}</p>
            <p>Place of Birth: {castPersonalDetails.place_of_birth}</p>
            <p>Known For: {castPersonalDetails.known_for_department}</p>
            <p className="desktop-only">Biography: {castPersonalDetails.biography}</p>
            {/* Display other information as needed */}
          </div>
            <p className="bio-text mobile-only">Biography: {castPersonalDetails.biography}</p>
        </div>
      )}
      <div className="movie-list-all">
        <h1>{castName}</h1>
        <div className="other-movies">
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
    </div>
  );
};

export default CastDetails;
