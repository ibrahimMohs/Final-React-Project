import { useState} from 'react';
import './App.css';
import { User } from './models/user';
import { HomePage } from './pages/HomePage/HomePage';
// import { Route, Routes } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './pages/HomePage/NotFoundPage/NotFoundPage';
import LoginPage from '../src/pages/LoginPage/LoginPage';



function App() {
  const [userInfo, setUserInfo] = useState<User | undefined>(undefined);

  function handleLogIn(user: User) {
    setUserInfo(user);
  }
function App() {
  return (
    <><Header userInfo={userInfo} />
      {userInfo ?(
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
         <Route
            path="login"
            element={<LoginPage logInHandler={handleLogIn} />}
          />
          </Routes>
      ) : (
        <Routes>
       <Route
            index
            path="/"
            element={<LoginPage logInHandler={handleLogIn} />}
          />
           <Route
            path="login"
            element={<LoginPage logInHandler={handleLogIn} />}
          />
          </Routes>

        {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        <Route path="*" element={<NotFoundPage />} />
      )}
      
      <LoginPage />
      <HomePage />
    </>
  );
  
};
};
export default App;
