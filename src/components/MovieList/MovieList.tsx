import '../MovieList/MovieList.scss';
import { API_URL, apiKey } from '../../consts';
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
  inWatchlist?: boolean;
  rating?: number;
}

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`);
        const updatedMovies = response.data.results.map((movie: Movie) => ({
          ...movie,
          inWatchlist: !!watchlist.find((m) => m.id === movie.id),
        }));
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        console.log('Current watchlist:', watchlist);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage, watchlist]);

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

  const addToWatchlist = (e: React.MouseEvent<HTMLButtonElement>, movieToAdd: Movie) => {
    e.stopPropagation(); // This stops the event from bubbling up to parent elements

    if (watchlist.find((m) => m.id === movieToAdd.id)) {
      return; // If already in watchlist, do nothing
    }
    let token = sessionStorage.getItem('authToken');
    let userId = sessionStorage.getItem('userId');
    if (!userId) {
      userId = localStorage.getItem('userId');
      token = localStorage.getItem('authToken');
    }
    if (userId) {
      console.log(`Sending request to ${API_URL}/api/movies/watch-list with data:`, {
        userId: userId,
        mediaId: movieToAdd.id,
      });

      axios
        .post(
          `${API_URL}/api/movies/watch-list`,
          { userId: userId, mediaId: movieToAdd.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((response) => console.log(response));
      setWatchlist([...watchlist, { ...movieToAdd, inWatchlist: true }]);
    } else {
      // this should be changed to the Modal window
      alert('some troubles with user');
    }
  };

  const handleRatingChange = (movieId: number, rating: number) => {
    // Update the rating for the specified movie
    const updatedMovies = movies.map(movie =>
      movie.id === movieId ? { ...movie, rating: rating } : movie
    );
    setMovies(updatedMovies);
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
            // Wrap the Link and button inside a div or fragment
            <div key={movie.id} className="movie-item">
              <Link to={`/movies/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                <p>{movie.title}</p>
              </Link>
              <button className="add-list" onClick={(e) => addToWatchlist(e, movie)}>
                {movie.inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
              {/* Rating part */}
            <div className="movie-rating">
              <label htmlFor={`rating-${movie.id}`}>Rating: </label>
              <select
                id={`rating-${movie.id}`}
                value={movie.rating || 0}
                onChange={(e) => handleRatingChange(movie.id, parseInt(e.target.value))}
              >
                <option value="0">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            </div>
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
