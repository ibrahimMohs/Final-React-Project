import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.scss';

const GoogleSignIn = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    let token = "server response token here"; 
    
    if (rememberMe) {
      localStorage.setItem('authToken', token);
    } else {
      sessionStorage.setItem('authToken', token);
    }
    
  };

  const responseGoogle = (response: any) => {
    console.log(response);
    navigate('/dashboard');
  };
    return (
      <div>
      <div className="login-page">
        <div className="container">
          <form>
            <label className="email">
              Email
              <div>
                <input type="text" />
              </div>
              Password
              <div>
               
                <input type="password" />
              </div>
            </label>

            <div>
              <button>Sign In</button>
            </div>
          </form>
        </div>
        <GoogleLogin
      clientId="YOUR_CLIENT_ID.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      className="google-login-button"
      />
      <div className='break'>
        <hr className='hr1'/><p>OR</p><hr className='hr2'/>
      </div>
    
      <div className='remember-forgotpassw'>
      <div>
      <input
        type="checkbox"
        id="rememberMe"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
      />
      <label htmlFor="rememberMe">Remember Me</label>
      </div>
      <a href="/forgot-password">Forgot Password?</a>
      </div>

      <hr/>

      <div className="login-footer">
      <p>Don't have an account? <Link to="/RegisterPage">Register</Link>
      </p>
      </div>
      </div>
    </div>
    );
};

export default GoogleSignIn;
