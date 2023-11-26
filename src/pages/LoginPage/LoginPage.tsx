import React, { useState } from "react";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.scss";
import background from '../../assets/images/loginphoto.jpg';
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
        <img src={background} alt="Login Background" className="background" />
        <div className="allofdiv">
          <div className="login-page">
            <h1>WELCOME TO MOVIE WEBSITE</h1>
            <div className="container">
              <form onSubmit={handleLogin}>
                <label className="input">
                  Email
                  <input className="textplace" name="email" type="email" required />
                </label>
                <label className="password">
                  Password
                  <input className="textplace" name="password" type="password" required />
                </label>
                <button type="submit">Sign In</button>
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
            <div className="remember-forgotpassw">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember Me</label>
              <Link to="/forgot-password">Forgot Password?</Link>
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
