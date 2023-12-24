// WatchlistContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Movie {
  id: number;
  title: string;
  // ... other movie properties
}

interface WatchlistContextType {
  watchlist: Movie[];
  addMovieToWatchlist: (movie: Movie) => void;
  removeMovieFromWatchlist: (movieId: number) => void;
}

// Create context with a default undefined! assertion since we will always use within a provider
const WatchlistContext = createContext<WatchlistContextType>(undefined!);

export const useWatchlist = () => useContext(WatchlistContext);

interface WatchlistProviderProps {
  children: ReactNode;
}

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const addMovieToWatchlist = (movie: Movie) => {
    // Add movie to watchlist
    setWatchlist((currentWatchlist) => [...currentWatchlist, movie]);
};

const removeMovieFromWatchlist = (movieId: number) => {
    // Remove movie from watchlist
    setWatchlist((currentWatchlist) => currentWatchlist.filter((movie) => movie.id !== movieId));
};

  return (
    <WatchlistContext.Provider value={{ watchlist, addMovieToWatchlist, removeMovieFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};
