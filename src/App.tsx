import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/reset.css';
import './App.css';
import { User } from '../src/models/user';
import { HomePage } from './pages/HomePage/HomePage';
// import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import {Header} from '../src/components/Header/Header'; 
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import LoginPage from '../src/pages/LoginPage/LoginPage';
import { CarouselPage } from './components/CarouselPage/CarouselPage';

const { Content, Footer } = Layout;

const Home = () => <div>Home Page</div>;
const MoviesShows = () => <div>Movies & Shows Page</div>;
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
          <Header userInfo={userInfo}  /> 
        
        {userInfo ? (
          <>
          <Layout>

          <Content style={{ padding: '50px' }}></Content>
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="movies-shows" element={<MoviesShows />} />
            <Route path="support" element={<Support />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="login-register" element={<LoginPage logInHandler={handleLogIn} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <CarouselPage/>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
          </>
        ) : (
          
          <Routes>
            <Route path="/" element={<LoginPage logInHandler={handleLogIn} />} />
            <Route path="login-register" element={<LoginPage logInHandler={handleLogIn} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          
        )}

      
      {userInfo && <p>Current user is: {userInfo.name}</p>}
    </>
  );
}

export default App;
