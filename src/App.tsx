import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { Layout } from 'antd';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { User } from './models/user';
import CastDetails from './components/CastDetails/CastDetails';
import GenreMovies from './components/GenreMovies/GenreMovies';
import LoginPage from './pages/LoginPage/LoginPage';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MovieList from './components/MovieList/MovieList';
import React, { useState } from 'react';
import RegisterPage from './components/RegisterPage/RegisterPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import TVShowsDetail from './components/TVShowsDetails/TVShowsDetail';
import TVShowsList from './components/TVShows/TVShowsList';
const { Content, Footer } = Layout;

const App = () => {
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
  const location = useLocation();

  function handleLogIn(user: User) {
    setUserInfo(user);
  }

  function handleLogOut() {
    setUserInfo(undefined);
  }

  const showHeader = location.pathname !== '/login-register' && location.pathname !== '/RegisterPage';

  return (
    <>
      {showHeader && <Header userInfo={userInfo} />}
      <Layout>
        {userInfo ? (
          <Content style={{ padding: '50px' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/genre/:genreName" element={<GenreMovies />} />
              <Route path="movies" element={<MovieList />} />
              <Route path="movies/:movieId" element={<MovieDetails />} />
              <Route path="cast/:castId" element={<CastDetails />} />
              <Route path="tv-shows" element={<TVShowsList />} />
              <Route path="tv-shows/:tvShowId" element={<TVShowsDetail />} />
              {/* <Route path="subscriptions" element={<Subscriptions />} /> */}
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Content>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/genre/:genreName" element={<GenreMovies />} />
            <Route path="movies" element={<MovieList />} />
            <Route path="movies/:movieId" element={<MovieDetails />} />
            <Route path="cast/:castId" element={<CastDetails />} />
            <Route path="tv-shows" element={<TVShowsList />} />
            <Route path="tv-shows/:tvShowId" element={<TVShowsDetail />} />
            {/* <Route path="subscriptions" element={<Subscriptions />} /> */}
            <Route path="login-register" element={<LoginPage logInHandler={handleLogIn} />} />
            <Route path="/RegisterPage" element={<RegisterPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </Layout>
      {userInfo && <p>Current user is: {userInfo.name}</p>}
    </>
  );
};

export default App;
