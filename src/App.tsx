import { useState} from 'react';
import './App.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { NotFoundPage } from './pages/HomePage/NotFoundPage/NotFoundPage';



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index  path="/" element={<HomePage />} />
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
