import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/reset.css";
import "./App.css";
import { User } from "../src/models/user";
import { HomePage } from "./pages/HomePage/HomePage";
// import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import { Header } from "../src/components/Header/Header";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "../src/pages/LoginPage/LoginPage";
import Genre from "../src/components/Genre/Genre";
import MovieList from "./components/MovieList/MovieList";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import TVShowsList from "./components/TVShows/TVShowsList";
import TVShowsDetail from "./components/TVShowsDetails/TVShowsDetail";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import CastDetails from './components/CastDetails/CastDetails';
const { Content, Footer } = Layout;

const Home = () => <div>Home Page</div>;
const GenreComponent =()=> <div>Genre</div>;
const Movies = () => <div>Movies Page</div>;
const Shows = () => <div>Shows Page</div>;
const Support = () => <div>Support Page</div>;
const Subscriptions = () => <div>Subscriptions Page</div>;
const LoginRegister = () => <div>Login/Register Page</div>;

function App() {
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);

  function handleLogIn(user: User) {
    setUserInfo(user);
  }

  function handleLogOut() {
    setUserInfo(undefined);
  }

  return (
    <>
      <Header userInfo={userInfo} />
      {userInfo ? (
        <>
          <Layout>
            <Content style={{ padding: "50px" }}></Content>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="genre" element={<Genre />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movies/:movieId" element={<MovieDetails />} />
              <Route path="/cast/:castId" element={<CastDetails />} />
              <Route path="/tv-shows" element={<TVShowsList />} />
              <Route path="/tv-shows/:tvShowId" element={<TVShowsDetail />} />
              <Route path="support" element={<Support />} />
              <Route path="subscriptions" element={<Subscriptions />} />
              <Route
                path="login-register"
                element={<LoginPage logInHandler={handleLogIn} />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {/* <carousel /> */}
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2023 Created by Ant UED
            </Footer>
          </Layout>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="genre" element={<Genre />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="movies/:movieId" element={<MovieDetails />} />
          <Route path="cast/:castId" element={<CastDetails />} />
          <Route path="tv-shows" element={<TVShowsList />} />
          <Route path="tv-shows/:tvShowId" element={<TVShowsDetail />} />
          <Route path="support" element={<Support />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route
            path="login-register"
            element={<LoginPage logInHandler={handleLogIn} />}
          />
          <Route path="/RegisterPage" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      {userInfo && <p>Current user is: {userInfo.name}</p>}
    </>
  );
}

export default App;
