import '../GenreMovies/GenreMovies.scss';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  poster_path: string; // Add other properties as needed
}

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  // Add other properties as needed
}

const genreNameToIdMap: { [key: string]: number } = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  sciencefiction: 878,
  tvmovie: 10770,
  thriller: 53,
  war: 10752,
  western: 37,
};

const getGenreIdByName = (genreName: string): number => {
  return genreNameToIdMap[genreName.toLowerCase()] || 0;
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="pagination">
      {currentPage > 1 && <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>}

      {pageNumbers.map((page) => (
        <button key={page} onClick={() => onPageChange(page)} disabled={currentPage === page}>
          {page}
        </button>
      ))}

      {currentPage < totalPages && <button onClick={() => onPageChange(currentPage + 1)}>Next</button>}
    </div>
  );
};

const GenreMovies: React.FC = () => {
  const { genreName } = useParams<{ genreName: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<TVShow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (!genreName) {
        console.log('Genre name is undefined');
        return;
      }

      const genreId = getGenreIdByName(genreName);

      try {
        const result = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=f1a02268af3a2e076dc84ca1a6aaaefe&with_genres=${genreId}&page=${currentPage}`,
        );
        setMovies(result.data.results);
        setTotalPages(result.data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMoviesByGenre();
  }, [genreName, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className="genre-part">
      <h1>{genreName} Movies</h1>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

      <div className="tv-show-container">
        {tvShows.map((tvShow) => (
          <Link to={`/tv-shows/${tvShow.id}`} key={tvShow.id} className="tv-show-item">
            <img src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`} alt={tvShow.name} />
            <p>{tvShow.name}</p>
          </Link>
        ))}
      </div>

      <ul className="genre">
        {movies.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-item">
            <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} style={{ width: '100px', height: '150px' }} />
            <p>{movie.title}</p>
          </Link>
        ))}
      </ul>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default GenreMovies;
