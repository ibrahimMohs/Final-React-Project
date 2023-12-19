import React, { useState } from 'react';
// import {
//   GoogleLogin,
//   GoogleLoginResponse,
//   GoogleLoginResponseOffline,
// } from "react-google-login";
import './LoginPage.scss';
import 'animate.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from '@leecheuk/react-google-login';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../models/user';
import background from '../../assets/images/mainphot.jpg';

type LoginPageProps = {
  logInHandler: (user: User) => void;
};

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLoginButtonClick = () => {
    const user: User = {
      login: 'Admin@gmail.com',
      name: 'userName',
    };
    props.logInHandler(user);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    let token = 'server response token here';

    if (token) {
      if (rememberMe) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }
      const user: User = {
        login: 'Admin@gmail.com',
        name: 'userName',
      };
      props.logInHandler(user);
      navigate('/');
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
      navigate('/');
    }
  };
  const onFinish = (values: unknown) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  return (
    <>
      <div className="main">
        <img src={background} alt="" className="background" />
        <div className="all-of-div">
          <div className="login-page">
            <h1>
              WELCOME TO <br /> MovieLand{' '}
            </h1>
            <h2>Login </h2>
            <div className="login-page-container">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<FieldType> label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    { min: 8, message: 'password is shorter than 8' },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <div className="remember-forgot">
                  <Form.Item<FieldType> name="remember" valuePropName="checked" className="remember">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <div>
                    <a className="forgot" href="/#">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <GoogleLogin
              clientId="YOUR_CLIENT_ID.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
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
