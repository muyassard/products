import React from 'react';
import { Button, Form, Input, Tag, message } from 'antd';
import { Api, Types } from 'modules/auth';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = props => {
  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler = async e => {
    e.preventDefault();
    try {
      const values: Types.IForm.Register = {
        firstName: 'Kent',
        lastName: 'Mark',
        phone: 'admin4',
        password: 'root123'
      };

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
    <div className="container mx-auto flex flex-col items-center pt-10">
      <h1>Register Form</h1>
      <Form autoComplete="off" onFinish={onSubmit} className="flex w-[500px] flex-col gap-2">
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Enter your first name',
              min: 3,
              whitespace: true
            }
          ]}
          hasFeedback
          name="firstName"
        >
          <Input size="large" placeholder="First name" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Enter your last name',
              min: 3,
              whitespace: true
            }
          ]}
          hasFeedback
          name="lastName"
        >
          <Input size="large" placeholder="Last name" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Enter your phone number',
              whitespace: true
            }
          ]}
          hasFeedback
          name="phoneNumber"
        >
          <Input size="large" placeholder="Phone" prefix={<Tag className="bg-blue-200  text-xl">+998</Tag>} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Enter your password',
              min: 8,
              whitespace: true
            }
          ]}
          hasFeedback
          name="password"
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" className="uppercase">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
