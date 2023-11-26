import { useState} from 'react';
import './App.css';
import { HomePage } from './pages/HomePage/HomePage';
// import { Route, Routes } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './pages/HomePage/NotFoundPage/NotFoundPage';
import LoginPage from '../src/pages/LoginPage/LoginPage';



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />

        {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <LoginPage />
      <HomePage />
    </>
  );
};

export default App;
