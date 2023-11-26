import React, { useState } from 'react';
import './App.css';
import { User } from '../src/models/user';
import { HomePage } from './pages/HomePage/HomePage';
// import { Route, Routes } from 'react-router-dom';
import { Header } from '../src/components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './pages/HomePage/NotFoundPage/NotFoundPage';
import LoginPage from '../src/pages/LoginPage/LoginPage';

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
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        ) : (
          
          <Routes>
            <Route path="/" element={<LoginPage logInHandler={handleLogIn} />} />
            <Route path="login" element={<LoginPage logInHandler={handleLogIn} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}

      
      {userInfo && <p>Current user is: {userInfo.name}</p>}
    </>
  );
}

export default App;
