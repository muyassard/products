import React from 'react';
import { Button, Input, Tag, message } from 'antd';
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
    <div className="container mx-auto flex flex-col items-center">
      <h1>Register Form</h1>
      <form onSubmit={onSubmit} className="flex w-[400px] flex-col gap-2">
        <Input size="large" placeholder="First name" />
        <Input size="large" placeholder="Last name" />
        <Input size="large" placeholder="Phone" prefix={<Tag>+998</Tag>} />
        <Input.Password size="large" placeholder="Password" />
        <Button size="large" type="primary" htmlType="submit">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
