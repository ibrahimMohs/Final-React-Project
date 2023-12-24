import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WatchlistProvider } from './components/WatchList/WatchListContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
