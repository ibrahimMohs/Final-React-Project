import { Link, useParams } from 'react-router-dom';
import CastDetails from '../CastDetails/CastDetails';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TVShowDetailsProps {}

interface TVShowDetailsData {
  name: string;
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

const TVShowsDetail: React.FC<TVShowDetailsProps> = () => {
  const { tvShowId } = useParams<{ tvShowId: string }>();
  const [tvShowDetails, setTVShowDetails] = useState<TVShowDetailsData | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      try {
        const apiKey = 'f1a02268af3a2e076dc84ca1a6aaaefe';
        const tvShowResponse = await axios.get<TVShowDetailsData>(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}&language=en-US`);
        const basicDetails: TVShowDetailsData = tvShowResponse.data;

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=${apiKey}`);
        const credits = creditsResponse.data;

        const detailsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}&append_to_response=credits`);
        const details = detailsResponse.data;

        setTVShowDetails({
          name: basicDetails.name,
          overview: basicDetails.overview,
          poster_path: basicDetails.poster_path,
          genres: basicDetails.genres,
          rating: basicDetails.rating,
          country: details.origin_country,
          directors: credits.crew.filter((member: any) => member.job === 'Director'),
          writers: credits.crew.filter((member: any) => member.department === 'Writing'),
        });

        const videosResponse = await axios.get<{ results: Trailer[] }>(
          `https://api.themoviedb.org/3/tv/${tvShowId}/videos?api_key=${apiKey}&language=en-US`,
        );
        setTrailers(videosResponse.data.results.filter((video: any) => video.type === 'Trailer'));

        setCast(credits.cast);
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      }
    };

    fetchTVShowDetails();
  }, [tvShowId]);

  return (
    <div>
      {tvShowDetails ? (
        <div>
          <h1>{tvShowDetails.name}</h1>
          <div className="parts">
            <img src={`https://image.tmdb.org/t/p/w500/${tvShowDetails.poster_path}`} alt={tvShowDetails.name} />
            <div>
              <p>{tvShowDetails.overview}</p>

              <div>
                <h2>Genres:</h2>
                <ul>
                  {tvShowDetails.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>

              <h2>Rating: {tvShowDetails.rating}</h2>
              <h2>Country: {tvShowDetails.country.join(', ')}</h2>

              <div>
                <h2>Directors:</h2>
                <ul>
                  {tvShowDetails.directors.map((director) => (
                    <li key={director.id}>{director.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2>Writers:</h2>
                <ul>
                  {tvShowDetails.writers.map((writer) => (
                    <li key={writer.id}>{writer.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2>Trailers:</h2>
                <ul>
                  {trailers.map((trailer) => (
                    <li key={trailer.id}>
                      <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer">
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
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TVShowsDetail;
