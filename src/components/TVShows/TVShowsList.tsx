import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TVShowsList.scss'; // Import your SCSS file
import TVShowPagination from '../MovieList/MoviePagination'; // Import the TVShowPagination component
import axios from 'axios';

interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  // Add other TV show properties as needed
}

const TVShowsList: React.FC = () => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTVShow, setSelectedTVShow] = useState<TVShow | null>(null); // Store selected TV show details

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const apiKey = 'f1a02268af3a2e076dc84ca1a6aaaefe'; // Replace with your actual TMDB API key
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`
        );
        setTVShows(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchTVShows();
  }, [currentPage]);

  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const showTVShowDetails = (tvShow: TVShow) => {
    setSelectedTVShow(tvShow); // Set selected TV show when clicked
  };

  const closeTVShowDetails = () => {
    setSelectedTVShow(null); // Close TV show details when user clicks outside or on close button
  };

  return (
    <div className="tv-shows-list">
      <h1>TV Shows</h1>

      {/* Pagination at the top */}
      <TVShowPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />

      <div className="tv-show-container">
        {tvShows.map(tvShow => (
          <Link to={`/tv-shows/${tvShow.id}`} key={tvShow.id} className="tv-show-item">
            <img src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`} alt={tvShow.name} />
            <p>{tvShow.name}</p>
          </Link>
        ))}
      </div>

      {/* TV show details section */}
      {selectedTVShow && (
        <div className="tv-show-details">
          <div className="details-content">
            <span className="close" onClick={closeTVShowDetails}>&times;</span>
            <h2>{selectedTVShow.name}</h2>
            <img src={`https://image.tmdb.org/t/p/w500/${selectedTVShow.poster_path}`} alt={selectedTVShow.name} />
            <p>{selectedTVShow.overview}</p>
            {/* Display other TV show details as needed */}
          </div>
        </div>
      )}

      {/* Pagination at the bottom */}
      <TVShowPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};

export default TVShowsList;
