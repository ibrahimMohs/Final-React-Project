import '../RegisterPage/RegisterPage.scss';
import { AutoComplete, Button, Cascader, Checkbox, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import background from '../../assets/images/backgroundimg.jpg';

const { Option } = Select;

const API_URL = 'https://194.87.210.5:7001';

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: {
    email: string;
    password: string;
    confirm: string;
    nickname: string;
    phone: string;
    prefix: string;
    gender: string;
    captcha: string;
    agreement: boolean;
  }) => {
    console.log('Received values of form: ', values);
    if (isSubmitting) {
      return;
    }

      setIsSubmitting(true); 
    
    if (!values.agreement) {
      return;
    }

    const { confirm, prefix, agreement, ...formData } = values; 

    try {
      const registrationData = {
        ...formData,
        phone: `${prefix}${values.phone}`, 
      };

      const response = await axios.post(`${API_URL}/api/movies/register`, registrationData);
      console.log('Registration successful', response.data);
      form.resetFields();
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsSubmitting(false); 
    }
  };


  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="994">+994</Option>
        <Option value="1">+1</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <div className="form-container">
      <img className="register-background" src={background} alt="" />
      <div className="all-forms">
        <Form
          {...formItemLayout}
          form={form}
          className="form-part"
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select gender!' }]}>
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Captcha" extra="We must make sure that your are a human.">
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: 'Please input the captcha you got!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a  className="agreement" href="/">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
                className="register-button" type="primary" htmlType="submit"  disabled={isSubmitting} >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
