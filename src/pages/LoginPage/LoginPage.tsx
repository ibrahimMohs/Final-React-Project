import React, { useState } from "react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.scss";
import background from '../../assets/images/mainphot.jpg';
import { User } from '../../models/user';

type LoginPageProps = {
  logInHandler: (user: User) => void;
};

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {

    const user: User = {
      login: "Admin@gmail.com",
      name: "userName",
    };
    props.logInHandler(user);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    let token = "server response token here";

    if (token) { 
      if (rememberMe) {
        localStorage.setItem("authToken", token);
      } else {
        sessionStorage.setItem("authToken", token);
      }
      navigate("/dashboard");
    }
  };

  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('profileObj' in response) { 
      console.log(response);
      const user: User = {
        login: response.profileObj.email,
        name: response.profileObj.name,
      };
      props.logInHandler(user);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="main">
       <img src={background} alt="" className="background" />
        <div className="allofdiv">
          <div className="login-page">
            <h1>WELCOME MOVIES WEBSITE</h1>
            <h2>Login to Your Account </h2>
            <div className="container">
              <form onSubmit={handleLogin}>
                <label className="password">
                  Email
                  <input
                    className="input"
                    placeholder="Enter your email"
                    name="email"
                    type="email"
                    required
                  />
                </label>
                <label className="password">
           
                  Password
                  <input
                    className="input"
                    placeholder="Enter your password"
                    name="password"
                    type="password"
                    required
                  />
                </label>
              <div className="rem-forg">
                 <div className="checkbox">
                         <input
                      type="checkbox"
                      
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  <label htmlFor="rememberMe">Remember Me</label>
                 </div>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
                <button type="submit" className="button">Sign In</button>
              </form>
            </div>
            <GoogleLogin
              clientId="YOUR_CLIENT_ID.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="google-login-button"
            />
            <div className="break">
              <hr className="hr1" />
              <p>OR</p>
              <hr className="hr2" />
            </div>
            
            <div className="login-footer">
              <p>
                Don't have an account? <Link to="/RegisterPage">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
