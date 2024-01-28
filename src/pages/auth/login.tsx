import React from 'react';
import { Button, Input, Tag } from 'antd';
import { Api, Types } from 'modules/auth';
import store from 'store2';

interface LoginProps {}

const Login: React.FC<LoginProps> = props => {
  const onSubmit: React.FormEventHandler = async e => {
    e.preventDefault();

    const values: Types.IForm.Login = { phone: 'admin4', password: 'root123' };

    const { data } = await Api.Login(values);
    const token = data.data.token;
    store.set('token', token);

    {
      const { data } = await Api.Me({ token });
      const user = data.data;
      console.log('user = ', user);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center pt-10">
      <h1>Login Form</h1>
      <form onSubmit={onSubmit} className="flex w-[500px] flex-col gap-2">
        <Input size="large" placeholder="Phone" prefix={<Tag className="bg-blue-200  text-xl">+998</Tag>} />
        <Input.Password size="large" placeholder="Password" />
        <Button size="large" type="primary" htmlType="submit" className="uppercase">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
