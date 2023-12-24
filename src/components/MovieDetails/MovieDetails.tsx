import '../MovieDetails/MovieDetails.scss';
import { Link, useParams } from 'react-router-dom';
import Animation from '../Animation/Animation';
import CastDetails from '../CastDetails/CastDetails';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiKey } from '../../consts';

interface MovieDetailsProps {}

interface MovieDetailsData {
  title: string;
  overview: string;
  poster_path: string;
  genres: { id: number; name: string }[];
  rating: number;
  country: string[];
  directors: { id: number; name: string }[];
  writers: { id: number; name: string }[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

interface Trailer {
  id: string;
  key: string;
  name: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsData | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [selectedCastId, setSelectedCastId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await axios.get<MovieDetailsData>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
        const basicDetails = movieResponse.data;

        const castResponse = await axios.get<{ cast: CastMember[] }>(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
        const cast = castResponse.data.cast;

        const videosResponse = await axios.get<{ results: Trailer[] }>(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`,
        );
        const trailers = videosResponse.data.results.filter((video: any) => video.type === 'Trailer');

        const movieDetailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`);
        const movieDetails = movieDetailsResponse.data;

        setMovieDetails({
          ...basicDetails,
          rating: movieDetails.vote_average,
          country: movieDetails.production_countries.map((country: { iso_3166_1: string; name: string }) => country.name),
          directors: movieDetails.credits.crew.filter((member: any) => member.job === 'Director'),
          writers: movieDetails.credits.crew.filter((member: any) => member.department === 'Writing'),
        });

        setCast(cast);
        setTrailers(trailers);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleCastClick = async (castId: number) => {
    try {
      setSelectedCastId(castId);
    } catch (error) {
      console.error('Error fetching cast details:', error);
    }
  };

  console.log('trailers', trailers);
  return (
    <div className="movie-details">
      {movieDetails ? (
        <div>
          <h1>{movieDetails.title}</h1>
          <div className="parts">
            <div>
              <img className="movie-img" src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
              <h2>About:</h2>
              <p>{movieDetails.overview}</p>
              <div>
                <h2>Trailers:</h2>
                <ul className="trailers-part">
                  {trailers.map((trailer) => (
                    <li key={trailer.id}>
                      <iframe className="trailer-class" title="Trailer" src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="0"></iframe>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div>
                <h2>Genres:</h2>
                <ul>
                  {movieDetails.genres.map((genre) => (
                    <li key={genre.id}>
                      <Link to={`/genre/${genre.name}`}>{genre.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <h2>Rating: {movieDetails.rating}</h2>
              <h2>Country: {movieDetails.country.join(', ')}</h2>

              <div>
                <h2>Directors:</h2>
                <ul>
                  {movieDetails.directors.map((director) => (
                    <li key={director.id}>{director.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2>Writers:</h2>
                <ul>
                  {movieDetails.writers.map((writer) => (
                    <li key={writer.id}>{writer.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <h2>Cast:</h2>
          <div className="cast-list">
            {cast.map((member) => (
              <div key={member.id} className="cast-item">
                <Link to={`/cast/${member.id}`}>
                  <div>
                    {member.profile_path ? (
                      <img src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`} alt={member.name} />
                    ) : (
                      <div className="no-image">No Image Available</div>
                    )}
                    <p>
                      {member.name} as {member.character}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Animation />
      )}
    </div>
  );
};

export default MovieDetails;
