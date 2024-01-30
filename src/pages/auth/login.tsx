import React from 'react';
import { Button, Form, Input, Tag, message } from 'antd';
import { Api, Types } from 'modules/auth';
import { session } from 'services';
import { Link } from 'react-router-dom';
import { MainContext } from 'main';

const Login: React.FC = () => {
  const { login } = React.useContext(MainContext);

  const onFinish = async (values: Types.IForm.Login) => {
    const { data } = await Api.Login(values);
    const token = data.data.token;
    session.add(token);

    {
      const { data } = await Api.Me({ token });
      const user = data.data;
      login(user);
      message.success(`👋🏻 Welcome ${user.firstName}!`);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center pt-10">
      <h1>Login Form</h1>
      <Form autoComplete="off" onFinish={onFinish} className="flex w-[500px] flex-col gap-2">
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
              message: 'Enter password',
              whitespace: true
            },
            {
              min: 8,
              message: 'Please enter your password'
            }
          ]}
          hasFeedback
          name="password"
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button block size="large" type="primary" htmlType="submit" className="uppercase">
            Login
          </Button>
        </Form.Item>
        <Link to="/auth/register" className="w-max self-end">
          Go to Register
        </Link>
      </Form>
    </div>
  );
};

export default Login;
