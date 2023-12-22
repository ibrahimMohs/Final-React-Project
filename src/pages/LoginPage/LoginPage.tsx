import './LoginPage.scss';
import 'animate.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from '@leecheuk/react-google-login';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../models/user';
import React, { useState } from 'react';
import axios from 'axios';
import background from '../../assets/images/mainphot.jpg';

const API_URL = 'https://194.87.210.5:7001'; // Replace with your backend API URL

const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/api/movies/login`, { username, password });
  return response.data;
};

type LoginPageProps = {
  logInHandler: (user: User) => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ logInHandler }) => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

const onFinish = async (values: { username: string; password: string }) => {
  console.log('Form submitted with values:', values); 
    try {
      const token = await loginUser(values.username, values.password);
      if (token) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('authToken', token);
        const user: User = {
          login: values.username,
          name: 'User Name', // You would replace this with the name from the response, if available
        };
        logInHandler(user);
        navigate('/');
      }
    } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login failed:', error.response?.data);
      // You can set the error message in state and display it in your UI
    } else {
      console.error('An unexpected error occurred:', error);
    }
    }
  };

  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('profileObj' in response) {
      const user: User = {
        login: response.profileObj.email,
        name: response.profileObj.name,
      };
      logInHandler(user);
      navigate('/');
    }
  };

  const onRememberMeChange = (e: CheckboxChangeEvent) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      <div className="main">
        <img src={background} alt="background" className="background" />
        <div className="all-of-div">
          <div className="login-page">
            <h1>
              WELCOME TO <br /> MovieLand{' '}
            </h1>
            <h2>Login</h2>
            <div className="login-page-container">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 8, message: 'Password is shorter than 8 characters' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <div className="remember-forgot">
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox onChange={onRememberMeChange}>Remember me</Checkbox>
                  </Form.Item>
                  <a className="forgot" href="/#">
                    Forgot password?
                  </a>
                </div>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
            {/* <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className="google-login-button"
            /> */}
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
