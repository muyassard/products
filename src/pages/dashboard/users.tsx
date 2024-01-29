import { Button } from 'antd';
import React from 'react';
import { session } from 'services';

interface UsersProps {
  refresh(): void;
}

const Users: React.FC<UsersProps> = ({ refresh }) => (
  <div className="container mx-auto">
    <h1>Users Page</h1>
    <Button
      onClick={() => {
        session.remove();
        refresh();
      }}
    >
      Log out
    </Button>
  </div>
);

export default Users;
