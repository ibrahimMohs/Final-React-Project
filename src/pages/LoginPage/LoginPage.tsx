import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.scss";
import background from '../../assets/images/loginphoto.jpg';
import { User } from '../../models/user';

type LoginPageProps = {
  logInHandler: (user: User) => void;
};
const handleLoginButtonClick = () => {
  // later user info will be received from the backend
  const user: User = {
    login: "Admin",
    name: "userName",
  };
  props.logInHandler(user);
};
 

const GoogleSignIn = () => {
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    let token = "server response token here";

    if (rememberMe) {
      localStorage.setItem("authToken", token);
    } else {
      sessionStorage.setItem("authToken", token);
    }
  };

  const responseGoogle = (response: any) => {
    console.log(response);
    navigate("/dashboard");
    
  };

  return (
    <>
      <div className="main">
        <img src={background} alt="" className="background" />
        <div className="allofdiv">
          <div className="login-page">
            <h1>WELCOME MOVIES WEBSITE </h1>
            <div className="container">
              <form>
                <label className="input">
                  Email
                  <div>
                    <input className="textplace" type="text" />{" "}
                  </div>
                </label>
                <label className="email">
                  Password
                  <div>
                    {" "}
                    <input className="textplace" type="password" />{" "}
                  </div>
                </label>
                <div>
                  <button type="button" onClick={handleLoginButtonClick}>Sign In</button>
                </div>
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

export default GoogleSignIn;
