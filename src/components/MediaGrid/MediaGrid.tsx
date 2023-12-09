import './MediaGrid.scss';
import { Link } from 'react-router-dom';
import React from 'react';

interface MediaItem {
  id: number;
  backdrop_path?: string;
  vote_average: number;
  overview: string;
  poster_path?: string;
  // Both title and name are optional because a media item can be a Movie or a TVShow
  title?: string;
  name?: string;
  // No need to define titleOrName here, we will handle it inside the component
}

// Movie interface extends MediaItem
interface Movie extends MediaItem {
  title: string;
}

// TVShow interface extends MediaItem
interface TVShow extends MediaItem {
  name: string;
}

// Props for the MediaGrid component
interface MediaGridProps {
  title: string;
  items: MediaItem[];
}

// MediaGrid component
const MediaGrid: React.FC<MediaGridProps> = ({ title, items }) => {
  return (
    <div className="media-grid">
      <h2>{title}</h2>
      <div className="grid-container">
        {items.slice(0, 24).map((item) => {
          // Determine the path for the detail page
          const detailPagePath = 'title' in item ? `/movies/${item.id}` : `/tvshows/${item.id}`;
          return (
            <Link to={detailPagePath} key={item.id} className="grid-item">
              <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title || item.name} />
              <p>{item.title || item.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MediaGrid;
