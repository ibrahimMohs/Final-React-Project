import './TVShowsList.scss';
import { Link } from 'react-router-dom';
import FooterPart from '../FooterPart/FooterPart';
import React, { useEffect, useState } from 'react';
import TVShowPagination from '../MovieList/MoviePagination';
import axios from 'axios';
import { apiKey } from '../../consts';

interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  inWatchlist?: boolean;
}

const TVShowsList: React.FC = () => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTVShow, setSelectedTVShow] = useState<TVShow | null>(null);
  const [watchlist, setWatchlist] = useState<TVShow[]>([]);

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`);
        const updatedTVShows = response.data.results.map((tvShow: TVShow) => ({
          ...tvShow,
          inWatchlist: !!watchlist.find(show => show.id === tvShow.id),
        }));
        setTVShows(response.data.results);
        setTotalPages(response.data.total_pages);
        console.log("Current watchlist:", watchlist);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchTVShows();
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

  const showTVShowDetails = (tvShow: TVShow) => {
    setSelectedTVShow(tvShow);
  };

  const closeTVShowDetails = () => {
    setSelectedTVShow(null);
  };

  const addToWatchlist = (tvShowToAdd: TVShow) => {
    setWatchlist((prevWatchlist) => {
      if (prevWatchlist.find((show) => show.id === tvShowToAdd.id)) {
        return prevWatchlist; // If already in watchlist, do nothing
      }
      return [...prevWatchlist, { ...tvShowToAdd, inWatchlist: true }];
    });
  };


  return (
    <>
      <div className="tv-shows-list">
        <h1>TV Shows</h1>

        <TVShowPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
        />

        <div className="tv-show-container">
          {tvShows.map((tvShow) => (
            <div key={tvShow.id} className="tv-show-item">
              <Link to={`/tv-shows/${tvShow.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`} alt={tvShow.name} />
                <p>{tvShow.name}</p>
              </Link>
              <button onClick={() => addToWatchlist(tvShow)}>{tvShow.inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</button>
            </div>
          ))}
        </div>

        {selectedTVShow && (
          <div className="tv-show-details">
            <div className="details-content">
              <button className="close" onClick={closeTVShowDetails}>
                &times;
              </button>
              <h2>{selectedTVShow.name}</h2>
              <img src={`https://image.tmdb.org/t/p/w500/${selectedTVShow.poster_path}`} alt={selectedTVShow.name} />
              <p>{selectedTVShow.overview}</p>
            </div>
          </div>
        )}

        <TVShowPagination
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

export default TVShowsList;
