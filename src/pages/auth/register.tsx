import React from 'react';
import { Button, Form, Input, Tag, message } from 'antd';
import { Api, Types } from 'modules/auth';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';

 
const Register: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: Types.IForm.Register) => {
    try {
      const { data } = await Api.Register(values);
      message.success(`Successfully registered. Hi ${data.data.firstName}`);
      navigate('/auth/login');
    } catch (err) {
      if (err instanceof AxiosError) {
        message.error(err.response?.data?.message);
      }
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <h1 className="text-white">Register Form</h1>
      <Form onFinish={onFinish} className="flex w-[400px] flex-col gap-2">
        <Form.Item<Types.IForm.Register>
          className="m-0"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input size="large" placeholder="First name" />
        </Form.Item>
        <Form.Item<Types.IForm.Register>
          className="m-0"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input size="large" placeholder="Last name" />
        </Form.Item>
        <Form.Item<Types.IForm.Register>
          className="m-0"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone!' }]}
        >
          <Input size="large" placeholder="Phone" prefix={<Tag className="bg-blue-100">+998</Tag>} />
        </Form.Item>
        <Form.Item<Types.IForm.Register>
          className="m-0"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block size="large" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Link to="/auth/login" className="w-max self-end">
          Go to Login
        </Link>
      </Form>
    </div>
  );
};

export default Register;
