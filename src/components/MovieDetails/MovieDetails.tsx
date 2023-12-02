import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CastDetails from '../CastDetails-For-Movies/CastDetails';
import '../MovieDetails/MovieDetails.scss';

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
        const apiKey = 'f1a02268af3a2e076dc84ca1a6aaaefe'; 

        const movieResponse = await axios.get<MovieDetailsData>(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        const basicDetails = movieResponse.data;

        const castResponse = await axios.get<{ cast: CastMember[] }>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
        );
        const cast = castResponse.data.cast;

        const videosResponse = await axios.get<{ results: Trailer[] }>(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
        );
        const trailers = videosResponse.data.results.filter((video: any) => video.type === 'Trailer');

        const movieDetailsResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`
        );
        const movieDetails = movieDetailsResponse.data;

        setMovieDetails({
          ...basicDetails,
          rating: movieDetails.vote_average,
          country: movieDetails.production_countries.map((country: { iso_3166_1: string; name: string }) => country.name),
          directors: movieDetails.credits.crew.filter((member: any) => member.job === 'Director'),
          writers: movieDetails.credits.crew.filter((member: any) => member.department === 'Writing')
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

  return (
    <div>
      {movieDetails ? (
        <div>
          <h1>{movieDetails.title}</h1>
          <div className="parts">
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
            <div>
              <p>{movieDetails.overview}</p>

              <div>
                <h2>Genres:</h2>
                <ul>
                  {movieDetails.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>

              <h2>Rating: {movieDetails.rating}</h2>
              <h2>Country: {movieDetails.country.join(', ')}</h2>

              <div>
                <h2>Directors:</h2>
                <ul>
                  {movieDetails.directors.map(director => (
                    <li key={director.id}>{director.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2>Writers:</h2>
                <ul>
                  {movieDetails.writers.map(writer => (
                    <li key={writer.id}>{writer.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2>Trailers:</h2>
                <ul>
                  {trailers.map(trailer => (
                    <li key={trailer.id}>
                      <a
                        href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {trailer.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <h2>Cast:</h2>
          <div className="cast-list">
            {cast.map(member => (
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
          {selectedCastId && <CastDetails castId={selectedCastId.toString()} />}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;
