import '../MovieList/MovieList.scss';
import { Link } from 'react-router-dom';
import FooterPart from '../FooterPart/FooterPart';
import MoviePagination from './MoviePagination';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = 'f1a02268af3a2e076dc84ca1a6aaaefe';
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const showMovieDetails = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="movie-list">
        <h1>Movies</h1>

        <MoviePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />

        <div className="movie-container">
          {movies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-item">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
              <p>{movie.title}</p>
            </Link>
          ))}
        </div>

        {selectedMovie && (
          <div className="movie-details">
            <div className="details-content">
              <button className="close" onClick={closeMovieDetails}>
                &times;
              </button>
              <h2>{selectedMovie.title}</h2>
              <img src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`} alt={selectedMovie.title} />
              <p>{selectedMovie.overview}</p>
            </div>
          </div>
        )}

        <MoviePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />
      </div>
      <FooterPart />
    </>
  );
};

export default MovieList;
